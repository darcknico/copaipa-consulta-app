import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DepositoService {
  
  constructor(
    private storage: Storage, 
    private platform: Platform, 
    private nativeStorage: NativeStorage) {
  }

  public setItem(key,obj):Promise<any>{
    if(this.platform.is('cordova')){
        return this.nativeStorage.setItem(key,obj)
    } else {
        return this.storage.set(key,obj);
    }
  }

  public getItem(key):Promise<any>{
    if(this.platform.is('cordova')){
        return this.nativeStorage.getItem(key)
    } else {
        return this.storage.get(key);
    }
  }

  public remove(key):Promise<any>{
    if(this.platform.is('cordova')){
        return this.nativeStorage.remove(key)
    } else {
        return this.storage.remove(key);
    }
  }
}