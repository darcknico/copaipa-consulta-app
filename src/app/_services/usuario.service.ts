import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { Auxiliar } from '../_helpers/auxiliar';
import { HttpInterceptorProvider } from '../providers/http-interceptor';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
    private base_path = environment.base_path ;

    constructor(
        private authService:AuthService,
        private platform: Platform,
        private http: HttpInterceptorProvider, 
    ) { 
        
    }

    public coincidencia(email){
        return this.http.get(this.base_path+'email',{
            email:email
        });
    }

    public login(email,pass){
        return this.http.post(this.base_path+'auth/login',{
            email:email,
            password:pass,
        }).pipe(map(response=>{
            let token = response['access_token'];
            let type = response['token_type'];
            let recovery = false;
            if(!Auxiliar.isNullorUndefined(response['recovery'])){
                recovery = response['recovery'];
            }
            this.authService.login(type,token,recovery).then(res=>{
                this.me().subscribe();
            });
        }));
    }

    public register(matricula,email,pass,pass2){
        return this.http.post(this.base_path+'auth/register',{
            matricula:matricula,
            email:email,
            password:pass,
            c_password:pass2,
        }).pipe(
            map(response=>{
                let token = response['access_token'];
                let type = response['token_type'];
                this.authService.login(type,token).then(res=>{
                    this.me().subscribe();
                });
            })
        );
    }

    public logout(){
        return this.http.post(this.base_path+'auth/logout',{}).pipe(map(response=>{
            this.authService.logout();
        }));
    }

    public refresh(){
        return this.http.post(this.base_path+'auth/refresh',{}).pipe(map(response=>{
            let token = response['access_token'];
            let type = response['token_type'];
            this.authService.login(type,token);
        }));
    }

    public me(){
        return this.http.post(this.base_path+'auth/me',{}).pipe(map(response=>{
            this.authService.setUsuario(response);
        }));
    }

    public recovery(email){
        return this.http.post(this.base_path+'auth/recovery',{
            email:email
        });
    }

    public password(password:string,n_password:string,c_password:string){
        return this.http.post(this.base_path+'auth/password',{
            password:password,
            n_password:n_password,
            c_password:c_password,
        });
    }
}