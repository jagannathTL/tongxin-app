import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { Http }  from '@angular/http';
import * as _ from 'lodash';
import { RegisterSvc } from '../../providers/register-svc';
import { Errors } from '../../providers/errors';
import { Global } from '../../providers/global';
declare var notie: any;
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

  registeredPhoneNo: any;

  constructor(public navCtrl: NavController, public toast: ToastController, public loading: LoadingController, public http: Http, public registerSvc: RegisterSvc, public err: Errors, public global: Global) {
    this.registeredPhoneNo = "";
  }

  ionViewDidLoad() {
    console.log('Hello RegisterPage Page');
  }

  registUser(){
    if(this.registeredPhoneNo == "")
    {
      notie.alert('error',this.err.MOBILE_EMPTY,this.global.NOTIFICATION_DURATION);
      return false;
    }
    else{
      let loading = this.loading.create({});
      loading.present();
      this.registerSvc.registerUser(this.registeredPhoneNo).then((data) => {
        //解析result
        var result = data.result;
        loading.dismiss().then(() => {
          if(result == "ok")
          {
            notie.alert('success', this.err.REGISTER_SUC,this.global.NOTIFICATION_DURATION);
          }
          else{
            notie.alert('error',result,this.global.NOTIFICATION_DURATION);
          }

        });
      });
    }
  }

}
