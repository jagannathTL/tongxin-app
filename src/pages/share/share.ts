import { Component } from '@angular/core';
import { NavController, Platform, NavParams } from 'ionic-angular';
declare const WeChat: any;
declare const YCQQ: any;

/*
  Generated class for the Share page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-share',
  templateUrl: 'share.html'
})
export class SharePage {
  url;
  date;
  msg;
  constructor(public navCtrl: NavController, public platform: Platform, public navParams: NavParams) {
    this.url = navParams.get('url');
    this.date = navParams.get('date');
    this.msg = navParams.get('msg');
  }

  share2QQ() {
    var args: any = {};
    args.url = this.url;
    args.title = this.msg;
    args.description = '同鑫资讯 ' + this.date;
    args.appName = "同鑫资讯";
    YCQQ.shareToQQ(function() {
      console.log("分享QQ成功");
    }, function(failReason) {
      console.log(failReason);
    }, args);
  }

  share2Wechat() {
    this.platform.ready().then(() => {
      WeChat.share({
        type: WeChat.ShareType.webpage,
        title: this.msg,
        description: '同鑫资讯 ' + this.date,
        url: this.url
      }, WeChat.Scene.session, function() {
        console.log('分享微信好友成功');
      }, function(reason) {
        console.log(reason);
      });
    });
  }

  share2Moments() {
    this.platform.ready().then(() => {
      WeChat.share({
        type: WeChat.ShareType.webpage,
        title: this.msg,
        description: '同鑫资讯 ' + this.date,
        url: this.url
      }, WeChat.Scene.timeline, function() {
        console.log('分享朋友圈成功');
      }, function(reason) {
        console.log(reason);
      });
    });
  }
}
