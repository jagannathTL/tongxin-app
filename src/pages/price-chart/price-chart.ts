import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the PriceChart page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-price-chart',
  templateUrl: 'price-chart.html'
})
export class PriceChartPage {
  
  product: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.product = navParams.get('product');
  }

}
