import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions  } from '@angular/http';
import 'rxjs/add/operator/map';
import * as Promise from 'promise';
import { Global } from './global';

/*
  Generated class for the TradeSvc provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TradeSvc {

  constructor(public http: Http, public global: Global) {
    console.log('Hello TradeSvc Provider');
  }

  getTradeList(tradeID,documentType,searchKey,area,business,action){
    return new Promise((resolve, reject) => {
      this.http.get(this.global.SERVER + "/Handlers/SupplyHandler.ashx?method=getTradeList&id=" + tradeID + "&documentType=" + documentType + "&searchKey=" + searchKey + "&area=" + area + "&business=" + business + "&action=" + action).map(res => res.json()).subscribe((data: any) => {
        resolve(data)
      },err => {
        throw new Error(err);
      })
    })
  }

  jsonToURLEncoded(jsonString){
    return Object.keys(jsonString).map(function(key){
      return encodeURIComponent(key) + '=' + encodeURIComponent(jsonString[key]);
    }).join('&');
  }

  addTrade(obj){
    return new Promise((resolve, reject) => {
      let body = this.jsonToURLEncoded({
        method: 'addTrade',
        mobile: this.global.MOBILE,
        imgs: obj.imgNameStr,
        buissnes: obj.industry,
        product: obj.product,
        quantity: obj.quantity,
        price: obj.price,
        tel: obj.mobile,
        contact: obj.contact,
        province: obj.provinceName,
        city: obj.cityName,
        description: obj.description,
        documentType: obj.documentType
      });
      let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      });
      let options = new RequestOptions({
        headers: headers
      });
      this.http.post(this.global.SERVER + "/Handlers/SupplyHandler.ashx", body, options).map(res => res.json()).subscribe((data: any) => {
        resolve(data);
      },err => {
        throw new Error(err);
      })
    })
  }

}
