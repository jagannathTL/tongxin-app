import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
declare const c3: any;

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
  items = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.product = navParams.get('product');
    this.items = navParams.get('items');
  }

  ionViewWillEnter() {
    var chart = c3.generate({
      data: {
        columns: [
          ['data1', 30, 200, 100, 400, 150, 250],
          ['data2', 50, 20, 10, 40, 15, 25]
        ]
      }
    });
  }

}
