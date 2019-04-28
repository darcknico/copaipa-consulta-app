import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  isLoading = false;

  constructor(public alertController: AlertController) { }

  async present(header,subHeader,message,buttons) {
    this.isLoading = true;
    return await this.alertController.create({
        header: header,
        subHeader: subHeader,
        message: message,
        buttons: buttons
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.alertController.dismiss().then(() => console.log('dismissed'));
  }
}