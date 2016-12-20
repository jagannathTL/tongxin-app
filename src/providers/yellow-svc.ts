import { Injectable, NgZone } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Global } from './global';
import { SecureStorage } from 'ionic-native';
import { Platform } from 'ionic-angular';
import * as Promise from 'promise';
import 'rxjs/add/operator/map';

/*
  Generated class for the YellowSvc provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class YellowSvc {

  constructor(public zone: NgZone, public http: Http, public global: Global,public platform: Platform) {
    console.log('Hello YellowSvc Provider');
  }


  getYellowList(id)
  {
    return new Promise((resolve, reject) => {
      this.http.get(this.global.SERVER + "/Handlers/UserInfoHandler.ashx?method=getPublish&id=" + id).map(res => res.json()).subscribe((data: any) => {
          resolve(data);
      },err => {
        throw new Error(err);
      })
    })
  }

  getYellowDetail()
  {
    return new Promise((resolve, reject) => {
      this.http.get(this.global.SERVER + "/Handlers/").map(res => res.json()).subscribe((data: any) => {
        resolve(data);
      }, err =>
        {
          throw new Error(err);
        })
    })
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
