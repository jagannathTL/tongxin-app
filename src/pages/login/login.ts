import { Component } from '@angular/core';
import { NavController, LoadingController, Platform, App } from 'ionic-angular';
import { LoginSvc } from '../../providers/login-svc';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';
import { ForgetPasswordPage } from '../forget-password/forget-password';
import { Errors } from '../../providers/errors';
import { Global } from '../../providers/global';
declare var notie: any;
import validator from 'validator';
import { SecureStorage } from 'ionic-native';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  mobile = '';
  password = '';
  constructor(public navCtrl: NavController, public loginSvc: LoginSvc,
    public loadingCtrl: LoadingController, public err: Errors, public global: Global,
    public platform: Platform, public app: App) {
    let secureStorage: SecureStorage = new SecureStorage();
    secureStorage.create('tongxin')
      .then(
      () => {
        secureStorage.get('mobile')
          .then(
          data => {
            this.mobile = data;
          },
          error => console.log(error)
          );
      },
      error => console.log(error)
      );
  }

  login() {
    if (validator.isEmpty(this.mobile.trim())) {
      notie.alert('error', this.err.MOBILE_EMPTY, this.global.NOTIFICATION_DURATION);
      return false;
    }
    if (!validator.isMobilePhone(this.mobile.trim(), 'zh-CN')) {
      notie.alert('error', this.err.MOBILE_ERROR, this.global.NOTIFICATION_DURATION);
      return false;
    }
    if (validator.isEmpty(this.password.trim())) {
      notie.alert('error', this.err.PASSWORD_EMPTY, this.global.NOTIFICATION_DURATION);
      return false;
    }
    let loader = this.loadingCtrl.create({});
    loader.present();
    this.loginSvc.login(this.mobile, this.password).then(data => {
      if (data.result == 'ok') {
        let secureStorage: SecureStorage = new SecureStorage();
        secureStorage.create('tongxin')
          .then(
          () => {
            secureStorage.set('mobile', this.mobile)
              .then(
              data => console.log(data),
              error => console.log(error)
              );

            secureStorage.set('password', this.password)
              .then(
              data => console.log(data),
              error => console.log(error)
              );
          },
          error => console.log(error)
          );
        this.global.MOBILE = this.mobile;
        this.app.getRootNav().setRoot(TabsPage);
      }
      else {
        notie.alert('error', this.err.LOGIN_FAILED, this.global.NOTIFICATION_DURATION);
      }
    }).catch(err => notie.alert('error', err, this.global.NOTIFICATION_DURATION)).finally(() => loader.dismiss());
  }

  registerUser() {
    this.navCtrl.push(RegisterPage);
  }

  forgetPassword() {
    this.navCtrl.push(ForgetPasswordPage);
  }
}
