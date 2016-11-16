import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
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
      let params: URLSearchParams = new URLSearchParams();
      params.set('method', 'send');
      params.set('mobile', mobile);

      this.http.get(this.global.SERVER + '/Handlers/CustomerHandler.ashx', {
        search: params
      }).map(res => res.json()).subscribe(data => {
        resolve(data);
      }, error => {
        throw new Error(error);
      });
    });
  }

}
