import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as Promise from 'promise';
import { Global } from './global';


/*
  Generated class for the PinglunSvc provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PinglunSvc {

  constructor(public http: Http, public global: Global) {
    console.log('Hello PinglunSvc Provider');
  }

  getPinglunList(marketId){
    return new Promise((resolve, reject) => {
      this.http.get(this.global.SERVER + "/Handlers/PLHandler.ashx?method=getproducts&marketId=" + marketId + "&mobile=" + this.global.MOBILE).map(res => res.json()).subscribe((data: any) => {
        resolve(data)
      },err => {
        throw new Error(err);
      })
    })
  }

}
