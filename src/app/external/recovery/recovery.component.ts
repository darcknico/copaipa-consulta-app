import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { NavController, MenuController } from '@ionic/angular';
import { LoadingService } from 'src/app/providers/loading.service';
import { UsuarioService } from 'src/app/_services/usuario.service';
import { AlertService } from 'src/app/providers/alert.service';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss']
})
export class RecoveryComponent implements OnInit {

  formulario:FormGroup;
  email:AbstractControl;

  constructor(
		public navCtrl: NavController,
		private alertService: AlertService,
    private loadingService: LoadingService,
		private formBuilder: FormBuilder,
    public usuarioService:UsuarioService,
    private menu: MenuController,
    ) { 
    this.formulario = this.formBuilder.group({
			email : ['', [Validators.required,Validators.email] ],
    });
    
    this.email= this.f.email;
  }

  get f(){
    return this.formulario.controls;
  }

  ngOnInit() {
    this.menu.enable(false);
  }

  continuar(){
    if(!this.formulario.valid){
      return;
    }

    let email = this.f.email.value;
    this.loadingService.present();
    this.usuarioService.recovery(email).subscribe(response=>{
      this.loadingService.dismiss();
      this.navCtrl.goBack();
      this.alertService.present(
        'Correo de recuperacion',
        null,
        'Por favor verifique su casilla de correo',
        ['OK']
      );
    },(error)=>{
      this.loadingService.dismiss();
      this.alertService.present(
        'Error',
        null,
        error.error.error,
        ['OK']
      );
    });
  }

  cancelar(){
    this.navCtrl.goBack();
  }

}
