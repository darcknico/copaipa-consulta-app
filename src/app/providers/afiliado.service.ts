import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Platform } from '@ionic/angular';
import { HttpAngularProvider } from './http-angular';
import { HttpNativeProvider } from './http-native';

@Injectable({
  providedIn: 'root'
})
export class AfiliadoService {
  public http: HttpNativeProvider | HttpAngularProvider;

  private base_path = environment.base_path + 'afiliados/';
  constructor(
    private platform: Platform, 
    private angularHttp: HttpAngularProvider, 
    private nativeHttp: HttpNativeProvider) {
      this.http = this.platform.is('cordova') ? this.nativeHttp : this.angularHttp;
  }

  matriculado(matricula:string){
    return this.http.post(this.base_path+'activo',{
      matricula:matricula,
    });
  }

}