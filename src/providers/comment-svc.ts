import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as Promise from 'promise';
import { Global } from '../providers/global';

/*
  Generated class for the CommentSvc provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CommentSvc {

  constructor(public http: Http, public global: Global) {

  }

  getCommentMarkets(mobile){
    return new Promise((resolve, reject) => {
      this.http.get(this.global.SERVER + "/Handlers/PLHandler.ashx?method=getmarkets&mobile=" + mobile).map(res => res.json())
      .subscribe((data) => {
        resolve(data);
      }, err => {
        console.log(err);
        throw new Error(err);
      })
    })
  }

  getCommentDetail(mobile, marketId){
    return new Promise((resolve, reject) => {
      this.http.get(this.global.SERVER + "/Handlers/PLHandler.ashx?method=getproducts&mobile=" + mobile + "&marketId=" + marketId).map(res => res.json())
      .subscribe((data) => {
        resolve(data);
      },err => {
        console.log(err);
        throw new Error(err);
      });
    })
  }

  subscribeOrCancel(id, isOrder, mobile)
  {
    return new Promise((resolve, reject) => {
      this.http.get(this.global.SERVER + "/Handlers/orderHandler.ashx?method=order&mobile=" + mobile + "&productId=" + id + "&isOrder=" + isOrder).map(res => res.json()).subscribe(data => {
        resolve(data);
      },err => {
        console.log(err);
        throw new Error(err);
      })
    })
  }
}
