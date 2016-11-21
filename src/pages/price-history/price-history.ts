import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { PriceSvc } from '../../providers/price-svc';
import { Global } from '../../providers/global';
import { Errors } from '../../providers/errors';
import { PriceChartPage } from '../price-chart/price-chart';
import moment from 'moment';
declare const notie: any;

/*
  Generated class for the PriceHistory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-price-history',
  templateUrl: 'price-history.html'
})
export class PriceHistoryPage {
  product: any;
  backText = '';
  items = [];
  start = moment().add(-1, 'months').format('YYYY-MM-DD');
  end = moment().add(1, 'days').format('YYYY-MM-DD');
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController, public priceSvc: PriceSvc, public global: Global, public errors: Errors, public loadingCtrl: LoadingController) {
    this.product = navParams.get('product');
    this.backText = navParams.get('backText');
  }

  getHistoryPrices() {
    if(moment(this.end).diff(moment(this.start), 'days') > this.global.PRICE_HISTORY_DURATION_DAYS){
      notie.alert('error', this.errors.CANNOT_EXCEED_90_DAYS, this.global.NOTIFICATION_DURATION);
      return;
    }
    let loading = this.loadingCtrl.create();
    loading.present();
    this.priceSvc.getPriceHistory(this.product.ProductId, this.start, this.end).then(data => {
      this.items = data;
    }).catch(err => {
      notie.alert('error', this.errors.GET_DATA_FAILED, this.global.NOTIFICATION_DURATION);
    }).done(() => {
      loading.dismiss();
    });
  }

  ionViewWillEnter() {
    this.viewCtrl.setBackButtonText(this.backText);
  }

  gotoChart(){
    this.navCtrl.push(PriceChartPage, {
      product: this.product,
      items: this.items
    });
  }

}
