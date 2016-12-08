import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Global } from '../../providers/global';
import { FuturesPage } from '../futures/futures';
import { PricePage } from '../price/price';
import { CommentPage } from '../comment/comment';
declare const Swiper: any;

/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  ad01 = this.global.SERVER + '/ad/ad03.jpg';
  ad02 = this.global.SERVER + '/ad/ad02.jpg';
  ad03 = this.global.SERVER + '/ad/ad03.jpg';

  type = 'cast';

  constructor(public navCtrl: NavController, public global: Global) {

  }

  gotoFutures() {
    this.navCtrl.push(FuturesPage);
  }

  gotoComment() {
    this.navCtrl.push(CommentPage);
  }

  gotoPrice() {
    this.navCtrl.push(PricePage);
  }

  ionViewDidLoad() {
    let adMain = document.getElementById('adMain');
    adMain.style.width = document.body.clientWidth + 'px';
    adMain.style.height = document.body.clientWidth / this.global.AD_MAIN_RATIO + 'px';
    new Swiper('.swiper-container', {
      pagination: '.swiper-pagination',
      paginationClickable: true,
      loop: true,
      between: 0,
      autoplay: 2 * 1000
    });
  }
}
