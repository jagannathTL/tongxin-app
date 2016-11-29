import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';

/*
  Generated class for the Trade page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-trade',
  templateUrl: 'trade.html'
})
export class TradePage {

  title = '';

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public params: NavParams) {
    this.title = params.get('title');
  }

  ionViewDidLoad() {
    console.log('Hello TradePage Page');
  }

  ionViewWillEnter() {
    this.viewCtrl.setBackButtonText('商圈');
  }

  addTrade(){
    console.log('addTrade:'+this.title);
  }
}
