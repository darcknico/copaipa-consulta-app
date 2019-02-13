import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Platform } from '@ionic/angular';
import { HttpAngularProvider } from './http-angular';
import { HttpNativeProvider } from './http-native';

@Injectable({
  providedIn: 'root'
})
export class NovedadService {
  public http: HttpNativeProvider | HttpAngularProvider;

  private base_path = environment.base_path + 'novedades';
  constructor(
    private platform: Platform, 
    private angularHttp: HttpAngularProvider, 
    private nativeHttp: HttpNativeProvider) {
      this.http = this.platform.is('cordova') ? this.nativeHttp : this.angularHttp;
  }

  getAll(){
    return this.http.get(this.base_path,{},{});
  }

}
