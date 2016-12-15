import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Global } from '../../providers/global';
declare const Swiper: any;
/*
  Generated class for the TradeView page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-trade-view',
  templateUrl: 'trade-view.html'
})
export class TradeViewPage {

  trade: any = {business: "", product: "", province: "", city: "", contact: "",quantity:"",price:"",tel:"",desc:""}
  allImgs: any = [];
  title: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public zone: NgZone, public global: Global) {
    this.getData();
  }

  ionViewDidLoad() {
    console.log('Hello TradeViewPage Page');
  }

  getData(){
    this.zone.run(() => {
      var data = this.navParams.data.trade;
      this.title = this.navParams.data.title + "详情";
      // this.tradeList.push({business: trade.business, product: trade.product, province: trade.province, city: trade.city, contact: trade.contact, date: trade.date, pics: trade.pics, firstImg: firstImg});
      this.trade.business = data.business;
      this.trade.product = data.product;
      this.trade.province = data.province;
      this.trade.city = data.city;
      this.trade.contact = data.contact;
      this.trade.quantity = data.quantity;
      this.trade.price = data.price;
      this.trade.desc = data.description;
      if(data.pics != null && data.pics != undefined && data.pics.length > 0){
        data.pics.forEach((img) => {
          var url = this.global.SERVER + "/upload/" + img;
          this.allImgs.push({url:url, newName:img});
        });
      }
    })

    setTimeout(() => {
      new Swiper(".tradeDetailPics",{
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev'
      })
    }, 500)
  }

}
