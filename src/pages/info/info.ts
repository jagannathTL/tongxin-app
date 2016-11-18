import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { SecureStorage } from 'ionic-native';
import { LoginPage } from '../login/login';
declare const notie: any;
import { Global } from '../../providers/global';
import { Errors } from '../../providers/errors';

/*
  Generated class for the Info page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-info',
  templateUrl: 'info.html'
})
export class InfoPage {
  mobile = this.global.MOBILE;
  isSound = true;
  constructor(public navCtrl: NavController, public errors: Errors, public global: Global, public app: App) { }

  logout() {
    let secureStorage: SecureStorage = new SecureStorage();
    secureStorage.create('tongxin')
      .then(
      () => {
        secureStorage.remove('password')
          .then(
          data => {
            this.app.getRootNav().setRoot(LoginPage);
          },
          error => {
            notie.alert('error', this.errors.LOGOUT_FAILED, this.global.NOTIFICATION_DURATION);
            console.log(error)
          }
          );
      },
      error => {
        notie.alert('error', this.errors.LOGOUT_FAILED, this.global.NOTIFICATION_DURATION);
        console.log(error)
      });
  }

}