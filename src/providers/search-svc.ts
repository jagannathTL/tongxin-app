import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import * as Promise from 'promise';
import { Global } from '../providers/global';

/*
  Generated class for the SearchSvc provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SearchSvc {

  constructor(public http: Http, public global: Global) {
    console.log('Hello SearchSvc Provider');
  }

  getSearchResult(mobile, searchKey){
    return new Promise((resolve, reject) => {
      this.http.get(this.global.SERVER + "/Handlers/SearchHandler.ashx?method=getSearchResult&mobile=" + mobile + "&searchKey=" + searchKey).map(res => res.json())
      .subscribe(data => {
          resolve(data);
      },err => {
        throw new Error(err);
      })
    })
  }

  getPLSearchData(mobile, searchKey){
    return new Promise((resolve, reject) => {
      let body = this.jsonToURLEncoded({ method: 'search', mobile: mobile, key: searchKey });
      let headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      });
      let options = new RequestOptions({
        headers: headers
      });
      this.http.post(this.global.SERVER + "/Handlers/PLHandler.ashx", body, options).map(res => res.json())
      .subscribe((data) => {
        resolve(data);
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

}
