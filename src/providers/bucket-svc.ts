import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import * as Promise from 'promise';
import { Global } from '../providers/global';

/*
  Generated class for the BucketSvc provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class BucketSvc {

  constructor(public http: Http, public global:Global) {
    console.log('Hello BucketSvc Provider');
  }

  jsonToURLEncoded(jsonString){
    return Object.keys(jsonString).map(function(key){
      return encodeURIComponent(key) + '=' + encodeURIComponent(jsonString[key]);
    }).join('&');
  }

  updateBuckets(ids, mobile)
  {
    return new Promise((resolve, reject) => {
      let body = this.jsonToURLEncoded({ method: 'groupChannel', mobile: mobile, groups: ids });
      let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      });
      let options = new RequestOptions({
        headers: headers
      });
      this.http.post(this.global.SERVER + '/Handlers/XHMarketHandler.ashx', body, options).subscribe((data) => {
          resolve(data);
      },err => {
        throw new Error(err);
      });
    });
  }
}
