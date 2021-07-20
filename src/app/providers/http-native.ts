import {Injectable} from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { from, Observable, throwError } from 'rxjs';
import { Auxiliar } from '../_helpers/auxiliar';
import { catchError } from 'rxjs/internal/operators/catchError';
@Injectable()
export class HttpNativeProvider {

    constructor(
        public http: HTTP,
        ) {
        this.http.setDataSerializer('json');
        this.http.setHeader('*', 'Accept', 'application/json');
        this.http.setHeader('*', 'Content-Type', 'application/json');
    }

    public get(url: string, params?: any, options: any = {}, token:string = null):Observable<any> {
        this.http.setDataSerializer('json');
        if(!Auxiliar.isNullorUndefined(token)){
            options['Authorization'] = token;
        }
        let responseData = this.http.get(url, params, options)
            .then(resp => options.responseType == 'text' ? resp.data : JSON.parse(resp.data));

        return from(responseData).pipe(
            catchError(this.parseErrar)
        );
    }

    public delete(url: string, params?: any, options: any = {}, token:string = null):Observable<any> {
        this.http.setDataSerializer('json');
        if(!Auxiliar.isNullorUndefined(token)){
            options['Authorization'] = token;
        }
        let responseData = this.http.delete(url, params, options)
            .then(resp => options.responseType == 'text' ? resp.data : JSON.parse(resp.data));

        return from(responseData).pipe(
            catchError(this.parseErrar)
        );
    }

    public post(url:string, params: any, options: any = {}, token:string = null):Observable<any> {
        this.http.setDataSerializer('json');
        if(!Auxiliar.isNullorUndefined(token)){
            options['Authorization'] = token;
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
            catchError(this.parseErrar)
        );
    }

    public put(url:string, params: any, options: any = {}, token:string = null):Observable<any> {
        //options['Content-Type'] = 'application/json';
        this.http.setDataSerializer('json');
        if(!Auxiliar.isNullorUndefined(token)){
            options['Authorization'] = token;
        }
        let responseData = this.http.put(url, params, options)
            .then(resp => {
                if(options.responseType == 'text' || options.responseType == 'blob'){
                    return resp.data;
                } else {
                    return JSON.parse(resp.data);
                }
            });

        return from(responseData).pipe(
            catchError(this.parseErrar)
        );
    }

    private parseErrar(err,caught){
        if(err && err.error){
            console.log(err.error);
            if(typeof err.error === 'string' || err.error instanceof String){
                err.error = JSON.parse(err.error);
            }
        }
        return throwError(err);
    }

    isJsonString(text) {
        if (/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').
        replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
        replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
            return true;
        }else{
            return false;
        }

    }
}