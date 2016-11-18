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

  getMarkets(mobile,sData,inBuckets,outBuckets)
  {
    return new Promise((resolve,reject) => {
      this.http.get(this.global.SERVER + "/Handlers/XHMarketHandler.ashx?method=getmarkets&mobile="+mobile).map(res => res.json()).subscribe(data => {
        var index = 0;
        data.forEach((r: any) => {
          if(r.inBucket == "true")
          {
            var markets = [];
            inBuckets.push({id: r.id, name: r.name});//已关注
            if(r.markets != null)
            {
              r.markets.forEach((m: any) => {
                markets.push({name: r.name, marketId: m.id, marketName: m.name});
              });
            }
            sData.push({name:r.name,index:index,markets:markets});
            // inBuckets.push({id: r.id, name: r.name, index: index, markets: markets});//已关注
            index = index + 1;
          }
          else{
            // var markets = [];
            outBuckets.push({id: r.id, name: r.name});//未关注
            // if(r.markets != null)
            // {
            //   r.markets.forEach((m: any) => {
            //     markets.push({name: r.name, marketId: m.id, marketName: m.name});
            //   });
            // }
            // outBuckets.push({id: r.id, name: r.name, markets: markets});//未关注
          }
        });
        resolve(data);
      },err => {
        throw new Error(err);
      })
    });
  }
}
