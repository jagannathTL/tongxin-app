import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public viewCtrl: ViewController) {}

  ionViewDidLoad() {
    console.log('Hello YellowPage Page');
  }

  ionViewWillEnter() {
    this.viewCtrl.setBackButtonText('商圈');
  }

}
