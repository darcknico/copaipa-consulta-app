import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Auxiliar } from '../_helpers/auxiliar';
import { Convenio } from '../_models/convenio';
import { HttpInterceptorProvider } from '../providers/http-interceptor';

export interface FiltroConvenio{
    length:number;
    start:number;
    search:string;

    id_localidad:number;
    id_provincia:number;
    id_tipo_convenio:string;
}
export interface ConvenioAjax{
    items:Convenio,
    total_count:number;
}
@Injectable({
  providedIn: 'root'
})
export class ConvenioService {
    private base_path = environment.base_path + 'convenios';

    constructor(
        private platform: Platform,
        private http: HttpInterceptorProvider, 
    ) { 
    }

    public getAll(){
        return this.http.get(this.base_path,{});
    }

    public ajax(filtro:FiltroConvenio){
        return this.http.get(this.base_path,
            Auxiliar.toParams(filtro)
        );
    }

    public localidades(id_provincia:number = 0){
        return this.http.get(this.base_path + '/localidades',{
            id_provincia:String(id_provincia)
        });
    }

    public provincias(){
        return this.http.get(this.base_path + '/provincias',{});
    }

    public tipos(){
        return this.http.get(this.base_path + '/tipos',{});
    }
}