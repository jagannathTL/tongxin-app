import { Component, NgZone } from '@angular/core';
import { NavController, LoadingController, Events } from 'ionic-angular';
import { InboxSvc } from '../../providers/inbox-svc';
import { Global } from '../../providers/global';
import { Errors } from '../../providers/errors';
declare const notie: any;
import * as _ from 'lodash';
import { CommentDetailPage } from '../comment-detail/comment-detail';
import moment from 'moment';

/*
  Generated class for the Inbox page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-inbox',
  templateUrl: 'inbox.html'
})
export class InboxPage {

  lastDate: string;
  items = [];
  showPage = false;

  constructor(public navCtrl: NavController, public inboxSvc: InboxSvc,
    public global: Global, public errors: Errors, public zone: NgZone,
    public loadingCtrl: LoadingController, public events: Events) {
    //初始化
    this.lastDate = moment().format('YYYY-MM-DD HH:mm:ss SSS');
    events.unsubscribe('inboxPage:loadItems');
    events.subscribe('inboxPage:loadItems', () => {
      let load = this.loadingCtrl.create();
      load.present();
      inboxSvc.loadItems(global.MOBILE).then(data => {
        if (data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            data[i].dateStr = data[i].date.substr(5, 14);
          }
          this.items = _.concat(this.items, data);
        }
      }).catch(error => {
        notie.alert('error', this.errors.GET_INBOX_FAILED, this.global.NOTIFICATION_DURATION);
      }).done(() => {
        load.dismiss();
      });
    })
  }

  doRefresh(refresher) {
    //把加载的数据传到inbox的items参数里面
    this.inboxSvc.loadNewItems(this.global.MOBILE, this.lastDate).then(data => {
      this.lastDate = moment().format('YYYY-MM-DD HH:mm:ss SSS');
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          data[i].dateStr = data[i].date.substr(5, 14);
        }
        this.items = _.concat(data, this.items);
        this.inboxSvc.clearBadge(this.global.MOBILE).then(() => {
          this.events.publish('inbox:clearTabsBadge');
        }).catch((err) => console.log('clearBadge error!'));
      } else {
        notie.alert('error', this.errors.NOMORE_DATA, this.global.NOTIFICATION_DURATION);
      }
    }).catch(error => {
      console.log(error);
    }).done(() => {
      this.zone.run(() => {
        refresher.complete();
      });
    });
  }

  doInfinite(infiniteScroll) {
    this.inboxSvc.loadMoreItems(this.global.MOBILE, _.last(this.items).date).then(data => {
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          data[i].dateStr = data[i].date.substr(5, 14);
          //this.items.push(data[i]);
        }
        this.items = _.concat(this.items, data);
      }
      else {
        notie.alert('warning', this.errors.NOMORE_DATA, this.global.NOTIFICATION_DURATION);
      }
    }).catch(error => {
      notie.alert('error', this.errors.GET_INBOX_FAILED, this.global.NOTIFICATION_DURATION);
    }).finally(() => {
      infiniteScroll.complete();
    });
  }

  gotoCommentDetail(url) {
    url += '&mobile=' + this.global.MOBILE;
    console.log(url);
    this.showPage = true;
    this.navCtrl.push(CommentDetailPage, {
      url: url
    });
  }
}
