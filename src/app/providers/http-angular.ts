import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class HttpAngularProvider {
    constructor(public http: HttpClient) {}

    public get(url: string, params?: any, options: any = {}) {
        options.params = params;
        options.withCredentials = false;

        return this.http.get(url, options);
    }

    public post(url: string, params: any, options: any = {}) {
        options.withCredentials = false;

        let body = this.createSearchParams(params);

        return this.http.post(url, params, options);
    }

    private createSearchParams(params: any) {
        let searchParams = new URLSearchParams();
        for (let k in params) {
            if (params.hasOwnProperty(k)) {
                searchParams.set(k, params[k]);
            }
        }

        return searchParams;
    }
}