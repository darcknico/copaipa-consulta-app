import {Injectable} from '@angular/core';
import { Auxiliar } from '../_helpers/auxiliar';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class HttpAngularProvider {

    constructor(
        public http: HttpClient,
        ) {
        }

    public get(url: string, params?: any, options: any = {}, token:string = null):Observable<any> {
        options.params = params;
        options.withCredentials = false;
        if(!Auxiliar.isNullorUndefined(token)){
            options.headers = new HttpHeaders({
                Authorization:token
            });
        }
        return this.http.get(url, options);
    }

    public delete(url: string, params?: any, options: any = {}, token:string = null):Observable<any> {
        options.params = params;
        options.withCredentials = false;
        if(!Auxiliar.isNullorUndefined(token)){
            options.headers = new HttpHeaders({
                Authorization:token
            });
        }
        return this.http.delete(url, options);
    }

    public post(url: string, params: any, options: any = {}, token:string = null):Observable<any> {
        options.withCredentials = false;
        if(!Auxiliar.isNullorUndefined(token)){
            options.headers = new HttpHeaders({
                Authorization:token
            });
        }

        return this.http.post(url, params, options);
    }

    public put(url: string, params: any, options: any = {}, token:string = null):Observable<any> {
        options.withCredentials = false;
        if(!Auxiliar.isNullorUndefined(token)){
            options.headers = new HttpHeaders({
                Authorization:token
            });
        }

        return this.http.put(url, params, options);
    }

}