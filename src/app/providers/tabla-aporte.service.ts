import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Platform } from '@ionic/angular';
import { DetalleTablaAporte } from '../_models/tabla.aporte';
import { HttpInterceptorProvider } from './http-interceptor';

@Injectable({
  providedIn: 'root'
})
export class TablaAporteService {

  private base_path = environment.base_path + 'tabla-aportes';
  constructor(
    private platform: Platform, 
    private http: HttpInterceptorProvider, 
    ) {
  }

  getAll(){
    return this.http.get(this.base_path,{},{});
  }

  detalle(id_tarea:number,id_subtarea:number,id_subcategoria:number,importe:number){
    return this.http.get(this.base_path+'/detalles',{
      id_tarea:String(id_tarea),
      id_subtarea:String(id_subtarea),
      id_subcategoria:String(id_subcategoria),
      importe:String(importe),
    },{});
  }

  importes(id_tarea:number,id_subtarea:number,id_subcategoria:number){
    return this.http.get(this.base_path+'/importes',{
      id_tarea:String(id_tarea),
      id_subtarea:String(id_subtarea),
      id_subcategoria:String(id_subcategoria),
    },{});
  }

  reporte_url(){
    return this.base_path+'/detalles/reporte';
  }
  reporte(detalles:DetalleTablaAporte[]){
    return this.http.post(this.base_path+'/detalles/reporte',detalles);
  }
}
