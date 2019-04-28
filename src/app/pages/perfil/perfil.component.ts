import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PasswordModalComponent } from '../password-modal/password-modal.component';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/_models/afiliado';
import { AuthService } from 'src/app/_services/auth.service';
import { UsuarioService } from 'src/app/_services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  usuario:Observable<Usuario>;
  loading:boolean = false;

  constructor(
    private modalCtrl: ModalController,
    private authService: AuthService,
    private usuarioService:UsuarioService,
  ) { 
    this.usuario = this.authService.user$;
  }

  ngOnInit() {
    this.loading = true;
    this.usuarioService.me().subscribe(res=>{
      this.loading = false;
    });
  }

  cambiar(){
    this.modalCtrl.create({
      component: PasswordModalComponent,
    }).then((modal) => {
        modal.present();
    });
  }
}
