import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { LoginSvc } from '../../providers/login-svc';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';
import { Errors } from '../../providers/errors';
import { Global } from '../../providers/global';
declare var notie: any;

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
  constructor(public navCtrl: NavController, public loginSvc: LoginSvc, public loadingCtrl: LoadingController, public err: Errors, public global: Global) {

  }

  login() {
    if (this.mobile == '') {
      notie.alert('error',this.err.MOBILE_EMPTY,this.global.NOTIFICATION_DURATION);
      return false;
    }
    if (this.password == '') {
      notie.alert('error',this.err.PASSWORD_EMPTY,this.global.NOTIFICATION_DURATION);
      return false;
    }
    let loader = this.loadingCtrl.create({});
    loader.present();
    this.loginSvc.login(this.mobile, this.password).then(data => {
      if (data.result == 'ok') {
        console.log('登录成功');
        this.navCtrl.setRoot(TabsPage);
      }
      else {
        notie.alert('error',this.err.LOGIN_FAILED,this.global.NOTIFICATION_DURATION);
      }
      console.log(data.result);
      //ok error
    }).catch(err => notie.alert('error',err,this.global.NOTIFICATION_DURATION)).finally(() => loader.dismiss());
  }

  registerUser() {
    this.navCtrl.push(RegisterPage);
  }
}
