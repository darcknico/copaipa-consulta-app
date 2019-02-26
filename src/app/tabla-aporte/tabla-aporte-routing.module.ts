import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioTablaAporteComponent } from './inicio-tabla-aporte/inicio-tabla-aporte.component';

const routes: Routes = [
  {
    path:'',
    component:InicioTablaAporteComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TablaAporteRoutingModule { }
