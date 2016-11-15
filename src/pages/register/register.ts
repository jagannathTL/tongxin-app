import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { Http }  from '@angular/http';
import * as _ from 'lodash';
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

  constructor(public navCtrl: NavController, public toast: ToastController, public loading: LoadingController, public http: Http) {
    this.registeredPhoneNo = "";
  }

  ionViewDidLoad() {
    console.log('Hello RegisterPage Page');
  }

  registUser(){
    var errMsg = "";
    if(this.registeredPhoneNo == "")
    {
        errMsg = "手机号码不能为空";
    }

    if(_.isEmpty(errMsg) == false){
        let toast = this.toast.create({
          message: errMsg,
          duration: 3000
        });
        toast.present();
    }
    else{
      let loading = this.loading.create({});
        loading.present();
        // this.http.post()
    }
  }

}
