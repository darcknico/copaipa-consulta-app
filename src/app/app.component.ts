import { Component } from '@angular/core';

import { Platform, } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

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
      title: 'Aportes',
      url: '/aportes',
      icon: 'cash'
    },
    {
      title: 'Matriculado',
      url: '/consultas',
      icon: 'document'
    }
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
  ) {
    this.initializeApp();
    //this.backButtonEvent();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

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
