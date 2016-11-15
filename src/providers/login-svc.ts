import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';
import * as Promise from 'promise';
import { Global } from './global';
import { Errors } from './errors';

/*
  Generated class for the LoginSvc provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LoginSvc {

  constructor(public http: Http, public global: Global,public platform: Platform, public err: Errors) {

  }

  login(mobile, password) {
    return new Promise((resolve, reject) => {
      let deviceId = this.global.DEVICE_ID;
      if(deviceId == '')
      {
          throw new Error(this.err.NO_DEVICE_ID);
      }
      let phoneType = '1';
      if (this.platform.is('ios')) {
        phoneType = '1';
      }
      else
      {
        phoneType = '2';
      }
      let params: URLSearchParams = new URLSearchParams();
      params.set('method','signin');
      params.set('mobile', mobile);
      params.set('password', password);
      params.set('token', deviceId);
      params.set('phoneType', phoneType);
      this.http.get(this.global.SERVER + '/Handlers/LoginHandler.ashx', {
        search: params
      }).map(res => res.json()).subscribe(data => {
        resolve(data);
      }, error => {
        throw new Error(error);
      });
    });
  }

}
