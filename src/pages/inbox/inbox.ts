import { Component } from '@angular/core';
import { NavController, LoadingController, Events } from 'ionic-angular';
import { InboxSvc } from '../../providers/inbox-svc';
import { Global } from '../../providers/global';
import { Errors } from '../../providers/errors';
declare const notie: any;
import * as _ from 'lodash';
import { CommentDetailPage } from '../comment-detail/comment-detail';

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

  items = [];
  loaded = false;
  showPage = false;

  constructor(public navCtrl: NavController, public inboxSvc: InboxSvc, public global: Global, public errors: Errors, public loadingCtrl: LoadingController, public events: Events) {
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
      this.loaded = true;
    });

    //订阅获取最新事件
    events.subscribe('tabsPage:loadItems', (newItems) => {
      if (newItems.length > 0) {
        this.items = _.concat(newItems, this.items);
      }
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
    this.showPage = true;
    this.navCtrl.push(CommentDetailPage, {
      url: url
    });
  }
}
