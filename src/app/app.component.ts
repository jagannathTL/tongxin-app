import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, Events } from 'ionic-angular';
import { StatusBar, SecureStorage, LocalNotifications, BackgroundMode, Badge} from 'ionic-native';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { Push } from 'ionic-native';
import { Global } from '../providers/global';
import { Errors } from '../providers/errors';
import { Http, URLSearchParams } from '@angular/http';
declare const GeTuiSdkPlugin: any;
declare const notie: any;

@Component({
  template: `<ion-nav #myNav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  @ViewChild('myNav') nav: NavController
  rootPage: any = TabsPage;

  msgHanlder(data) {
    if (this.global.IS_LOGGEDIN == true) {
      if (this.platform.is('android')) {
        data = JSON.parse(data);
        if (data.exit == '退出') {
          notie.alert('error', this.errors.LOGIN_ON_OTHER_MACHINE, this.global.NOTIFICATION_DURATION);
          this.global.IS_LOGGEDIN = false;
          this.nav.setRoot(LoginPage);
        } else {
          this.events.publish('tabsPage:setBadge', data.badge);
          let msg = data.msg;
          // if (data.badge > 1) {
          //   msg = "您有" + data.badge + "条消息未读!";
          // }
          LocalNotifications.schedule({
            title: '同鑫资讯',
            text: msg,
            icon: 'assets/logo.png',
            smallIcon: 'assets/logo.png',
            sound: 'file://assets/jingle-bells-sms.mp3',
          });
        }
      } else if (this.platform.is('ios')) {
        if (data.additionalData.shyr == '1') {
          this.nav.setRoot(LoginPage);
          notie.alert('error', this.errors.LOGIN_ON_OTHER_MACHINE, this.global.NOTIFICATION_DURATION);
        } else {
          console.log(data);
          this.events.publish('tabsPage:setBadge', data.count);
        }
      }
    }
  }

  constructor(public platform: Platform, public global: Global,
    public events: Events, public http: Http, public errors: Errors) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();

      BackgroundMode.enable();

      BackgroundMode.ondeactivate().subscribe(data => {
        Badge.get().then(data => {
          this.events.publish('tabsPage:setBadge', data);
        }).catch(error => {
          console.log(error);
        })
      }, error => {
        console.log(error);
      });

      if (this.platform.is('android')) {
        GeTuiSdkPlugin.callback_init((type, data) => {
          if (type == 'cid') {
            console.log(data);
            if (this.global.DEVICE_ID == "") {
              this.global.DEVICE_ID = data;
              this.checkLogin();
            }
          } else if (type == 'pid') {
            //TODO data = 进程pid

          } else if (type == 'payload') {
            //TODO data=透传数据
            this.msgHanlder(data);
          } else if (type == 'online') {
            if (data == 'true') {
              //TODO 已上线
              //console.log('SDK已在线');
            } else {
              //TODO 已离线
              //console.log('SDK已离线');
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

        push.on('notification', (data: any) => {
          this.msgHanlder(data);
        });

        push.on('error', (e) => {
          console.log(e.message);
        });

        push.on('registration', (data) => {
          //ios device id
          //console.log(data.registrationId);
          this.global.DEVICE_ID = data.registrationId;
          this.checkLogin();
        })
      }
    });
  }

  checkLogin() {
    //自动登陆，读取用户名和密码
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
                  if (data.result == "ok") {
                    this.global.MOBILE = mobile;
                    this.global.IS_LOGGEDIN = true;
                  }
                }, error => {
                  console.log(error);
                });
              },
              error => {
                console.log(error);
              });
          },
          error => {
            console.log(error);
          });
      },
      error => {
        console.log(error);
      });
  }
}
