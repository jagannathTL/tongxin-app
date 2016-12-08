import { Component, ViewChild, Input } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

/*
  Generated class for the Search page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  @ViewChild('searchBox') myInput;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController) { }

  ionViewDidLoad() {
    this.myInput.setFocus();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
