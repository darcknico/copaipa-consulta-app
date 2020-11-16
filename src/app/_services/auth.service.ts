import { Platform, NavController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DepositoService } from '../providers/deposito.service';
import { Usuario } from '../_models/afiliado';

const TOKEN_KEY = "X-Auth-Token";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    authState$: BehaviorSubject<boolean> = new BehaviorSubject(null);
    token$: BehaviorSubject<string> = new BehaviorSubject(null);
    user$: BehaviorSubject<Usuario> = new BehaviorSubject(null);
    usuario:Usuario;
    public static TOKEN_KEY = "X-Auth-Token";
    constructor(
        private navController:NavController,
        private deposito: DepositoService,
        private platform: Platform,
    ) { 
        this.platform.ready().then( res => {
            this.checkToken();
        });
    }

    public checkToken() {
        this.deposito.getItem(TOKEN_KEY).then( res => {
            if (res) {
                this.authState$.next(true);
                this.token$.next(res);
            }
        },error=>{
            this.authState$.next(false);
        })
    }

    public login(type:string,token:string,recovery:boolean = false) {
        this.token$.next(type+" "+token);
        return this.deposito.setItem(TOKEN_KEY,type+" "+token).then( res => {
            this.authState$.next(true);
            if(recovery){
                this.navController.navigateRoot('pages/password');
            } else {
                this.navController.navigateRoot('home');
            }
        });
    }

    public logout() {
        Promise.all([
            this.deposito.remove('usuario'),
            this.deposito.remove('afiliado'),
        ]).then( () =>{
            this.user$.next(null);
        });
        this.deposito.remove(TOKEN_KEY).then( () => {
            this.authState$.next(false);
            this.token$.next(null);
            this.navController.navigateRoot('external/login');
        });
        
    }
  
    public getAuthStateObserver(): Observable<boolean> {

        return this.authState$.asObservable();
    }

    public isAuthenticated() {
        return this.authState$.value;
    }

    //inicio
    public isAuthenticatedPromise(){
        return this.platform.ready().then(()=>{
            return this.deposito.getItem(TOKEN_KEY).then(res=>{
                if(res){
                    return true;
                }
                    return false;
                },error =>{
                    return false;
                });
        });
    }

    public getTokenStateObserver():Observable<string>{
        return this.token$;
    }

    public getToken(){
        return this.token$.value;
    }

    public setUsuario(user:Usuario){
        this.user$.next(user);
        this.usuario = user;
        this.deposito.setItem('usuario',user).then(res=>{

        });
        /*
        if(user.afiliado){
            this.deposito.setItem('afiliado',user.afiliado).then(res=>{

            });
        }
        */
    }

    public getUsuario(){
        return this.deposito.getItem('usuario');
    }
}