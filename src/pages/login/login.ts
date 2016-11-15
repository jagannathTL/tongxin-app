import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { LoginSvc } from '../../providers/login-svc';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';
import { Errors } from '../../providers/errors';
declare var alertify: any;

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
  constructor(public navCtrl: NavController, public loginSvc: LoginSvc, public loadingCtrl: LoadingController, public err: Errors) {

  }

  login() {
    if (this.mobile == '') {
      alertify.error(this.err.MOBILE_EMPTY);
      return false;
    }
    if (this.password == '') {
      alertify.error(this.err.PASSWORD_EMPTY);
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
        alertify.error(this.err.LOGIN_FAILED);
      }
      console.log(data.result);
      //ok error
    }).catch(err => alertify.error(err)).finally(() => loader.dismiss());
  }

  registerUser() {
    this.navCtrl.push(RegisterPage);
  }
}
