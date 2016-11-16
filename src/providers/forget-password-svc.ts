import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as Promise from 'promise';
import { Global } from './global';
import { Errors } from './errors';

/*
  Generated class for the ForgetPasswordSvc provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ForgetPasswordSvc {

  constructor(public http: Http, public global: Global, public err: Errors) {
    console.log('Hello ForgetPasswordSvc Provider');
  }

  sendPassword(mobile: string) {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({
        method: 'send',
        mobile: mobile
      });
      // this.http.post(this.global.SERVER + '/Handlers/CustomerHandler.ashx', data)
      this.http.post('http://172.20.70.209:3838/Handlers/CustomerHandler.ashx', data)
        .map(res => res.json()).subscribe(data => {
          resolve(data);
        }, error => {
          throw new Error(error);
        });
    });
  }

}
