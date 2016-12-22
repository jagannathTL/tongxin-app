import { Component, NgZone } from '@angular/core';
import { NavController, ModalController, LoadingController, Platform } from 'ionic-angular';
import { Global } from '../../providers/global';
import { FuturesPage } from '../futures/futures';
import { PricePage } from '../price/price';
import { CommentPage } from '../comment/comment';
declare const Swiper: any;
import { CommentSvc } from '../../providers/comment-svc';
import { CommentDetailPage } from '../comment-detail/comment-detail';
import { CommentListPage } from '../comment-list/comment-list';
import * as Promise from 'promise';
import * as _ from 'lodash';
import { TradePage } from '../trade/trade';
import { BydesignPage } from '../bydesign/bydesign';
import { Storage } from '@ionic/storage';
import {Splashscreen} from 'ionic-native';

/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  ad01 = this.global.SERVER + '/ad/home_ad01.png';
  ad02 = this.global.SERVER + '/ad/home_ad02.png';
  ad03 = this.global.SERVER + '/ad/home_ad03.png';
  ad04 = this.global.SERVER + '/ad/home_ad04.png';

  type = 'cast';
  items = [];
  cast = [];
  projects = [];
  materials = [];
  swiper: any;

  constructor(public navCtrl: NavController, public global: Global,
    public modalCtrl: ModalController, public commentSvc: CommentSvc,
    public loadingCtrl: LoadingController, public zone: NgZone, public storage: Storage,
    public platform: Platform) {

    this.storage.get('isFirst').then((first: any) => {
      if (first != null && first != undefined) {
        this.zone.run(() => {
          platform.ready().then(() => {
            setTimeout(() => {
              Splashscreen.hide();
            }, 500);
          });
        })
        let load = loadingCtrl.create();
        load.present();
        Promise.all([this.getCastData(), this.getProjectsData(), this.getMaterialsData()]).then(data => {
        }).catch(err => {
          console.log(err);
        }).done(() => {
          load.dismiss();
        });
      }
    });
  }

  gotoTrade(title, documentType) {
    this.navCtrl.push(TradePage, {
      title: title,
      documentType: documentType,
      back: '首页'
    });
  }

  gotoOptions() {
    this.navCtrl.push(CommentListPage, {
      from: true,
      sName: '返回'
    })
  }
  gotoUrlDetail(p) {
    var u = "";
    if (p.url == null || p.url == undefined) {
      u = "http://app.shtx.com.cn/StaticHtml/WeixinPingLun.html?content=" + encodeURIComponent(p.title);
    }
    else {
      u += p.url + '&mobile=' + this.global.MOBILE;
    }
    this.navCtrl.push(CommentDetailPage, {
      url: u
    });
  }

  getCastData() {
    return this.commentSvc.getCommentTodayById(1271).then((data: any) => {
      if (data != null && data != undefined && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          data[i].dateStr = data[i].date.substr(5, 14);
        }
        this.cast = _.concat(data);
        if (this.type == 'cast') {
          this.items = this.cast;
        }
      }
    }).catch(err => {
      console.log(err);
    })
  }

  gotoByDesign() {
    this.navCtrl.push(BydesignPage);
  }

  getProjectsData() {
    return this.commentSvc.getCommentTodayById(1276).then((data: any) => {
      if (data != null && data != undefined && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          data[i].dateStr = data[i].date.substr(5, 14);
        }
        this.projects = _.concat(data);
        // if (this.type == 'projects') {
        //   this.items = this.projects;
        // }
      }
    }).catch(err => {
      console.log(err);
    })
  }

  getMaterialsData() {
    return this.commentSvc.getCommentTodayById(1277).then((data: any) => {
      if (data != null && data != undefined && data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          data[i].dateStr = data[i].date.substr(5, 14);
        }
        this.materials = _.concat(data);
        // if (this.type == 'materials') {
        //   this.items = this.materials;
        // }
      }
    }).catch(err => {
      console.log(err);
    })
  }

  gotoFutures() {
    this.navCtrl.push(FuturesPage);
  }

  gotoComment() {
    this.navCtrl.push(CommentPage);
  }

  gotoPrice() {
    this.navCtrl.push(PricePage);
  }

  gotoPinglun(marketId, sName, mName) {
    this.navCtrl.push(CommentListPage, {
      mId: marketId,
      sName: sName,
      mName: mName
    });
  }

  ionChange() {
    if (this.type == 'cast') {
      this.items = this.cast;
    } else if (this.type == 'projects') {
      this.items = this.projects;
    } else if (this.type == 'materials') {
      this.items = this.materials;
    }
  }

  ionViewDidLoad() {
    let adMain = document.getElementById('adMain');
    adMain.style.width = document.body.clientWidth + 'px';
    adMain.style.height = document.body.clientWidth / this.global.AD_MAIN_RATIO + 'px';
    this.swiper = new Swiper('.home-swiper', {
      pagination: '.home-pagination',
      paginationClickable: true,
      loop: true,
      between: 0,
      autoplay: 2 * 1000,
      autoplayDisableOnInteraction: false
    });
  }


  ionViewDidEnter() {
    this.swiper.startAutoplay();
  }

  ionViewWillLeave() {
    this.swiper.stopAutoplay();
  }


}
