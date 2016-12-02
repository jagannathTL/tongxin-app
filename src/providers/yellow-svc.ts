import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Global } from './global';
import * as Promise from 'promise';
import 'rxjs/add/operator/map';

/*
  Generated class for the YellowSvc provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class YellowSvc {

  constructor(public http: Http, public global: Global) {
    console.log('Hello YellowSvc Provider');
  }


  getYellowList(id)
  {
    return new Promise((resolve, reject) => {
      this.http.get(this.global.SERVER + "/Handlers/UserInfoHandler.ashx?method=getPublish&id=" + id).map(res => res.json()).subscribe((data: any) => {
          resolve(data);
      },err => {
        throw new Error(err);
      })
    })
  }

  getYellowDetail()
  {
    return new Promise((resolve, reject) => {
      this.http.get(this.global.SERVER + "/Handlers/").map(res => res.json()).subscribe((data: any) => {
        resolve(data);
      }, err =>
        {
          throw new Error(err);
        })
    })
  }
}
