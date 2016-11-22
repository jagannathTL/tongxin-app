import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { PriceSvc } from '../../providers/price-svc';
import { Global } from '../../providers/global';
import { Errors } from '../../providers/errors';
import { PriceHistoryPage } from '../price-history/price-history';
declare const notie: any;
/*
  Generated class for the PriceDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-price-detail',
  templateUrl: 'price-detail.html'
})
export class PriceDetailPage {

  market: any;
  items = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController, public priceSvc: PriceSvc,
    public global: Global, public errors: Errors, public loadingCtrl: LoadingController) {
    this.market = navParams.get('market');
    let loading = loadingCtrl.create();
    loading.present();
    priceSvc.getPriceDetail(this.global.MOBILE, this.market.marketId, 1).then(data => {
      console.log(data);
      this.items = data;
    }).catch(err => {
      notie.alert('error', this.errors.GET_DATA_FAILED, this.global.NOTIFICATION_DURATION);
    }).done(() => {
      loading.dismiss();
    });
  }

  ionViewWillEnter() {
    this.viewCtrl.setBackButtonText(this.market.name);
  }

  gotoPriceHistory(product){
    this.navCtrl.push(PriceHistoryPage, {
      product: product,
      backText: this.market.marketName
    });
  }

}
