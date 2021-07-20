import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AlertController, MenuController, NavController } from '@ionic/angular';
import { LoadingService } from 'src/app/providers/loading.service';
import { UsuarioService } from 'src/app/_services/usuario.service';
import { AlertService } from 'src/app/providers/alert.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

	passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  email:AbstractControl;
  password:AbstractControl;

  constructor(
    private navController:NavController,
    private authService:AuthService,
    private usuarioService:UsuarioService,
    private router:Router,
		private alertCtrl: AlertController,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private menuController:MenuController,
  ) { 
    this.loginForm = this.formBuilder.group({
			email : ['', [Validators.required,Validators.email] ],
			password : ['', [Validators.required,Validators.minLength(6)] ],
    });
    
    this.email= this.f.email;
    this.password= this.f.password;
  }

  get f(){
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.menuController.enable(false);
    this.loadingService.present();
    this.authService.isAuthenticatedPromise().then(response=>{
      this.loadingService.dismiss();
      if(response){
        this.menuController.enable(true);
        this.navController.navigateRoot('home');
      }
    });
  }

  async onLogin() {
		if(!this.loginForm.valid){
			return false;
    }
    let email = this.f.email.value;
    let password = this.f.password.value;
    this.loadingService.present();
    this.usuarioService.login(email,password).subscribe(response=>{
      this.loadingService.dismiss();
      this.menuController.enable(true);
    },(error)=>{
      this.loadingService.dismiss();
    });
		
	}
	
	hideShowPassword() {
		this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
		this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
	}

  register(){
    this.router.navigate(['external','register']);
  }

  recovery(){
    this.router.navigate(['external','recovery']);
  }
}
