import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PasswordComponent } from './password/password.component';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
  {
    path:'password',
    component: PasswordComponent,
  },{
    path:'perfil',
    component: PerfilComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
