import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { InfoPage } from '../info/info';
import { YellowPage } from '../yellow/yellow';
import { TradePage } from '../trade/trade';
import { Global } from '../../providers/global';
import { LoginPage } from '../login/login';

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

  constructor(public navCtrl: NavController, public global: Global, public app: App) {
    if (this.global.IS_LOGGEDIN == false) {
      this.app.getRootNav().setRoot(LoginPage);
    }
  }

  gotoInfo() {
    this.navCtrl.push(InfoPage);
  }

  gotoYellow() {
    this.navCtrl.push(YellowPage);
  }

  gotoTrade(title, documentType) {
    debugger
    this.navCtrl.push(TradePage, {
      title: title,
      documentType: documentType
    });
  }

}
