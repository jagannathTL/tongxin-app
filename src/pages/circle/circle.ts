import { Component } from '@angular/core';
import { NavController, App, ViewController } from 'ionic-angular';
import { InfoPage } from '../info/info';
import { YellowPage } from '../yellow/yellow';
import { TradePage } from '../trade/trade';
import { Global } from '../../providers/global';
import { LoginPage } from '../login/login';
import { CommentListPage } from '../comment-list/comment-list';
declare const Swiper: any;

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

  swiper:any;
  ad01 = this.global.SERVER + '/ad/circle_ad01.png';
  ad02 = this.global.SERVER + '/ad/circle_ad02.png';
  ad03 = this.global.SERVER + '/ad/circle_ad03.png';

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

  ionViewDidLoad() {
    let adMain = document.getElementById('adMain');
    adMain.style.width = document.body.clientWidth + 'px';
    adMain.style.height = document.body.clientWidth / this.global.AD_MAIN_RATIO + 'px';
    this.swiper = new Swiper('.circle-swiper', {
      pagination: '.circle-pagination',
      paginationClickable: true,
      loop: true,
      between: 0,
      autoplay: 2 * 1000,
      autoplayDisableOnInteraction: false
    });
    //debugger;
  }

  gotoPinglun(marketId, sName, mName) {
    this.navCtrl.push(CommentListPage, {
      mId: marketId,
      sName: sName,
      mName: mName
    });
  }

  ionViewDidEnter(){
      this.swiper.startAutoplay();
  }

  ionViewWillLeave(){
    this.swiper.stopAutoplay();
  }
}
