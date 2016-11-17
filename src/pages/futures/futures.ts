import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { SecureStorage} from 'ionic-native';

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

  clear(){
    let secureStorage: SecureStorage = new SecureStorage();
    secureStorage.create('tongxin')
      .then(
      () => console.log('Storage is ready!'),
      error => {
      });
      secureStorage.remove('mobile').then();
      secureStorage.remove('password').then();
  }

}
