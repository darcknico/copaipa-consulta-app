import { Component, OnInit } from '@angular/core';
import { NavController, Platform, ModalController } from '@ionic/angular';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { NovedadService } from '../providers/novedad.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import * as moment from 'moment';

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

  novedades:any;

  constructor(
    private novedadService:NovedadService,
    private modalCtrl: ModalController,
    private platform: Platform,
    private iab: InAppBrowser,
    private navCtrl:NavController,
    private nativeStorage: NativeStorage,
  ){

  }
  
  ngOnInit(): void {
    this.platform.ready().then(() => {
      this.nativeStorage.getItem('novedades')
      .then(
        data => {
          this.novedades = data;
          this.nativeStorage.getItem('actualizado').then(data=>{
            let ahora = moment();
            let fecha = moment(data);
            if(!fecha.isSame(ahora,'day')){
              this.actualizar();
            }
          });
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
    const browser = this.iab.create('http://www.copaipa.org.ar/category/beneficios/','_self',this.options);

  }

  ver_cursos(){
    const browser = this.iab.create('http://www.copaipa.org.ar/category/noticias/cursos_jornadas/','_self',this.options);

  }

  ver_novedades(){
    const browser = this.iab.create('http://www.copaipa.org.ar/category/noticias/novedades/page/2/','_self',this.options);
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
      let fecha = moment();
      this.nativeStorage.setItem('actualizado',fecha.format('YYYY-MM-DD HH:mm')).then(() => console.log('Fecha actualizada'));
      this.nativeStorage.setItem('novedades', response)
      .then(
        () => console.log('Novedades actualizada'),
        error => console.error('Novedades error', error)
      );
    },()=>{
      this.consultando = false;
    });
  }

}
