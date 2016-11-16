import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';

/*
  Generated class for the Futures page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-futures',
  templateUrl: 'futures.html'
})
export class FuturesPage {

  constructor(public navCtrl: NavController, public platform: Platform) {

  }

  ionViewDidLoad() {
    // this.platform.ready().then(() => {
    //   let browser = new InAppBrowser('http://futures.shtx.com.cn/', '_system');
    //   browser.show();
    // });
  }

}
