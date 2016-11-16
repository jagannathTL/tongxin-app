import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { RegisterSvc } from '../../providers/register-svc';
import { Errors } from '../../providers/errors';
import { Global } from '../../providers/global';
declare var notie: any;
import validator from 'validator';
/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  registeredPhoneNo = '';

  constructor(public navCtrl: NavController, public loading: LoadingController, public registerSvc: RegisterSvc, public err: Errors, public global: Global) {

  }

  registUser() {
    if (validator.isEmpty(this.registeredPhoneNo.trim())) {
      notie.alert('error', this.err.MOBILE_EMPTY, this.global.NOTIFICATION_DURATION);
      return false;
    }
    if (!validator.isMobilePhone(this.registeredPhoneNo.trim(), 'zh-CN')) {
      notie.alert('error', this.err.MOBILE_ERROR, this.global.NOTIFICATION_DURATION);
      return false;
    }
    let loading = this.loading.create({});
    loading.present();
    this.registerSvc.registerUser(this.registeredPhoneNo).then((data) => {
      //解析result
      var result = data.result;
      loading.dismiss().then(() => {
        if (result == "ok") {
          notie.alert('success', this.err.REGISTER_SUC, this.global.NOTIFICATION_DURATION);
        }
        else {
          notie.alert('error', result, this.global.NOTIFICATION_DURATION);
        }
      });
    });
  }
}
