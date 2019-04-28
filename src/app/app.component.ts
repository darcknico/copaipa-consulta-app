import { Component } from '@angular/core';

import { Platform, } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { UsuarioService } from './_services/usuario.service';
import { LoadingService } from './providers/loading.service';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  public appPages = [
    {
      title: 'Inicio',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Ajustes',
      url: '/pages/perfil',
      icon: 'person'
    },
    {
      title: 'Aportes',
      url: '/aportes',
      icon: 'cash'
    },
    {
      title: 'Matriculado',
      url: '/consultas',
      icon: 'document'
    },
    {
      title: 'Convenios',
      url: '/convenios',
      icon: 'git-commit'
    },
  ];

  /*
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
  */
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translateService: TranslateService,
    private usuarioService:UsuarioService,
    private authService:AuthService,
    private loadingService:LoadingService,
    ) {
    this.initializeApp();
    //this.backButtonEvent();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.translateService.setDefaultLang('es');
      this.translateService.use('es');

      this.authService.isAuthenticatedPromise().then(res=>{
        if(res){
          this.usuarioService.me().subscribe(response=>{

          });
        }
      });
    });
  }

  salir(){
    this.loadingService.present();
    this.usuarioService.logout().subscribe(response=>{
      this.loadingService.dismiss();
    });
  }

  /*
  backButtonEvent(){
    this.platform.backButton.subscribe(async () => {
        // close action sheet
        try {
            const element = await this.actionSheetCtrl.getTop();
            if (element) {
                element.dismiss();
                return;
            }
        } catch (error) {
        }

        // close popover
        try {
            const element = await this.popoverCtrl.getTop();
            if (element) {
                element.dismiss();
                return;
            }
        } catch (error) {
        }

        // close modal
        try {
            const element = await this.modalCtrl.getTop();
            if (element) {
                element.dismiss();
                return;
            }
        } catch (error) {
            console.log(error);

        }

        // close side menua
        try {
            const element = await this.menu.getOpen();
            if (element !== null) {
                this.menu.close();
                return;

            }

        } catch (error) {

        }

        this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
            console.log('route '+this.router.url);
            if (this.router.url === '/home' || this.router.url === '/' || this.router.url === '' ) {
                if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
                  
                    navigator['app'].exitApp(); 

                } else {
                    this.toast.show(
                        `Presione de nuevo para salir de la App.`,
                        '2000',
                        'bottom')
                        .subscribe(toast => {
                            // console.log(JSON.stringify(toast));
                        });
                    this.lastTimeBackPress = new Date().getTime();
                }
            } else if (outlet && outlet.canGoBack()) {
                outlet.pop();
            }
        });
    });
  }
  */
}
