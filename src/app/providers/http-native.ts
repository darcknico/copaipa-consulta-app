import {Injectable} from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { from, Observable, of, throwError } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { Auxiliar } from '../_helpers/auxiliar';
import { catchError } from 'rxjs/internal/operators/catchError';
import { NavController } from '@ionic/angular';
import { AlertService } from './alert.service';

@Injectable()
export class HttpNativeProvider {

    token:string;

    constructor(
        public http: HTTP,
        private authService:AuthService,
        private navController:NavController,
        private alertService:AlertService,
        ) {
        this.http.setDataSerializer('json');
        this.authService.getTokenStateObserver().subscribe(response=>{
            this.token = response;
        });
    }

    public get(url: string, params?: any, options: any = {}):Observable<any> {
        if(!Auxiliar.isNullorUndefined(this.token)){
            options['Authorization'] = this.token;
        }
        let responseData = this.http.get(url, params, options)
            .then(resp => options.responseType == 'text' ? resp.data : JSON.parse(resp.data));

        return from(responseData).pipe(
            catchError((err,caught)=>{
                console.log(err);
                if(err.status==400){
                    this.authService.logout();
                    return of([]);
                } else if(err.status==504){
                    this.alertService.present('Error',null,'Conexion perdida',[]);
                } else if(err.status==500){
                    this.alertService.present('Error',null,'Problemas en el sistema',[]);
                }
                if(err.error){
                    err.error = JSON.parse(err.error);
                }
                return throwError(err);
            })
        );
    }

    public post(url:string, params: any, options: any = {}):Observable<any> {
        this.http.setDataSerializer('json');
        options['Content-Type'] = 'application/json';
        if(!Auxiliar.isNullorUndefined(this.token)){
            options['Authorization'] = this.token;
        }
        let responseData = this.http.post(url, params, options)
            .then(resp => {
                if(options.responseType == 'text' || options.responseType == 'blob'){
                    return resp.data;
                } else {
                    return JSON.parse(resp.data);
                }
            });

        return from(responseData).pipe(
            catchError((err,caught)=>{
                console.log(err);
                if(err.status==400){
                    this.authService.logout();
                    return of([]);
                } else if(err.status==504){
                    this.alertService.present('Error',null,'Conexion perdida',[]);
                } else if(err.status==500){
                    this.alertService.present('Error',null,'Problemas en el sistema',[]);
                }
                if(err.error){
                    err.error = JSON.parse(err.error);
                }
                return throwError(err);
            })
        );
    }
}