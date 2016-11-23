import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, Events } from 'ionic-angular';
import { StatusBar, SecureStorage } from 'ionic-native';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { Push } from 'ionic-native';
import { Global } from '../providers/global';
import { Http, URLSearchParams } from '@angular/http';

@Component({
  template: `<ion-nav #myNav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  @ViewChild('myNav') nav: NavController
  rootPage: any = TabsPage;

  constructor(platform: Platform, public global: Global, public events: Events, public http: Http) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      let push = Push.init({
        android: {
          senderID: "021191"
        },
        ios: {
          alert: "true",
          badge: true,
          sound: 'true'
        },
        windows: {}
      });

      push.on('notification', (data) => {
        console.log(data.message);
        console.log(data.title);
        console.log(data.count);
        console.log(data.sound);
        console.log(data.image);
        console.log(data.additionalData);
      });

      push.on('error', (e) => {
        console.log(e.message);
      });

      push.on('registration', (data) => {
        //ios device id
        //console.log(data.registrationId);
        let deviceId = data.registrationId;
        this.global.DEVICE_ID = deviceId;
        //自动登陆，读取用户名和密码
        let secureStorage: SecureStorage = new SecureStorage();
        secureStorage.create('tongxin')
          .then(
          () => console.log('Storage is ready!'),
          error => {
            this.nav.setRoot(LoginPage);
          });

        secureStorage.get('mobile')
          .then(
          data => {
            let mobile = data;
            secureStorage.get('password')
              .then(
              data => {
                let password = data;
                //自动登录，如果成功setroot到tabs页面
                let deviceId = this.global.DEVICE_ID;
                let phoneType = '1';//ios=0;android=1;
                if (platform.is('ios')) {
                  phoneType = '0';
                }
                else {
                  phoneType = '1';
                }
                let params: URLSearchParams = new URLSearchParams();
                params.set('method', 'signin');
                params.set('mobile', mobile);
                params.set('password', password);
                params.set('token', deviceId);
                params.set('phoneType', phoneType);
                this.http.get(this.global.SERVER + '/Handlers/LoginHandler.ashx', {
                  search: params
                }).map(res => res.json()).subscribe(data => {
                  this.global.MOBILE = mobile;
                }, error => {
                  this.nav.setRoot(LoginPage);
                  console.log(error);
                });
              },
              error => {
                this.nav.setRoot(LoginPage);
                console.log(error);
              });
          },
          error => {
            this.nav.setRoot(LoginPage);
            console.log(error);
          });
      })
    });
  }
}
