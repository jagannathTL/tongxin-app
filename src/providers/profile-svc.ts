import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions  } from '@angular/http';
import 'rxjs/add/operator/map';
import * as X2JS from 'x2js';
import * as Promise from 'promise';
import * as _ from 'lodash';
import { Global } from './global';

/*
  Generated class for the ProfileSvc provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ProfileSvc {

  xmlPath = 'assets/areas.xml';

  constructor(public http: Http, public global: Global) {
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
        // console.log(jsonObj.provinces.province);
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

  jsonToURLEncoded(jsonString){
    return Object.keys(jsonString).map(function(key){
      return encodeURIComponent(key) + '=' + encodeURIComponent(jsonString[key]);
    }).join('&');
  }

  getUserInfo(mobile){
    return new Promise((resolve,reject) => {
      this.http.get(this.global.SERVER + "/Handlers/UserInfoHandler.ashx?method=getUserCompanyInfo&mobile=" + mobile).map(res => res.json())
      .subscribe(data => {
        resolve(data);
      },err => {
        console.log(err);
        throw new Error(err);
      })
    })
  }

  updateUserInfo(mobile,obj)
  {
    return new Promise((resolve, reject) => {
      debugger
      let body = this.jsonToURLEncoded({
        method: 'updateUserInfo',
        mobile:mobile,
        pics:obj.pics,
        companyName:obj.companyName,
        contact:obj.contact,
        tel:obj.tel,
        industry:obj.industry,
        product:obj.product,
        industryDesc:obj.industryDesc,
        provinceName:obj.provinceName,
        cityName:obj.cityName,
        addressDesc:obj.addressDesc,
        isOpenMsg:obj.isOpenMsg});
      let headers = new Headers({
  			'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  		});
  		let options = new RequestOptions({
  			headers: headers
  		});
      this.http.post(this.global.SERVER + "/Handlers/UserInfoHandler.ashx", body, options).map(res => res.json()).subscribe((data) => {
        resolve(data);
      },err => {
        console.log(err);
        throw new Error(err);
      })
    })
  }

}
