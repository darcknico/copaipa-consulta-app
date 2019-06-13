import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { AuthService } from '../_services/auth.service';
import { Auxiliar } from '../_helpers/auxiliar';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { NavController } from '@ionic/angular';
import { AlertService } from './alert.service';

@Injectable()
export class HttpAngularProvider {

    token:string;

    constructor(
        public http: HttpClient,
        private authService:AuthService,
        private navController:NavController,
        private alertService:AlertService,
        ) {
            this.authService.getTokenStateObserver().subscribe(response=>{
                this.token = response;
            });
        }

    public get(url: string, params?: any, options: any = {}):Observable<any> {
        options.params = params;
        options.withCredentials = false;
        if(!Auxiliar.isNullorUndefined(this.token)){
            options.headers = new HttpHeaders({
                Authorization:this.token
            });
        }
        return this.http.get(url, options).pipe(
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
                return throwError(err);
            })
        );
    }

    public post(url: string, params: any, options: any = {}):Observable<any> {
        options.withCredentials = false;
        if(!Auxiliar.isNullorUndefined(this.token)){
            options.headers = new HttpHeaders({
                Authorization:this.token
            });
        }

        return this.http.post(url, params, options).pipe(
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
                return throwError(err);
            })
        );
    }
    
}