import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.market = navParams.get('market');
  }

  ionViewWillEnter() {
    this.viewCtrl.setBackButtonText(this.market.name);
  }

}
