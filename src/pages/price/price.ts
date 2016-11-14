import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Price page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-price',
  templateUrl: 'price.html'
})
export class PricePage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello PricePage Page');
  }

}
