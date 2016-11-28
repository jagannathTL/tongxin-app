import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Yellow page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-yellow',
  templateUrl: 'yellow.html'
})
export class YellowPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello YellowPage Page');
  }

}
