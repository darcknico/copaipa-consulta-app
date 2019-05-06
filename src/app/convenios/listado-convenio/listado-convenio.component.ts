import { Component, OnInit, ViewChild } from '@angular/core';
import { ConvenioService, FiltroConvenio } from 'src/app/_services/convenio.service';
import { Provincia, Localidad, Convenio, TipoConvenio } from 'src/app/_models/convenio';
import { LoadingService } from 'src/app/providers/loading.service';
import { IonicSelectableComponent } from 'ionic-selectable';
import { IonInfiniteScroll, IonContent } from '@ionic/angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-listado-convenio',
  templateUrl: './listado-convenio.component.html',
  styleUrls: ['./listado-convenio.component.scss']
})
export class ListadoConvenioComponent implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  options: InAppBrowserOptions = {
    location: 'no',
    hidden: 'no',
    clearcache: 'yes',
    clearsessioncache: 'yes',
    zoom: 'no',
    hardwareback: 'yes',
    mediaPlaybackRequiresUserAction: 'no',
    shouldPauseOnSuspend: 'no',
    closebuttoncaption: 'Cerrar',
    disallowoverscroll: 'yes',
    toolbar: 'no',
    enableViewportScale: 'no',
    allowInlineMediaPlayback: 'no',
    presentationstyle: 'pagesheet',
    fullscreen: 'yes',
    footer: 'no'
  };
  
  filtro:FiltroConvenio = {
    start:0,
    length:7,
    search:"",

    id_provincia:0,
    id_localidad:0,
    id_tipo_convenio:'0',
  }
  provincias:Provincia[] = [];
  localidades:Localidad[] = [];
  tipos:TipoConvenio[] = [];
  provincia:Provincia;
  localidad:Localidad;
  tipo:TipoConvenio;
  convenios:Convenio[] = [];
  consultando:boolean = false;
  total:number = 0;
  constructor(
    private convenioService:ConvenioService,
    private authService:AuthService,
    private loadingService: LoadingService,
    private iab: InAppBrowser,
  ) { }

  ngOnInit() {
    this.authService.isAuthenticatedPromise().then(response=>{
      if(response){
        this.iniciar();
      }
    });
    
  }

  iniciar(){
    this.loadingService.present();
    let item = <Provincia>{};
    item.id = 0;
    item.nombre = 'TODOS';
    this.convenioService.provincias().subscribe(response=>{
      this.loadingService.dismiss();
      if(response.length>0){
        this.provincias = response;
      }
      this.provincias.push(item);
      this.provincias = this.provincias.reverse();
    });
    this.provincia = item;
    let loc = <Localidad>{};
    loc.id = 0;
    loc.nombre = 'TODOS';
    this.convenioService.localidades().subscribe(response=>{
      if(response.length>0){
        this.localidades = response;
      }
      this.localidades.push(loc);
      this.localidades = this.localidades.reverse();
    });
    this.localidad = loc;
    let tipo = <TipoConvenio>{};
    tipo.id = '0';
    tipo.nombre = 'TODOS';
    this.convenioService.tipos().subscribe(response=>{
      this.tipos = response;
      this.tipos.push(tipo);
      this.tipos = this.tipos.reverse();
    });
    this.tipo = tipo;
    this.refrescar();
  }

  async refrescar(){
    this.convenios = [];
    this.consultando = true;
    this.convenioService.ajax(this.filtro).subscribe(response=>{
      if(response.items.length>0){
        for(let i = 0; i < response.items.length; i++){
          let item = response.items[i];
          setTimeout(() => {
              this.convenios.push(item);
          }, 200*(i+1));
        }
        this.filtro.start = response.items.length;
      }
      this.total = response.total_count;
      this.consultando = false;
    });
  }

  async web(web:string){
    const browser = this.iab.create(web,'_self',this.options);
  }

  seleccionar_provincia(event: {
    component: IonicSelectableComponent,
    value: Provincia 
  }){
    this.localidades = [];
    let item = <Localidad>{};
    item.id = 0;
    item.nombre = 'TODOS';
    this.convenioService.localidades(event.value.id).subscribe(response=>{
      if(response.length>0){
        this.localidades = response;
      }
      this.localidades.push(item);
      this.localidades = this.localidades.reverse();
    });
    this.localidad = item;
    this.filtro.start = 0;
    this.filtro.id_provincia = event.value.id;
    this.filtro.id_localidad = 0;
    this.refrescar();
  }

  seleccionar_localidad(event: {
    component: IonicSelectableComponent,
    value: Provincia 
  }){
    this.filtro.start = 0;
    this.filtro.id_localidad = event.value.id;
    this.refrescar();
  }

  seleccionar_tipo(event: {
    component: IonicSelectableComponent,
    value: TipoConvenio 
  }){
    this.filtro.start = 0;
    this.filtro.id_tipo_convenio = event.value.id;
    this.refrescar();
  }

  async limpiar(){
    this.content.scrollToTop(1500);
    this.localidades = [];
    this.localidad = null;
    let item = <Provincia>{};
    item.id = 0;
    item.nombre = 'TODOS';
    this.provincia = item;
    this.filtro.id_provincia = 0;
    this.filtro.id_localidad = 0;
    this.filtro.start = 0;
    this.total = 0;
    this.refrescar();
  }

  async loadData(event) {
    if (this.filtro.start == this.total) {
      event.target.complete();
      event.target.disabled = true;
      return
    }
    this.convenioService.ajax(this.filtro).subscribe(response=>{
      this.filtro.start += response.items.length;
      for(let i = 0; i < response.items.length; i++){
        let item = response.items[i];
        setTimeout(() => {
            this.convenios.push(item);
        }, 200*(i+1));
      }
      event.target.complete();
    });
  }

  icono(id:string){
    let ico = null;
    switch(id){
      case 'C': //capacitacion
        ico = 'school';
        break;
      case 'G': //gastronomia
        ico = 'pizza';
        break;
      case 'H': //hotel
        ico = 'bed';
        break;
      case 'O': //indumentaria
        ico = 'shirt';
        break;
      case 'I': //informatica
        ico = 'desktop';
        break;
      case 'S': //salud
        ico = 'medkit';
        break;
      case 'BC': //construccion
        ico = 'build';
        break;
      case 'BOS': //otros
        ico = 'business';
        break;
      case 'BHS': //higiene y seguridad
        ico = 'lock';
        break;
      case 'BEV': //Equipo y vehiculos
        ico = 'car';
        break;
      case 'BDM': //decoracion muebles
        ico = 'home';
        break;
    }
    return ico;
  }
}
