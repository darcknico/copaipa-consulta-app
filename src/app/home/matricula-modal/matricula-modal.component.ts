import { Component, OnInit, ViewChild } from '@angular/core';
import { NavParams, ModalController, Platform, IonInput } from '@ionic/angular';
import { AfiliadoService } from '../../providers/afiliado.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from '../../providers/loading.service';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';
import { Afiliado } from '../../_models/afiliado';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Toast } from '@ionic-native/toast/ngx';
import { Auxiliar } from '../../_helpers/auxiliar';

@Component({
  selector: 'app-matricula-modal',
  templateUrl: './matricula-modal.component.html',
  styleUrls: ['./matricula-modal.component.scss']
})
export class MatriculaModalComponent implements OnInit {

  @ViewChild('matriculaInput') matriculaInput: IonInput;

  afiliado:Afiliado;
  formulario:FormGroup;
  respuesta:any;
  constructor(
    private afiliadoService:AfiliadoService,
    private formBuilder: FormBuilder,
    private platform: Platform,
    private navParams:NavParams,
    public loadingService: LoadingService,
    private fileOpener: FileOpener,
    private file: File,
    private modalCtrl: ModalController,
    private nativeStorage: NativeStorage,
    private toast:Toast,
    ) { 
    this.formulario = this.formBuilder.group({
      matricula: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.nativeStorage.getItem('afiliado').then(data=>{
      this.afiliado = data;
    },error => console.error('Afiliado error', error));
  }

  get f(){
    return this.formulario.controls;
  }

  async continuar(){
    if(!this.formulario.valid){
      return;
    }
    this.loadingService.present();
    let matricula = String(this.f.matricula.value);
    console.log("Consultado afiliado matricula "+matricula);
    this.afiliadoService.matriculado(matricula).subscribe(response=>{
      this.respuesta = null;
      this.nativeStorage.setItem('afiliado',response.afiliado)
      .then(
        () => console.log('Afiliado actualizado'),
        error => console.error('Afiliado error', error)
      );
      const writeDirectory = this.platform.is('ios') ? this.file.dataDirectory : this.file.dataDirectory ;
      console.log('Conviertiendo base64 to PDF');
      this.file.writeFile(writeDirectory, response.filename, Auxiliar.convertBaseb64ToBlob(response.file, 'application/pdf'), {replace: true})
        .then(() => {
            this.afiliado = response.afiliado;
            this.loadingService.dismiss();
            console.log('Abriendo pdf');
            this.fileOpener.open(writeDirectory + response.filename, 'application/pdf')
                .catch(() => {
                    console.log('Error opening pdf file');
                });
        })
        .catch(() => {
            console.error('Error writing pdf file');
        });
    },err=>{
      this.respuesta = JSON.parse(err.error);
      this.loadingService.dismiss();
      console.log("Error en la consulta.",err.error);
    });
  }

  async imprimir(){
    this.f.matricula.setValue(this.afiliado.id);
    this.continuar();
  }

  async cerrar(){
    await this.modalCtrl.dismiss(true);
  }

  ionViewDidLoad(){
    setTimeout(() => {
      this.matriculaInput.setFocus();
    },2000);
  }
}
