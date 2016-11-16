import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as Promise from 'promise';
import { Global } from '../providers/global';
/*
  Generated class for the PriceSvc provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PriceSvc {

  constructor(public http: Http, public global:Global) {
    console.log('Hello PriceSvc Provider');
  }

  getMarkets(mobile)
  {
    return new Promise((resolve,reject) => {
      this.http.get(this.global.SERVER + "/Handlers/XHMarketHandler.ashx?method=getmarkets&mobile="+mobile).map(res => res.json()).subscribe(data => {
        resolve(data);
      },err => {

      })
    });
  }
}
