import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as Promise from 'promise';
import { Global } from '../providers/global';
import * as _ from 'lodash';

/*
  Generated class for the PriceSvc provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PriceSvc {

  constructor(public http: Http, public global: Global) {

  }

  getPriceHistory(productId, start, end) {
    return new Promise((resolve, reject) => {
      this.http.get(this.global.SERVER + "/Handlers/PriceHandler.ashx?method=getHistoryPrices&productId=" + productId + '&start=' + start + '&end=' + end).map(res => res.json()).subscribe(data => {
        data = _.forEach(data, x => {
          x.Change = parseFloat(x.Change);
          if (x.Change > 0) {
            x.absChange = '涨' + Math.abs(x.Change);
          } else if (x.Change < 0) {
            x.absChange = '跌' + Math.abs(x.Change);
          } else {
            x.absChange = '平';
          }
          if (x.LPrice == null || x.LPrice == '0') {
            x.priceString = '停收';
          } else if (x.HPrice == null || x.HPrice == '0') {
            x.priceString = x.LPrice;
          } else {
            x.priceString = x.LPrice + '-' + x.HPrice;
          }
        });
        resolve(data);
      }, err => {
        console.log(err);
        throw new Error(err);
      });
    });
  }

  getPriceDetail(mobile, marketId, groupId) {
    return new Promise((resolve, reject) => {
      this.http.get(this.global.SERVER + "/Handlers/PriceHandler.ashx?method=getPrices&mobile=" + mobile + '&marketId=' + marketId + '&groupId=' + groupId).map(res => res.json()).subscribe(data => {
        //对data按照parentname分组
        data = _.forEach(data, x => {
          x.Change = parseFloat(x.Change);
          if (x.Change > 0) {
            x.absChange = '涨' + Math.abs(x.Change);
          } else if (x.Change < 0) {
            x.absChange = '跌' + Math.abs(x.Change);
          } else {
            x.absChange = '平';
          }
          if (x.LPrice == null || x.LPrice == '0') {
            x.priceString = '停收';
          } else if (x.HPrice == null || x.HPrice == '0') {
            x.priceString = x.LPrice;
          } else {
            x.priceString = x.LPrice + '-' + x.HPrice;
          }
        });
        let result = _.groupBy(data, x => {
          return x.ParentName;
        })
        resolve(_.toArray(result));
      }, error => {
        console.log(error);
        throw new Error(error);
      });
    });
  }


  getMarkets(mobile, sData, inBuckets, outBuckets) {
    return new Promise((resolve, reject) => {
      this.http.get(this.global.SERVER + "/Handlers/XHMarketHandler.ashx?method=getmarkets&mobile=" + mobile).map(res => res.json()).subscribe(data => {
        var index = 0;
        data.forEach((r: any) => {
          if (r.inBucket == "true") {
            var markets = [];
            inBuckets.push({ id: r.id, name: r.name });//已关注
            if (r.markets != null) {
              r.markets.forEach((m: any) => {
                markets.push({ name: r.name, marketId: m.id, marketName: m.name });
              });
            }
            sData.push({ name: r.name, index: index, markets: markets });
            // inBuckets.push({id: r.id, name: r.name, index: index, markets: markets});//已关注
            index = index + 1;
          }
          else {
            // var markets = [];
            outBuckets.push({ id: r.id, name: r.name });//未关注
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
      }, err => {
        throw new Error(err);
      })
    });
  }
}
