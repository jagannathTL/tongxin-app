import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello CirclePage Page');
  }

}
