import { Component } from '@angular/core';
import { NavController, LoadingController, Platform, Events } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';
import { ForgetPasswordPage } from '../forget-password/forget-password';
import { Errors } from '../../providers/errors';
import { Global } from '../../providers/global';
declare var notie: any;
import validator from 'validator';
import { SecureStorage, Splashscreen } from 'ionic-native';
import { Http, URLSearchParams } from '@angular/http';

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
  isShowLoading = false;
  mobile = '';
  password = '';
  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController, public err: Errors, public global: Global,
    public platform: Platform, public http: Http, public events: Events) {
    platform.ready().then(() => {
      Splashscreen.hide();
    });
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
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
    });
  }

  gotoHome(){
    this.navCtrl.setRoot(TabsPage);
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
    let deviceId = this.global.DEVICE_ID;
    if (deviceId == '') {
      throw new Error(this.err.NO_DEVICE_ID);
    }
    let phoneType = '1';//ios=0;android=1;
    if (this.platform.is('ios')) {
      phoneType = '0';
    }
    else {
      phoneType = '1';
    }
    let params: URLSearchParams = new URLSearchParams();
    params.set('method', 'signin');
    params.set('mobile', this.mobile);
    params.set('password', this.password);
    params.set('token', deviceId);
    params.set('phoneType', phoneType);
    this.isShowLoading = true;
    this.http.get(this.global.SERVER + '/Handlers/LoginHandler.ashx', {
      search: params
    }).map(res => res.json()).subscribe(data => {
      if (data.result == 'ok') {
        let secureStorage: SecureStorage = new SecureStorage();
        secureStorage.create('tongxin')
          .then(
          () => {
            secureStorage.set('mobile', this.mobile)
              .then(
              data => { },
              error => console.log(error)
              );

            secureStorage.set('password', this.password)
              .then(
              data => { },
              error => console.log(error)
              );
          },
          error => {
            console.log(error);
            notie.alert('error', this.err.LOGIN_FAILED, this.global.NOTIFICATION_DURATION);
          });
        this.global.MOBILE = this.mobile;
        this.global.IS_LOGGEDIN = true;
        this.navCtrl.setRoot(TabsPage);
        this.isShowLoading = false;
        //this.events.publish('inboxPage:loadItems');
      }
      else {
        this.isShowLoading = false;
        notie.alert('error', this.err.LOGIN_FAILED, this.global.NOTIFICATION_DURATION);
      }

      // this.loginSvc.login(this.mobile, this.password).then(data => {
      //   if (data.result == 'ok') {
      //     let secureStorage: SecureStorage = new SecureStorage();
      //     secureStorage.create('tongxin')
      //       .then(
      //       () => {
      //         secureStorage.set('mobile', this.mobile)
      //           .then(
      //           data => console.log(data),
      //           error => console.log(error)
      //           );
      //
      //         secureStorage.set('password', this.password)
      //           .then(
      //           data => console.log(data),
      //           error => console.log(error)
      //           );
      //       },
      //       error => console.log(error)
      //       );
      //     this.global.MOBILE = this.mobile;
      //     this.navCtrl.setRoot(TabsPage);
      //   }
      //   else {
      //     notie.alert('error', this.err.LOGIN_FAILED, this.global.NOTIFICATION_DURATION);
      //   }
      // }).catch(err => notie.alert('error', err, this.global.NOTIFICATION_DURATION)).finally(() => loader.dismiss());
    })
  }

  registerUser() {
    this.navCtrl.push(RegisterPage);
  }

  forgetPassword() {
    this.navCtrl.push(ForgetPasswordPage);
  }
}
