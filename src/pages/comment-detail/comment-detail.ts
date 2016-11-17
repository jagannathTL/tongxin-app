import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the CommentDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-comment-detail',
  templateUrl: 'comment-detail.html'
})
export class CommentDetailPage {
  url: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.url = navParams.get('url');
  }
}
