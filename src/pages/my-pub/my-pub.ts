import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Global } from '../../providers/global';
import { Errors } from '../../providers/errors';
import { TradeSvc } from '../../providers/trade-svc';
import { TradeViewPage } from '../trade-view/trade-view';
declare var notie: any;
import * as Promise from 'promise';
import * as _ from 'lodash';


/*
  Generated class for the MyPub page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-pub',
  templateUrl: 'my-pub.html'
})
export class MyPubPage {

  type: any = "gy";
  allList: any = [];
  items: any = [];
  titleStr: any = "供应";

  constructor(public navCtrl: NavController, public global: Global, public errors: Errors, public tradeSvc: TradeSvc, public loading: LoadingController) {
      this.getDatas();
  }

  ionViewDidLoad() {
    console.log('Hello MyPubPage Page');
  }

  ionChange(){
    if(this.type == "gy"){
      this.items = this.allList.filter((item) => {
        return item.documentType == 0;
      })
      this.titleStr = "供应";
    }else if(this.type == "cg"){
      this.items = this.allList.filter((item) => {
        return item.documentType == 1;
      })
      this.titleStr = "采购";
    }else if(this.type == "jx"){
      this.items = this.allList.filter((item) => {
        return item.documentType == 2;
      })
      this.titleStr = "供应";
    }
  }

  getDatas(){
    let loading = this.loading.create({});
    loading.present();
    this.tradeSvc.getMySupplys(this.global.MOBILE).then((data: any) => {
      if(data != null && data != undefined && data.length > 0){
        data.forEach((trade) => {
          debugger
          var firstImg = '';
          var isChecked = '未审核';
          if(trade.pic1 != null && trade.pic1 != undefined && trade.pic1.length > 0)
          {
            firstImg = this.global.SERVER + '/upload/' + trade.pic1[0];
          }
          if(trade.ischecked){
            isChecked = "已审核";
          }

          this.allList.push({documentType: trade.type, price:trade.price,quantity:trade.quantity,business: trade.buissnes, product: trade.name, province: trade.province, city: trade.city, contact: trade.contact, date: trade.date, pics: trade.pic, firstImg: firstImg, isChecked: isChecked});
        })
        if(this.type == "gy"){
          this.items = this.allList.filter((item) => {
            return item.documentType == 0;
          })
        }
      }
    }).catch(err => {
      notie.alert('error', this.errors.GET_DATA_FAILED, this.global.NOTIFICATION_DURATION);
    }).done(() => {
      loading.dismiss();
    })
  }

  gotoTradeDetail(trade){
    this.navCtrl.push(TradeViewPage,{
      trade: trade,
      title: '发布详情'
    })
  }

}
