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
import { HttpClientModule } from '@angular/common/http';
import { HttpAngularProvider } from './providers/http-angular';
import { HttpNativeProvider } from './providers/http-native';
import { IonicSelectableModule } from 'ionic-selectable';

import es from '@angular/common/locales/es-AR';
import { registerLocaleData } from '@angular/common';
import { LoadingService } from './providers/loading.service';
registerLocaleData(es);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicSelectableModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HTTP,
    HttpAngularProvider,
    HttpNativeProvider,
    TablaAporteService,
    LoadingService,
    FileTransfer,
    FileOpener,
    File,
    DocumentViewer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
