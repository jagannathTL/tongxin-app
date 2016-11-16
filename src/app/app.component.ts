import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar, Splashscreen, SecureStorage } from 'ionic-native';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { Push } from 'ionic-native';
import { Global } from '../providers/global';
import { LoginSvc } from '../providers/login-svc';

@Component({
  template: `<ion-nav #myNav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  @ViewChild('myNav') nav: NavController
  rootPage: any;

  constructor(platform: Platform, public global: Global, public loginSvc: LoginSvc) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
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
          error => console.log(error)
          );

        secureStorage.get('mobile')
          .then(
          data => {
            let mobile = data;
            secureStorage.get('password')
              .then(
              data => {
                let password = data;
                //自动登录，如果成功setroot到tabs页面
                this.loginSvc.login(mobile, password).then(data => {
                  if (data.result == 'ok') {
                    this.nav.setRoot(TabsPage);
                  }
                }).catch(error => {
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
