import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as Promise from 'promise';
import { Global } from '../providers/global';
import { Errors } from '../providers/errors';
import moment from 'moment';
/*
  Generated class for the InboxSvc provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class InboxSvc {

  lastDate="";
  constructor(public http: Http, public global: Global, public errors: Errors) {
    console.log('Hello InboxSvc Provider');
  }

  loadItems(mobile) {
    return new Promise((resolve, reject) => {
      this.http.get(this.global.SERVER + '/handlers/InboxMsgHandler.ashx?method=getInboxMsg&mobile=' + mobile).map(res => res.json()).subscribe(data => {
        resolve(data);
      }, error => {
        console.log(error);
        throw new Error(error);
      });
    });
  }

  loadMoreItems(mobile, date) {
    return new Promise((resolve, reject) => {
      this.http.get(this.global.SERVER + '/handlers/InboxMsgHandler.ashx?method=getMsgByAction&actionStr=pullUp&mobile=' + mobile + '&dateStr=' + date).map(res => res.json()).subscribe(data => {
        resolve(data);
      }, error => {
        console.log(error);
        throw new Error(error);
      });
    });
  }

  loadNewItems(mobile){
    let date = moment().format('YYYY-MM-DD HH:mm:ss SSS');
    return new Promise((resolve, reject) => {
      this.http.get(this.global.SERVER + '/handlers/InboxMsgHandler.ashx?method=getMsgByAction&actionStr=pullDown&mobile=' + mobile + '&dateStr=' + date).map(res => res.json()).subscribe(data => {
        resolve(data);
      }, error => {
        console.log(error);
        throw new Error(error);
      });
    });
  }

}
