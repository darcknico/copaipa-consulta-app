import {Injectable} from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { from } from 'rxjs';

@Injectable()
export class HttpNativeProvider {
    constructor(public http: HTTP) {
        this.http.setDataSerializer('json');
    }

    public get(url: string, params?: any, options: any = {}) {
        let responseData = this.http.get(url, params, options)
            .then(resp => options.responseType == 'text' ? resp.data : JSON.parse(resp.data));

        return from(responseData);
    }

    public post(url:string, params: any, options: any = {}) {
        this.http.setDataSerializer('json');
        options['Content-Type'] = 'application/json';
        let responseData = this.http.post(url, params, options)
            .then(resp => {
                if(options.responseType == 'text' || options.responseType == 'blob'){
                    return resp.data;
                } else {
                    return JSON.parse(resp.data);
                }
            });

        return from(responseData);
    }
}