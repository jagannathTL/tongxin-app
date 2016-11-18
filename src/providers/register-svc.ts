import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as Promise from 'promise';
import { Global } from '../providers/global';

/*
  Generated class for the RegisterSvc provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RegisterSvc {

  constructor(public http: Http, public global: Global) {
    console.log('Hello RegisterSvc Provider');
  }

  registerUser(mobile) {
    return new Promise((resolve, reject) => {
      this.http.get(this.global.SERVER + "/Handlers/CustomerHandler.ashx?method=trial&mobile=" + mobile).map(res => res.json())
        .subscribe((data) => {
          resolve(data);
        }, err => {
          throw new Error(err);
        });
    });
  }
}
