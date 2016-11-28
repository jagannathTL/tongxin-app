import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InfoPage } from '../info/info';
import { YellowPage } from '../yellow/yellow';
import { TradePage } from '../trade/trade';

/*
  Generated class for the Circle page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-circle',
  templateUrl: 'circle.html'
})
export class CirclePage {

  constructor(public navCtrl: NavController) { }

  gotoInfo() {
    this.navCtrl.push(InfoPage);
  }

  gotoYellow() {
    this.navCtrl.push(YellowPage);
  }

  gotoTrade(title) {
    this.navCtrl.push(TradePage, {
      title: title
    });
  }

}
