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

  jsonToURLEncoded(jsonString){
    return Object.keys(jsonString).map(function(key){
      return encodeURIComponent(key) + '=' + encodeURIComponent(jsonString[key]);
    }).join('&');
  }

  sendPassword(mobile: string) {
    return new Promise((resolve, reject) => {
      let body = this.jsonToURLEncoded({ method: 'send', mobile: mobile });
      let headers = new Headers({
  			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  		});
  		let options = new RequestOptions({
  			headers: headers
  		});
      this.http.post(this.global.SERVER + '/Handlers/CustomerHandler.ashx',body,options).map(res => res.json()).subscribe(data => {
        resolve(data);
      }, error => {
        throw new Error(error);
      });
    });
  }

}
