import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, LoadingController, ViewController } from 'ionic-angular';
import { CommentSvc } from '../../providers/comment-svc';
import { Global } from '../../providers/global';
import { CommentDetailPage } from '../comment-detail/comment-detail';
import { Errors } from '../../providers/errors';
declare const notie: any;
import * as moment from 'moment';
import * as Promise from 'promise';
import * as _ from 'lodash';

/*
  Generated class for the ComDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-comment-list',
  templateUrl: 'comment-list.html'
})
export class CommentListPage {

  titleStr: any;
  marketId: any;
  comList: any = [];
  type: any = "qh";
  from: any = false;
  qhList: any = [];
  xhList: any = [];
  sName;
  mName;

  constructor(public zone: NgZone, public navCtrl: NavController, public param: NavParams,
    public commentSvc: CommentSvc, public global: Global, public loading: LoadingController,
    public errors: Errors, public viewCtrl: ViewController) {
    this.sName = param.get("sName");
    this.mName = param.get("mName");
    this.from = param.get("from");
    this.marketId = param.get("mId");
    setTimeout(()=>{
      if (this.from) {
        this.titleStr = "操作指导";
        this.sName = '返回';
        this.comList = [];
        let load = loading.create();
        load.present();
        Promise.all([this.getQH1Data(), this.getQH2Data(), this.getXH1Data(), this.getXH2Data()]).then((data: any) => {
        this.qhList = _.orderBy(this.qhList, ['time'], ['desc']);
        this.xhList = _.orderBy(this.xhList, ['time'], ['desc']);
          if (this.type == "qh") {

            this.comList = this.qhList;
          }
          else if (this.type == "xh") {

            this.comList = this.xhList;
          }
        }).catch(err => {

        }).done(() => {
          load.dismiss();
        })
      } else {
        this.titleStr = this.mName;
        this.getDetailData();
      }
    },500);

  }

  ionViewWillEnter() {
    this.viewCtrl.setBackButtonText(this.sName);
  }

  getQH1Data() {
    return this.commentSvc.getCommentDetail(this.global.MOBILE, 1272).then((data: any) => {
      data.forEach((c: any) => {
        this.qhList.push({ avatar: c.avatar, url: c.url, title: c.title, date: moment(c.date).format('MM-DD'), id: c.id, proName: c.productname, isOrder: c.isOrder, time: c.date });
      });
    })
  }

  getQH2Data() {
    return this.commentSvc.getCommentDetail(this.global.MOBILE, 1273).then((data: any) => {
      data.forEach((c: any) => {
        this.qhList.push({ avatar: c.avatar, url: c.url, title: c.title, date: moment(c.date).format('MM-DD'), id: c.id, proName: c.productname, isOrder: c.isOrder, time: c.date });
      });
    })
  }

  getXH1Data() {
    return this.commentSvc.getCommentDetail(this.global.MOBILE, 1274).then((data: any) => {
      data.forEach((c: any) => {
        this.xhList.push({ avatar: c.avatar, url: c.url, title: c.title, date: moment(c.date).format('MM-DD'), id: c.id, proName: c.productname, isOrder: c.isOrder, time: c.date });
      });
    })
  }

  getXH2Data() {
    return this.commentSvc.getCommentDetail(this.global.MOBILE, 1275).then((data: any) => {
      data.forEach((c: any) => {
        this.xhList.push({ avatar: c.avatar, url: c.url, title: c.title, date: moment(c.date).format('MM-DD'), id: c.id, proName: c.productname, isOrder: c.isOrder, time: c.date });
      });
    })
  }

  goDetail(url) {
    this.navCtrl.push(CommentDetailPage, {
      url: url
    });
  }

  onSegmentChanged() {
    this.comList = [];
    if (this.type == "qh") {
      this.comList = this.qhList;
    }
    else if (this.type == "xh") {
      this.comList = this.xhList;
    }
  }

  getDetailData() {
    let loading = this.loading.create({});
    loading.present();
    this.commentSvc.getCommentDetail(this.global.MOBILE, this.marketId).then((data: any) => {
      data.forEach((c: any) => {
        this.comList.push({ avatar: c.avatar, url: c.url, title: c.title, date: moment(c.date).format('MM-DD'), id: c.id, proName: c.productname, isOrder: c.isOrder, time: c.date });
      });
    }).catch((err) => {

    }).done(() => {
      loading.dismiss();
    });
  }

  subscribeOrC(pro, isOrder, slide) {
    if (pro.isOrder == 'NO') {
      pro.isOrder = 'YES';
    }
    else {
      pro.isOrder = 'NO';
    }
    this.commentSvc.subscribeOrCancel(pro.id, isOrder, this.global.MOBILE).then((data: any) => {
      if (data.result == "error") {
        if (pro.isOrder == "NO") {
          pro.isOrder = "YES";
          notie.alert('error', this.errors.SUBSCRIBE_FAILED, this.global.NOTIFICATION_DURATION);
        }
        else {
          pro.isOrder = "NO";
          notie.alert('error', this.errors.UNSUBSCRIBE_FAILED, this.global.NOTIFICATION_DURATION);
        }
      }
      // else {
      //     if (pro.isOrder == 'NO') {
      //       pro.isOrder = 'YES';
      //     }
      //     else {
      //       pro.isOrder = 'NO';
      //     }
      // }
    }).catch((err) => {
      notie.alert('error', this.errors.OPTION_FAILED, this.global.NOTIFICATION_DURATION);
    }).done(() => {
      slide.close();
    })
  }

}
