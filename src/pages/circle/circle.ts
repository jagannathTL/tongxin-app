import { Component } from '@angular/core';
import { NavController, App, ViewController } from 'ionic-angular';
import { InfoPage } from '../info/info';
import { YellowPage } from '../yellow/yellow';
import { TradePage } from '../trade/trade';
import { Global } from '../../providers/global';
import { LoginPage } from '../login/login';
import { CommentListPage } from '../comment-list/comment-list';

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

  constructor(public navCtrl: NavController, public global: Global, public app: App, public viewCtrl: ViewController) {
    if (this.global.IS_LOGGEDIN == false) {
      this.app.getRootNav().setRoot(LoginPage);
    }
  }

  ionViewWillEnter() {
    this.viewCtrl.setBackButtonText('首页');
  }

  gotoInfo() {
    this.navCtrl.push(InfoPage);
  }

  gotoYellow() {
    this.navCtrl.push(YellowPage);
  }

  gotoTrade(title, documentType) {
    this.navCtrl.push(TradePage, {
      title: title,
      documentType: documentType,
      back: '商圈'
    });
  }

  gotoOptions() {
    this.navCtrl.push(CommentListPage, {
      from: true
    })
  }

  gotoPinglun(marketId, sName, mName) {
    this.navCtrl.push(CommentListPage, {
      mId: marketId,
      sName: sName,
      mName: mName
    });
  }
}
