import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP } from '@ionic-native/http/ngx';
import { TablaAporteService } from './providers/tabla-aporte.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpAngularProvider } from './providers/http-angular';
import { HttpNativeProvider } from './providers/http-native';
import { IonicSelectableModule } from 'ionic-selectable';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';

import es from '@angular/common/locales/es-AR';
import { registerLocaleData } from '@angular/common';
import { LoadingService } from './providers/loading.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Toast } from '@ionic-native/toast/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { NovedadService } from './providers/novedad.service';
import { AfiliadoService } from './providers/afiliado.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from './external/error/error.component';
import { NotFoundComponent } from './external/not-found/not-found.component';
import { DepositoService } from './providers/deposito.service';
import { AuthService } from './_services/auth.service';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { UsuarioService } from './_services/usuario.service';
import { AlertService } from './providers/alert.service';
import { ConvenioService } from './_services/convenio.service';
import { HttpInterceptorProvider } from './providers/http-interceptor';
registerLocaleData(es);

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    NotFoundComponent, 
  ],
  entryComponents: [
    
  ],
  imports: [
    BrowserModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicSelectableModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HTTP,
    HttpAngularProvider,
    HttpNativeProvider,
    HttpInterceptorProvider,
    TablaAporteService,
    NovedadService,
    AfiliadoService,
    
    LoadingService,
    AlertService,
    FileTransfer,
    FileOpener,
    File,
    DocumentViewer,
    InAppBrowser,
    Toast,
    NativeStorage,
    DepositoService,
    AuthService,
    UsuarioService,
    ConvenioService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
