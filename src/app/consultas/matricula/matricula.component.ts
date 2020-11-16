import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { IonInput, Platform } from '@ionic/angular';
import { Afiliado, Colegio } from 'src/app/_models/afiliado';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AfiliadoService } from 'src/app/providers/afiliado.service';
import { LoadingService } from 'src/app/providers/loading.service';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Toast } from '@ionic-native/toast/ngx';
import { File } from '@ionic-native/file/ngx';
import { Auxiliar } from 'src/app/_helpers/auxiliar';
import { DepositoService } from 'src/app/providers/deposito.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.component.html',
  styleUrls: ['./matricula.component.scss']
})
export class MatriculaComponent implements OnInit, AfterViewInit {
  @ViewChild('matriculaInput') matriculaInput: IonInput;

  colegios:Colegio[];
  colegio:Colegio;
  afiliado:Afiliado;
  formulario:FormGroup;
  respuesta:any;
  constructor(
    private afiliadoService:AfiliadoService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private platform: Platform,
    public loadingService: LoadingService,
    private fileOpener: FileOpener,
    private file: File,
    private deposito: DepositoService,
    private toast:Toast,
    ) { 
    let matricula = "";
    if(this.authService.usuario){
      matricula = this.authService.usuario.matricula;
    }
    this.formulario = this.formBuilder.group({
      matricula: [matricula, Validators.required],
    });
  }

  ngOnInit() {
    if(this.matriculaInput){
      this.matriculaInput.setFocus();
    }
    

    this.deposito.getItem('afiliado').then(data=>{
      if(data){
        this.afiliado = data;
        if(this.afiliado.reciprocidad){
          this.afiliadoService.colegios().subscribe(response=>{
            this.colegios = response;
          });
        }
      }
    },error => console.error('Afiliado error', error));
  }

  ngAfterViewInit(){
    if(this.matriculaInput){
      this.matriculaInput.setFocus();
    }
  }

  get f(){
    return this.formulario.controls;
  }

  async buscar(){
    if(!this.formulario.valid){
      return;
    }
    this.loadingService.present();
    let matricula = String(this.f.matricula.value);
    console.log("Consultado afiliado matricula "+matricula);
    this.afiliadoService.buscar(matricula).subscribe(response=>{
      this.loadingService.dismiss();
      this.respuesta = null;
      this.afiliado = response;
      if(this.afiliado.reciprocidad){
        this.afiliadoService.colegios().subscribe(response=>{
          this.colegios = response;
        });
      }
      this.deposito.setItem('afiliado',response)
      .then(
        () => console.log('Afiliado actualizado'),
        error => console.error('Afiliado error', error)
      );
    },err=>{
      this.loadingService.dismiss();
      console.log("Error en la consulta.",err.error);
      if(err.error && typeof err.error.error === 'string'){
        this.respuesta = err.error.error;
      } else if( typeof err.error === 'string' ) {
        this.respuesta = JSON.parse(err.error).error
      }
    });
  }

  async convenio(){
    this.loadingService.present();
    let matricula = this.afiliado.id;
    console.log("Consultado afiliado matricula "+matricula);
    this.afiliadoService.certificado_convenio(matricula).subscribe(response=>{
      const writeDirectory = this.platform.is('ios') ? this.file.dataDirectory : this.file.dataDirectory ;
      console.log('Conviertiendo base64 to PDF');
      this.file.writeFile(writeDirectory, response.filename, Auxiliar.convertBaseb64ToBlob(response.file, 'application/pdf'), {replace: true})
        .then(() => {
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
      this.loadingService.dismiss();
      console.log("Error en la consulta.",err.error);
    });
  }

  async comun(){
    this.loadingService.present();
    let matricula = this.afiliado.id;
    console.log("Consultado afiliado matricula "+matricula);
    this.afiliadoService.certificado_comun(matricula).subscribe(response=>{
      const writeDirectory = this.platform.is('ios') ? this.file.dataDirectory : this.file.dataDirectory ;
      console.log('Conviertiendo base64 to PDF');
      this.file.writeFile(writeDirectory, response.filename, Auxiliar.convertBaseb64ToBlob(response.file, 'application/pdf'), {replace: true})
        .then(() => {
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
      this.loadingService.dismiss();
      console.log("Error en la consulta.",err.error);
    });
  }

  async reciprocidad(){
    this.loadingService.present();
    let matricula = this.afiliado.id;
    if(!this.colegio){
      this.toast.show("Elige el consejo o colegio","2000","bottom");
      return;
    }
    console.log("Consultado afiliado matricula "+matricula);
    this.afiliadoService.certificado_reciprocidad(matricula,this.colegio.id).subscribe(response=>{
      const writeDirectory = this.platform.is('ios') ? this.file.dataDirectory : this.file.dataDirectory ;
      console.log('Conviertiendo base64 to PDF');
      this.file.writeFile(writeDirectory, response.filename, Auxiliar.convertBaseb64ToBlob(response.file, 'application/pdf'), {replace: true})
        .then(() => {
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
      this.loadingService.dismiss();
      console.log("Error en la consulta.",err.error);
    });
  }

  async refrescar(){
    this.afiliado = null;
    this.colegio = null;
    this.colegios = null;
    if(this.matriculaInput){
      this.matriculaInput.setFocus();
    }
  }

  quitarAfiliado(){
    this.afiliado = null;
    this.colegio = null;
    this.colegios = null;
    this.deposito.remove('afiliado').then(()=>{});
  }
}
