import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, PopoverController } from 'ionic-angular';
declare var $: any;
import { SharePage } from '../share/share';

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
  url = 'about:blank';
  date;
  msg;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController, public popoverCtrl: PopoverController) {
    this.url = navParams.get('url');
    this.date = navParams.get('date');
    this.msg = navParams.get('msg');
  }

  ionViewDidEnter() {
    let load = this.loadingCtrl.create();
    load.present();
    $("#inbox").attr('src', this.url).ready(function() {
      load.dismiss();
    });
  }

  presentPopover(event) {
    let popover = this.popoverCtrl.create(SharePage, {
      url: this.url,
      date: this.date,
      msg: this.msg
    });
    popover.present({
      ev: event
    });
  }
}
