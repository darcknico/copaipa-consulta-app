import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { ImportesTablaAporteComponent } from './importes-tabla-aporte/importes-tabla-aporte.component';
import { IonicSelectableModule } from 'ionic-selectable';
import { DetalleTablaAporteComponent } from './detalle-tabla-aporte/detalle-tabla-aporte.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicSelectableModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage, ImportesTablaAporteComponent, DetalleTablaAporteComponent],
  entryComponents: [ImportesTablaAporteComponent]
})
export class HomePageModule {}
