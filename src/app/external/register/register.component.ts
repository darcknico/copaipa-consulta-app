import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController, MenuController } from '@ionic/angular';
import { PasswordValidator } from 'src/app/_validators/password.validator';
import { UsuarioService } from 'src/app/_services/usuario.service';
import { ValidateEmailUnique } from 'src/app/_validators/async-email-unique.validator';
import { LoadingService } from 'src/app/providers/loading.service';
import { AlertService } from 'src/app/providers/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @ViewChild('a') a;
  
  passwordType:string = 'password';
  passwordShown:boolean=false;
  passwordIcon:string = 'eye-off';

  passwordType2:string = 'password';
  passwordShown2:boolean=false;
  passwordIcon2:string = 'eye-off';

  formulario:FormGroup;
  matricula:AbstractControl;
  email:AbstractControl;
  pass:AbstractControl;
  pass2:AbstractControl;


  constructor(
    public navCtrl:NavController,
    public formbuilder:FormBuilder,
    private loadingService: LoadingService,
    private alertService: AlertService,
    public usuarioService:UsuarioService,
    private menu: MenuController,
    ) {
    this.formulario=formbuilder.group({
      matricula:['',Validators.required],
      email: new FormControl(
        null,
        [Validators.required, Validators.minLength(4),Validators.email],
        [ValidateEmailUnique.createValidator(this.usuarioService)]
      ),
      pass:['',[Validators.required,PasswordValidator.strong,Validators.minLength(6)]],
      pass2:['',[Validators.required,PasswordValidator.strong,Validators.minLength(6)]],
    },{
      validator : this.checkPasswords,
    });
    this.matricula=this.f.matricula;
    this.email=this.f.email;
    this.pass=this.f.pass;
    this.pass2=this.f.pass2;

  }

  get f(){
    return this.formulario.controls;
  }

  ngOnInit() {
    this.a.setFocus();
    this.menu.enable(false);
  }

  cancelar(){
    this.navCtrl.goBack();
  }

  mostrarContrasenya(int:number){
    if(int == 1){
      if(this.passwordShown){
        this.passwordShown=false;
        this.passwordType='password';
        this.passwordIcon='eye-off';
      }else{
        this.passwordShown=true;
        this.passwordType='text';
        this.passwordIcon='eye';
      }
    }else{

      if(this.passwordShown2){
        this.passwordShown2=false;
        this.passwordType2='password';
        this.passwordIcon2='eye-off';
      }else{
        this.passwordShown2=true;
        this.passwordType2='text';
        this.passwordIcon2='eye';
      }
    }
  }

  continuar(){
    if(!this.formulario.valid){
      return;
    }

    let email = this.f.email.value;
    let pass = this.f.pass.value;
    let pass2 = this.f.pass2.value;
    let matricula = this.f.matricula.value;
    this.loadingService.present();
    this.usuarioService.register(matricula, email,pass,pass2).subscribe(response=>{
      this.loadingService.dismiss();
      this.menu.enable(true);
    },(error)=>{
      this.loadingService.dismiss();
      this.alertService.present(
        'Error',
        null,
        error.error.error,
        ['OK']
      )
    });
  }

  moveFocus(nextElement) {
    nextElement.setFocus();
  }

  checkPasswords(group: FormGroup) {
    let pass = group.controls.pass.value;
    let confirmPass = group.controls.pass2.value;

    return pass === confirmPass ? null : { notSame: true }     
  }
}
