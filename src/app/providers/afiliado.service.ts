import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Platform } from '@ionic/angular';
import { HttpInterceptorProvider } from './http-interceptor';

@Injectable({
  providedIn: 'root'
})
export class AfiliadoService {

  private base_path = environment.base_path + 'afiliados/';
  constructor(
    private platform: Platform, 
    private http: HttpInterceptorProvider, 
  ) {
  }

  buscar(matricula:string){
    return this.http.post(this.base_path+'buscar',{
      matricula:matricula,
    });
  }

  colegios(){
    return this.http.get(this.base_path+'colegios');
  }

  certificado_convenio(matricula:string){
    return this.http.post(this.base_path+matricula+'/certificado/convenio',{});
  }

  certificado_comun(matricula:string){
    return this.http.post(this.base_path+matricula+'/certificado/comun',{});
  }

  certificado_reciprocidad(matricula:string,id_colegio:number){
    return this.http.post(this.base_path+matricula+'/certificado/reciprocidad',{
      id_colegio:id_colegio
    });
  }

}