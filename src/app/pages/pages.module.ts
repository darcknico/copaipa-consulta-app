import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PerfilComponent } from './perfil/perfil.component';
import { PasswordModalComponent } from './password-modal/password-modal.component';
import { PasswordComponent } from './password/password.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [PerfilComponent, PasswordModalComponent, PasswordComponent],
  entryComponents:[
    PasswordModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TranslateModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
