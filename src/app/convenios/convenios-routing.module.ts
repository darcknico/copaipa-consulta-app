import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoConvenioComponent } from './listado-convenio/listado-convenio.component';

const routes: Routes = [
  {
    path:'',
    component:ListadoConvenioComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConveniosRoutingModule { }
