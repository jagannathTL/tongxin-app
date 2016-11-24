import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, Events } from 'ionic-angular';
import { StatusBar, SecureStorage } from 'ionic-native';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { Push } from 'ionic-native';
import { Global } from '../providers/global';
import { Http, URLSearchParams } from '@angular/http';
declare var GeTuiSdkPlugin: any;
@Component({
  template: `<ion-nav #myNav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  @ViewChild('myNav') nav: NavController
  rootPage: any = TabsPage;

  constructor(public platform: Platform, public global: Global, public events: Events, public http: Http) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();

      if (this.platform.is('android')) {
        GeTuiSdkPlugin.callback_init((type, data) => {
          if (type == 'cid') {
            console.log('Cid: ' + data);
            this.global.DEVICE_ID = data;
            this.checkLogin();
          } else if (type == 'pid') {
            //TODO data = 进程pid

          } else if (type == 'payload') {
            //TODO data=透传数据
            this.setBadge(JSON.parse(data).badge);
            alert('payload: ' + data);
          } else if (type == 'online') {
            if (data == 'true') {
              //TODO 已上线
              console.log('SDK已在线');
            } else {
              //TODO 已离线
              console.log('SDK已离线');
            }
          }
        }); //设置个推SDK的回调初始化
        GeTuiSdkPlugin.initialize(); //SDK的初始化
        GeTuiSdkPlugin.turnOnPush(); //打开推送开关
      }
      else if (this.platform.is('ios')) {
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
          console.log('--------------');
          console.log(data);
          console.log(data.message);
          this.setBadge(data.count);
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
          this.checkLogin();
        })
      }
    });
  }

  checkLogin() {
    //自动登陆，读取用户名和密码
    console.log('checkLogin');
    let secureStorage: SecureStorage = new SecureStorage();
    secureStorage.create('tongxin')
      .then(
      () => {
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
                if (this.platform.is('ios')) {
                  phoneType = '0';
                }
                else if (this.platform.is('android')) {
                  phoneType = '1';
                }
                else {
                  phoneType = '-1';
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
                  if(data.result == "ok")
                  {
                    this.global.MOBILE = mobile;
                    this.events.publish('inboxPage:loadItems');
                  }
                  else
                  {
                    this.nav.setRoot(LoginPage);
                  }
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
      },
      error => {
        this.nav.setRoot(LoginPage);
      });
  }

  setBadge(count){
    this.events.publish('tabsPage:setBadge', count);
  }
}
