import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablaAporteRoutingModule } from './tabla-aporte-routing.module';
import { InicioTablaAporteComponent } from './inicio-tabla-aporte/inicio-tabla-aporte.component';
import { ImportesTablaAporteComponent } from './importes-tabla-aporte/importes-tabla-aporte.component';
import { DetalleTablaAporteComponent } from './detalle-tabla-aporte/detalle-tabla-aporte.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [
    InicioTablaAporteComponent,
    ImportesTablaAporteComponent,
    DetalleTablaAporteComponent,
  ],
  entryComponents:[
    ImportesTablaAporteComponent,
  ],
  imports: [
    CommonModule,
    CommonModule,
    FormsModule,
    IonicModule,
    IonicSelectableModule,
    TablaAporteRoutingModule
  ]
})
export class TablaAporteModule { }
