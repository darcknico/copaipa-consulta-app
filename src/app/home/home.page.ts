import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { NovedadService } from '../providers/novedad.service';
import * as moment from 'moment';
import { DepositoService } from '../providers/deposito.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  consultando = false;
  subscription:any; 

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

  novedades=[];

  constructor(
    private novedadService:NovedadService,
    private platform: Platform,
    private iab: InAppBrowser,
    private navCtrl:NavController,
    private deposito: DepositoService,
  ){

  }
  
  ngOnInit(): void {
    this.platform.ready().then(res => {
      this.deposito.getItem('novedades')
      .then(
        data => {
          if(data){
            this.novedades = data;
          }
          this.actualizar();
        },
        error => {
          this.actualizar();
        }
      );
      
    });
  }

  link_entry(link){
    const browser = this.iab.create(link,'_self',this.options);
  }

  ver_aportes(){
    this.navCtrl.navigateForward('/aportes');
  }

  ver_matriculas(){
    this.navCtrl.navigateForward('/consultas');
  }

  ver_convenios(){
    this.navCtrl.navigateForward('/convenios');
    //const browser = this.iab.create('http://www.copaipa.org.ar/category/beneficios/','_self',this.options);
  }

  ver_cursos(){
    const browser = this.iab.create('http://www.copaipa.org.ar/category/noticias/cursos_jornadas/','_self',this.options);

  }

  ver_novedades(){
    const browser = this.iab.create('http://www.copaipa.org.ar/category/noticias/novedades/page/2/','_self',this.options);
  }

  ver_oferta(){
    const browser = this.iab.create('http://www.copaipa.org.ar/ofertas-laborales/','_self',this.options);
  }

  ionViewDidEnter(){
    this.subscription = this.platform.backButton.subscribe(()=>{
      navigator['app'].exitApp(); 
    });
  }

  ionViewWillLeave(){
    this.subscription.unsubscribe();
  }

  actualizar(event?){
    if(!event){
      this.consultando = true;
    }
    this.novedadService.getAll().subscribe(response=>{
      this.consultando = false;
      this.novedades = response;
      if(event){
        event.target.complete();
      }
      this.deposito.setItem('novedades', response)
      .then(
        () => console.log('Novedades actualizada'),
        error => console.error('Novedades error', error)
      );
    },()=>{
      this.consultando = false;
    });
  }

}
