import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { IonicSelectableComponent } from 'ionic-selectable';
import { IonList, IonItemSliding, ToastController, ModalController, Platform, IonInput, NavController } from '@ionic/angular';
import { Tarea, Subtarea, DetalleTablaAporte } from '../../_models/tabla.aporte';
import { TablaAporteService } from '../../providers/tabla-aporte.service';
import { LoadingService } from '../../providers/loading.service';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { ImportesTablaAporteComponent } from '../importes-tabla-aporte/importes-tabla-aporte.component';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Auxiliar } from '../../_helpers/auxiliar';

@Component({
  selector: 'app-inicio-tabla-aporte',
  templateUrl: './inicio-tabla-aporte.component.html',
  styleUrls: ['./inicio-tabla-aporte.component.scss']
})
export class InicioTablaAporteComponent implements OnInit {

  @ViewChild('selectSubtarea') selectSubtarea: IonicSelectableComponent;
  @ViewChild('cantidadInput') cantidadInput: IonInput;
  @ViewChild('slidingList') slidingList: IonList;
  @ViewChildren(IonItemSliding) private slidingItems: QueryList<IonItemSliding>;

  id_tarea:number;
  id_subtarea:number;
  tareas:Tarea[]=[];
  subtareas:Subtarea[]=[];
  subtareas_seleccionadas:Subtarea[]=[];
  subtarea:Subtarea = null;
  cantidad:number;
  total:number = 0;
  detalles:DetalleTablaAporte[]=[];
  data:any;
  subscription:any; 

  constructor(
    private tablaAporteService:TablaAporteService,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    public loadingService: LoadingService,
    private platform: Platform,
    private fileOpener: FileOpener,
    private file: File,
    private navCtrl:NavController,
    private nativeStorage: NativeStorage,
  ){
  }

  ngOnInit(){
    this.platform.ready().then(() => {
      this.loadingService.present();
      this.tablaAporteService.getAll().subscribe(response=>{
        this.loadingService.dismiss();
        this.data = response;
        if(this.tareas.length == 0 && this.subtareas.length == 0){
          this.data.forEach(item => {
            let tarea=<Tarea>{};
            tarea.id_tarea = item.id_tarea;
            tarea.tarea = item.tarea;
            
            if(this.tareas.filter(t=>{return t.id_tarea == tarea.id_tarea}).length == 0){
              this.tareas.push(tarea);
            }

            let subtarea=<Subtarea>{};
            subtarea.id_tarea = item.id_tarea;
            subtarea.id_subtarea = item.id_subtarea;
            subtarea.id_subcategoria = item.id_subcategoria;
            subtarea.subtarea = item.subtarea;
            subtarea.tarea = item.tarea;
            subtarea.unidad = item.unidad_de_medida;
            if(item.descuento){
              subtarea.descuento = item.descuento;
            } else {
              subtarea.descuento = null;
            }

            if(this.subtareas.filter(s=>{
              return s.id_subtarea == subtarea.id_subtarea && s.id_tarea == subtarea.id_tarea
            }).length == 0){
              this.subtareas.push(subtarea);
            }
          });
        }
        
      });
    });
  }

  refrescar(){
    this.loadingService.present();
    this.tareas = [];
    this.subtareas = [];
    this.tablaAporteService.getAll().subscribe(response=>{
      this.loadingService.dismiss();
      this.data = response;
      this.data.forEach(item => {
        let tarea=<Tarea>{};
        tarea.id_tarea = item.id_tarea;
        tarea.tarea = item.tarea;
        
        if(this.tareas.filter(t=>{return t.id_tarea == tarea.id_tarea}).length == 0){
          this.tareas.push(tarea);
        }

        let subtarea=<Subtarea>{};
        subtarea.id_tarea = item.id_tarea;
        subtarea.id_subtarea = item.id_subtarea;
        subtarea.id_subcategoria = item.id_subcategoria;
        subtarea.subtarea = item.subtarea;
        subtarea.tarea = item.tarea;
        subtarea.unidad = item.unidad_de_medida;
        if(item.descuento){
          subtarea.descuento = item.descuento;
        } else {
          subtarea.descuento = null;
        }

        if(this.subtareas.filter(s=>{
          return s.id_subtarea == subtarea.id_subtarea && s.id_tarea == subtarea.id_tarea
        }).length == 0){
          this.subtareas.push(subtarea);
        }
      });
    });
  }

  seleccionar_tarea(event: {
    component: IonicSelectableComponent,
    value: Tarea 
  }){
    this.subtareas_seleccionadas = [];
    this.subtareas_seleccionadas = this.subtareas.filter(item=>{
      return item.id_tarea == event.value.id_tarea;
    }).sort((a,b)=>{
      return a.subtarea.localeCompare(b.subtarea);
    });
    if(this.subtarea){
      this.selectSubtarea.clear();
    }
    this.subtarea = null;
    this.cantidad = null;
  }

  async seleccionar_subtarea(event: {
    component: IonicSelectableComponent,
    value: Subtarea 
  }){
    this.subtarea = this.subtareas_seleccionadas.find(item=>{
      return item.id_subtarea == event.value.id_subtarea;
    });
    this.cantidad = null;
    this.cantidadInput.setFocus();
  }

  async detalle_agregar(){
    if(this.cantidad<=0){
      const toast = await this.toastCtrl.create({
        message: 'La cantidad debe ser mayor que cero.',
        duration: 3000,
        position: 'middle'
      });
      toast.present();
      return;
    }
    const toast = await this.toastCtrl.create({
      message: 'Detalle agregado.',
      duration: 3000,
      position: 'middle'
    });
    this.loadingService.present();
    this.tablaAporteService.detalle(
      this.subtarea.id_tarea,
      this.subtarea.id_subtarea,
      this.subtarea.id_subcategoria,
      this.cantidad
      ).subscribe(response=>{
        this.loadingService.dismiss();
        console.log(response);
        let importe_desde = response.detalle.tacrtimportes_desde;
        let importe_fijo = response.detalle.tacrtimportes_importeFijo;
        let importe_variable = response.detalle.tacrtimportes_importevariable;

        let random = Math.round(Math.random() * (999999 - 100000)) + 100000;
        let detalle = <DetalleTablaAporte>{};
        detalle.id = random;
        detalle.id_tarea = this.subtarea.id_tarea;
        detalle.id_subtarea = this.subtarea.id_subtarea;
        detalle.id_subcategoria = this.subtarea.id_subcategoria;
        detalle.tarea = this.subtarea.tarea;
        detalle.subtarea = this.subtarea.subtarea;
        detalle.descuento_descripcion = this.subtarea.descuento;
        detalle.cantidad = this.cantidad;
        detalle.unidad = this.subtarea.unidad;
        detalle.importe = Math.ceil(importe_fijo + ( (this.cantidad-importe_desde)*importe_variable));
        if(response.descuento){
          detalle.descuento = response.descuento.tatarsubcrt_porcDescuento;
          detalle.descuento_descripcion += " "+response.descuento.tatarsubcrt_descripcionPorcDescuento;
          detalle.descuento_aplicado = detalle.descuento == 0;
        } else {
          detalle.descuento = 0;
          detalle.descuento_aplicado = true;
        }

        this.detalles.push(detalle);
        toast.present();
        this.calcular_total();
        return;
      });
  }

  async detalle_quitar(slidingItem:IonItemSliding,detalle:DetalleTablaAporte){
    await slidingItem.closeOpened();
    if(this.detalles.length>0){
      this.detalles = this.detalles.filter(item=>item.id!=detalle.id);
    } else {
      this.detalles = [];
    }
    const toast = await this.toastCtrl.create({
      message: 'Detalle quitado.',
      duration: 3000,
      position: 'middle'
    });
    toast.present();
    this.calcular_total();
    if(this.slidingList){
      await this.slidingList.closeSlidingItems();
    }
  }

  async detalle_descuento(slidingItem:IonItemSliding,detalle:DetalleTablaAporte){
    await slidingItem.closeOpened();
    let index = this.detalles.indexOf(detalle);
    this.detalles = this.detalles.filter(item=>item.id!==detalle.id);
    detalle.importe = detalle.importe * (detalle.descuento/100);
    detalle.descuento_aplicado = true;
    if(this.detalles.length>0){
      this.detalles.splice(index,0,detalle);
    } else {
      this.detalles.push(detalle);
    }
    const toast = await this.toastCtrl.create({
      message: 'Descuento aplicado.',
      duration: 3000,
      position: 'middle'
    });
    toast.present();
    this.calcular_total();
    await this.slidingList.closeSlidingItems();
  }

  async detalle_descuento_quitar(slidingItem:IonItemSliding,detalle:DetalleTablaAporte){
    await slidingItem.closeOpened();
    let index = this.detalles.indexOf(detalle);
    this.detalles = this.detalles.filter(item=>item.id!==detalle.id);
    detalle.importe = detalle.importe * (100/(100-detalle.descuento));
    detalle.descuento_aplicado = false;
    if(this.detalles.length>0){
      this.detalles.splice(index,0,detalle);
    } else {
      this.detalles.push(detalle);
    }
    const toast = await this.toastCtrl.create({
      message: 'Descuento quitado.',
      duration: 3000,
      position: 'middle'
    });
    toast.present();
    this.calcular_total();
    await this.slidingList.closeSlidingItems();
  }

  rango_importes(){
    this.modalCtrl.create({
      component: ImportesTablaAporteComponent,
      componentProps:{
        subtarea:this.subtarea,
      }
    }).then((modal) => {
        modal.present();
    });
  }
  
  async limpiar(){
    this.detalles = [];
    await this.slidingList.closeSlidingItems();
  }
  
  calcular_total(){
    this.total = 0;
    if(this.detalles.length>0){
      for (var index = 0; index < this.detalles.length; index++) {
        var element = this.detalles[index];
        this.total += element.importe;
      }
    }
  }

  async imprimir(){
    const toast = await this.toastCtrl.create({
      message: 'Reporte listo.',
      duration: 3000,
      position: 'middle'
    });
    this.loadingService.present();
    this.tablaAporteService.reporte(this.detalles).subscribe(response=>{
      const writeDirectory = this.platform.is('ios') ? this.file.dataDirectory : this.file.dataDirectory;
      console.log('Conviertiendo base64 to PDF');
      this.file.writeFile(writeDirectory, response.filename, Auxiliar.convertBaseb64ToBlob(response.file, 'application/pdf'), {replace: true})
        .then(() => {
            this.loadingService.dismiss();
            toast.present();
            this.fileOpener.open(writeDirectory + response.filename, 'application/pdf')
                .catch(() => {
                    console.log('Error opening pdf file');
                });
        })
        .catch(() => {
            console.error('Error writing pdf file');
        });
    });
  }


  ionViewDidEnter(){
    this.subscription = this.platform.backButton.subscribe(()=>{
      this.navCtrl.navigateForward('/home');
    });
  }

  ionViewWillLeave(){
    this.subscription.unsubscribe();
  }
}
