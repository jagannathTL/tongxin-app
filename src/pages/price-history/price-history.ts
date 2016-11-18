import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { PriceSvc } from '../../providers/price-svc';
import { Global } from '../../providers/global';
import { Errors } from '../../providers/errors';
import { PriceChartPage } from '../price-chart/price-chart';
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
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController, public priceSvc: PriceSvc, public global: Global, public errors: Errors) {
      this.product = navParams.get('product');
      this.backText = navParams.get('backText');
    }

  ionViewDidLoad() {
    console.log('Hello PriceHistoryPage Page');
  }

  ionViewWillEnter() {
    this.viewCtrl.setBackButtonText(this.backText);
  }

}
