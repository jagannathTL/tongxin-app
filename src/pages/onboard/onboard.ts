import { Component } from '@angular/core';
import { NavController, NavParams, Events, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Splashscreen } from 'ionic-native';
import { YellowSvc } from '../../providers/yellow-svc';
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

  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public events: Events, public yellowSvc: YellowSvc) {
    platform.ready().then(() => {
      Splashscreen.hide();
    });
  }

  ionViewDidLoad() {
    new Swiper(".swiper-container", {
      pagination: ".swiper-pagination",
      paginationClickable: true
    });
  }

  gotoApp(){
    // this.ye.publish('onBoard:checkLogin');
    this.yellowSvc.checkLogin();
  }

}
