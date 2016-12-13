import { Component } from '@angular/core';
import { NavController, Platform, NavParams, ViewController } from 'ionic-angular';
declare const Wechat: any;
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
  thumb = 'http://app.shtx.com.cn/UploadImage/logo.png';
  constructor(public navCtrl: NavController, public platform: Platform,
    public navParams: NavParams, public viewCtrl: ViewController) {
    this.url = navParams.get('url');
    this.date = navParams.get('date');
    this.msg = navParams.get('msg');
  }

  share2QQ() {
    var args: any = {};
    args.imageUrl = this.thumb;
    args.url = this.url;
    args.title = this.msg;
    args.description = '同鑫资讯 ' + this.date;
    args.appName = "同鑫资讯";
    YCQQ.shareToQQ().then(data => {
      console.log('success');
    }).catch(err => {
      console.log('fail');
    }).done(() => {
      this.viewCtrl.dismiss();
    });
  }

  share2Wechat() {
    Wechat.share({
      message: {
        title: this.msg,
        description: '同鑫资讯 ' + this.date,
        thumb: this.thumb,
        media: {
          type: Wechat.Type.WEBPAGE,
          webpageUrl: this.url
        }
      },
      scene: Wechat.Scene.SESSION
    }).then(data => {
      console.log('success');
    }).catch(err => {
      console.log('fail');
    }).done(() => {
      this.viewCtrl.dismiss();
    });
  }

  share2Moments() {
    Wechat.share({
      message: {
        title: this.msg,
        description: '同鑫资讯 ' + this.date,
        thumb: this.thumb,
        media: {
          type: Wechat.Type.WEBPAGE,
          webpageUrl: this.url
        }
      },
      scene: Wechat.Scene.TIMELINE
    }).then(data => {
      console.log('success');
    }).catch(err => {
      console.log('fail');
    }).done(() => {
      this.viewCtrl.dismiss();
    });
  }
}
