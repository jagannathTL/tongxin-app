import { Component } from '@angular/core';
import { NavController, App, Events } from 'ionic-angular';
import { SecureStorage } from 'ionic-native';
import { LoginPage } from '../login/login';
declare const notie: any;
import { Global } from '../../providers/global';
import { Errors } from '../../providers/errors';
import { ProfilePage } from '../profile/profile';
import { MyPubPage } from '../my-pub/my-pub';

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

  constructor(public navCtrl: NavController, public errors: Errors,
    public global: Global, public app: App, public events: Events) {
    if (this.global.IS_LOGGEDIN == false) {
      this.app.getRootNav().setRoot(LoginPage);
    }
  }

  gotoProfile() {
    this.navCtrl.push(ProfilePage);
  }

  gotoMyPub() {
    this.navCtrl.push(MyPubPage);
  }

  logout() {
    let secureStorage: SecureStorage = new SecureStorage();
    secureStorage.create('tongxin')
      .then(
      () => {
        //退订tabs的事件
        this.events.unsubscribe('inboxPage:loadItems');

        secureStorage.remove('password')
          .then(
          data => {
            this.global.IS_LOGGEDIN = false;
            this.app.getRootNav().setRoot(LoginPage);
          },
          error => {
            notie.alert('error', this.errors.LOGOUT_FAILED, this.global.NOTIFICATION_DURATION);
            console.log(error)
          });
      },
      error => {
        notie.alert('error', this.errors.LOGOUT_FAILED, this.global.NOTIFICATION_DURATION);
        console.log(error)
      });
  }

}
