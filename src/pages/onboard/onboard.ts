import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, Events, Platform, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Splashscreen } from 'ionic-native';
import { YellowSvc } from '../../providers/yellow-svc';
import { TabsPage } from '../tabs/tabs';
declare const Swiper: any;

/*
  Generated class for the Onboard page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-onboard',
  templateUrl: 'onboard.html'
})
export class OnboardPage {

  constructor(public zone: NgZone, public app: App, public platform: Platform, public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public events: Events, public yellowSvc: YellowSvc) {

  }

  ionViewDidEnter() {
    this.platform.ready().then(() => {
      setTimeout(() => {
        Splashscreen.hide();
      }, 500);
    });
  }

  ionViewDidLoad() {
    new Swiper(".swiper-container", {
      pagination: ".swiper-pagination",
      paginationClickable: true,
      onInit: (swiper) => {
        swiper.lockSwipeToPrev();
      },
      onTransitionStart: (swiper) => {
        if (swiper.isBeginning == true) {
          swiper.lockSwipeToPrev();
        } else {
          swiper.unlockSwipeToPrev();
        }
        if (swiper.isEnd == true) {
          swiper.lockSwipeToNext();
        } else {
          swiper.unlockSwipeToNext();
        }
      }
    });
  }

  gotoApp() {
    this.storage.set('isFirst', false).then(() => {
      this.yellowSvc.checkLogin();
      this.zone.run(() => {
        this.app.getRootNav().setRoot(TabsPage);
      });
    });
  }

}
