import {Injectable} from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NavController, Platform } from '@ionic/angular';
import { AlertService } from './alert.service';
import { HttpNativeProvider } from './http-native';
import { HttpAngularProvider } from './http-angular';
import { Router } from '@angular/router';
import { isObject } from 'util';

@Injectable()
export class HttpInterceptorProvider {
    public http: HttpNativeProvider | HttpAngularProvider;

    token:string;

    constructor(
        private authService:AuthService,
        private navController:NavController,
        private alert:AlertService,
        private platform: Platform,
        private angularHttp: HttpAngularProvider, 
        private nativeHttp: HttpNativeProvider,
        private router: Router
        ) {
            this.http = this.platform.is('cordova') ? this.nativeHttp : this.angularHttp;
            this.authService.getTokenStateObserver().subscribe(response=>{
                this.token = response;
            });
        }

    public get(url: string|(string|number)[], params?: any, options: any = {}):Observable<any> {
        let dir = '';
        if(url instanceof Array){
            dir = url.join('/');
        } else{
            dir = url;
        }
        return this.http.get(dir,params, options,this.token).pipe(
            catchError(err=>this.interceptor(err))
        );
    }

    public post(url: string|(string|number)[], params: any, options: any = {}):Observable<any> {
        let dir = '';
        if(url instanceof Array){
            dir = url.join('/');
        } else{
            dir = url;
        }
        return this.http.post(dir, params, options,this.token).pipe(
            catchError(err=>this.interceptor(err))
        );
    }

    public put(url: string|(string|number)[], params: any, options: any = {}):Observable<any> {
        let dir = '';
        if(url instanceof Array){
            dir = url.join('/');
        } else{
            dir = url;
        }
        return this.http.put(dir, params, options,this.token).pipe(
            catchError(err=>this.interceptor(err))
        );
    }

    public delete(url: string|(string|number)[], params?: any, options: any = {}):Observable<any> {
        let dir = '';
        if(url instanceof Array){
            dir = url.join('/');
        } else{
            dir = url;
        }
        return this.http.delete(dir, params, options,this.token).pipe(
            catchError(err=>this.interceptor(err))
        );
    }

    public interceptor(err){
        console.log(err);
        if(!err.status){
            this.alert.present('Error',null,'Problemas en el sistema/app',[]);
            return throwError(err);
        }
        if(err.status==400){
            this.navController.navigateRoot('home');
            return of([]);
        } else if(err.status==401){
            let respuesta = "";
            let message = err.error['message'];
            let error = err.error['error'];
            if(message){
                respuesta = message;
            } else if(error){
                respuesta = error;
            }
            this.alert.present(
                'Error',
                null,
                respuesta,
                ['OK']
            );
            this.authService.logout();
            return throwError(err);
        } else if(err.status==403 || err.status == 422){
            let title = err.error.message?err.error.message:(typeof err.error.error == 'string'?err.error.error:'Algo salió mal');
            let messages = [];
            let errores = isObject(err.error.error)?err.error.error:(err.error.errors?err.error.errors:{});
            if(isObject(errores)){
                for (const key in errores) {
                    if (errores.hasOwnProperty(key)) {
                        //console.log(errores[key]);
                        errores[key].forEach(e=>{
                            messages.push(e);
                        })
                    }
                }
            }
            this.alert.present(title,null,messages.join('\n'),[]);
        } else if(err.status==504){
            this.alert.present('Error',null,'Conexion perdida',[]);
            return of([]);
        } else if(err.status==500){
            this.alert.present('Error',null,'Problemas en el sistema',[]);
            return throwError(err);
        }
        return throwError(err);
    }
}