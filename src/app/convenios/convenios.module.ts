import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConveniosRoutingModule } from './convenios-routing.module';
import { ListadoConvenioComponent } from './listado-convenio/listado-convenio.component';
import { IonicModule } from '@ionic/angular';
import { IonicSelectableModule } from 'ionic-selectable';
import { FormsModule } from '@angular/forms';
import { FiltroConvenioComponent } from './filtro-convenio/filtro-convenio.component';

@NgModule({
  declarations: [ListadoConvenioComponent, FiltroConvenioComponent],
  entryComponents:[
    FiltroConvenioComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IonicSelectableModule,
    ConveniosRoutingModule,
  ]
})
export class ConveniosModule { }
