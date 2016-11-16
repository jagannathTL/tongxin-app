import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Errors } from '../../providers/errors';
import { Global } from '../../providers/global';
import { ForgetPasswordSvc } from '../../providers/forget-password-svc';
declare var notie: any;
import validator from 'validator';
import * as Clocky from 'clocky';

/*
  Generated class for the ForgetPassword page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-forget-password',
  templateUrl: 'forget-password.html'
})
export class ForgetPasswordPage {

  sendMobile= '';
  codeText = '确定';
  isSubmit = false;
  constructor(public navCtrl: NavController, public err: Errors, public global: Global, public forgetPasswordSvc: ForgetPasswordSvc) {}

  ionViewDidLoad() {

  }

  sendPassword(){
    if (validator.isEmpty(this.sendMobile.trim())) {
      notie.alert('error',this.err.MOBILE_EMPTY,this.global.NOTIFICATION_DURATION);
      return false;
    }
    if(!validator.isMobilePhone(this.sendMobile.trim(), 'zh-CN'))
    {
      notie.alert('error',this.err.MOBILE_ERROR,this.global.NOTIFICATION_DURATION);
      return false;
    }

    let clocky = new Clocky.Clocky();
    clocky.runFor(60);
    clocky.tickEvery(1);
    clocky.onTick((ticks, startedAt, elapsed) => {
      this.codeText = (60 - ticks) + '秒';
    });
    clocky.onStart((ticks, startedAt, elapsed) => {
      this.isSubmit = true;
    });
    clocky.onStop((ticks, startedAt, elapsed) => {
      this.isSubmit = false;
      this.codeText = '确定';
    });
    clocky.start();

    this.forgetPasswordSvc.sendPassword(this.sendMobile.trim()).then((data)=>{

    }).catch((err)=>{

    });
  }

}
