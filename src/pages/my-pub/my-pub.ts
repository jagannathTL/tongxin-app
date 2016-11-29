import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the MyPub page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-pub',
  templateUrl: 'my-pub.html'
})
export class MyPubPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello MyPubPage Page');
  }

}
