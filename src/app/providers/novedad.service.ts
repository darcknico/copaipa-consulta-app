import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Platform } from '@ionic/angular';
import { HttpInterceptorProvider } from './http-interceptor';

@Injectable({
  providedIn: 'root'
})
export class NovedadService {

  private base_path = environment.base_path + 'novedades';
  constructor(
    private platform: Platform, 
    private http: HttpInterceptorProvider, 
    ) {
  }

  getAll(){
    return this.http.get(this.base_path,{},{});
  }

}
