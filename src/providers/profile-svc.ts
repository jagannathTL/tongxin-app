import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as X2JS from 'x2js';
import * as Promise from 'promise';
import * as _ from 'lodash';

/*
  Generated class for the ProfileSvc provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ProfileSvc {

  xmlPath = 'assets/areas.xml';

  constructor(public http: Http) {
    console.log('Hello ProfileSvc Provider');
  }

  getProvinceList() {
    return new Promise((resolve, reject) => {
      this.http.get(this.xmlPath).subscribe((data: any) => {
        var x2js = new X2JS();
        var jsonObj = x2js.xml2js(data._body);
        let list = [];
        _.each(jsonObj.provinces.province, x => {
          list.push(x._name);
        })
        resolve(list);
      }, error => {
        console.log(error);
        throw new Error(error);
      })
    });
  }

  getCityByProvince(province) {
    return new Promise((resolve, reject) => {
      this.http.get(this.xmlPath).subscribe((data: any) => {
        var x2js = new X2JS();
        var jsonObj = x2js.xml2js(data._body);
        console.log(jsonObj.provinces.province);
        let list = _.find(jsonObj.provinces.province, o => {
          return o._name == province;
        })
        resolve(list.city);
      }, error => {
        console.log(error);
        throw new Error(error);
      })
    });
  }

}
