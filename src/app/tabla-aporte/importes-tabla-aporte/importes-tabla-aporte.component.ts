import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Subtarea, ImporteTablaAporte } from '../../_models/tabla.aporte';
import { TablaAporteService } from '../../providers/tabla-aporte.service';

@Component({
  selector: 'app-importes-tabla-aporte',
  templateUrl: './importes-tabla-aporte.component.html',
  styleUrls: ['./importes-tabla-aporte.component.scss']
})
export class ImportesTablaAporteComponent implements OnInit {

  subtarea:Subtarea;
  importes:ImporteTablaAporte[];

  constructor(
    private navParams:NavParams,
    private tablaAporteService:TablaAporteService,
    private modalCtrl: ModalController,
    ) { }

  ngOnInit() {
    this.subtarea = this.navParams.get('subtarea');
    this.tablaAporteService.importes(
      this.subtarea.id_tarea,
      this.subtarea.id_subtarea,
      this.subtarea.id_subcategoria
    ).subscribe(response=>{
      this.importes = response;
    });
  }

  cerrar(){
    this.modalCtrl.dismiss(true);
  }

}
