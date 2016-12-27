import { Component, NgZone } from '@angular/core';
import { NavController, LoadingController, Events, App } from 'ionic-angular';
import { InboxSvc } from '../../providers/inbox-svc';
import { Global } from '../../providers/global';
import { Errors } from '../../providers/errors';
declare const notie: any;
import * as _ from 'lodash';
import { CommentDetailPage } from '../comment-detail/comment-detail';
import moment from 'moment';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { Clipboard } from 'ionic-native';

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
  // readList: any = [];

  constructor(public navCtrl: NavController, public inboxSvc: InboxSvc,
    public global: Global, public errors: Errors, public zone: NgZone,
    public loadingCtrl: LoadingController, public events: Events, public app: App, public storage: Storage) {
    if (this.global.IS_LOGGEDIN == false) {
      this.app.getRootNav().setRoot(LoginPage);
    } else {
      //初始化
      this.lastDate = moment().format('YYYY-MM-DD HH:mm:ss SSS');
      let load = this.loadingCtrl.create();
      load.present();
      inboxSvc.loadItems(global.MOBILE).then(data => {
        if (data.length > 0) {

          //保存最新一条的时间，刷新使用
          this.lastDate = data[0].date;

          this.storage.get('readList').then((reads: any) => {
            if (reads == null || reads == undefined || reads.length <= 0) {
              for (let i = 0; i < data.length; i++) {
                data[i].dateStr = data[i].date.substr(5, 14);
                this.items.push({ id: data[i].id, date: data[i].date, dateStr: data[i].dateStr, msg: data[i].msg, url: data[i].url, isRead: true })
              }
            }
            else {
              for (let i = 0; i < data.length; i++) {
                var isRead = true;
                data[i].dateStr = data[i].date.substr(5, 14);

                var read = reads.filter((r: any) => {
                  return r.id == data[i].id;
                })
                if (read != null && read != undefined && read.length > 0) {
                  isRead = false;
                }
                this.items.push({ id: data[i].id, date: data[i].date, dateStr: data[i].dateStr, msg: data[i].msg, url: data[i].url, isRead: isRead })
              }
            }
          })
        }
      }).catch(error => {
        notie.alert('error', this.errors.GET_INBOX_FAILED, this.global.NOTIFICATION_DURATION);
      }).done(() => {
        load.dismiss();
      });
    }
  }

  readAll() {
    var readList: any = [];
    this.storage.keys().then((data: any) => {
      var readKey = data.filter((key: any) => {
        return key == 'readList';
      })
      if (readKey != null && readKey != undefined && readKey.length > 0) {
        this.storage.get('readList').then((data: any) => {
          if (data != null && data != undefined) {
            readList = data;
          }
          _.each(this.items, item => {
            item.isRead = false;
            var read = readList.filter((r: any) => {
              return r.id == item.id;
            })
            if (read == null || read == undefined || read.length <= 0) {
              readList.push({ id: item.id });
            }
          })
          this.storage.set('readList', readList);
        })
      }
      else {
        _.each(this.items, item => {
          item.isRead = false;
          readList.push({ id: item.id });
        });
        this.storage.set('readList', readList);
      }
    })
  }

  doRefresh(refresher) {
    //把加载的数据传到inbox的items参数里面
    console.log(this.lastDate);
    this.inboxSvc.loadNewItems(this.global.MOBILE, this.lastDate).then(data => {
      // 下边注释的已经不用了，改为从第一条数据获取，要判断是否有最新数据。页面初始化的时候已经给该值赋值了。
      //this.lastDate = moment().format('YYYY-MM-DD HH:mm:ss SSS');
      if (data.length > 0) {
        this.lastDate = data[0].date;//数据返回时已经排过序，最新一条在最上边。
        let temp = [];
        for (let i = 0; i < data.length; i++) {
          data[i].dateStr = data[i].date.substr(5, 14);
          // this.items.push({ id: data[i].id, date: data[i].date, dateStr: data[i].dateStr, msg: data[i].msg, url: data[i].url, isRead: true });
          temp.push({ id: data[i].id, date: data[i].date, dateStr: data[i].dateStr, msg: data[i].msg, url: data[i].url, isRead: true });
        }
        this.items = _.concat(temp, this.items);//保持传过来的数据的顺序，确保最大日期的在最上边显示。
      } else {
        notie.alert('warning', this.errors.NOMORE_DATA, this.global.NOTIFICATION_DURATION);
      }
      this.inboxSvc.clearBadge(this.global.MOBILE).then(() => {
        this.events.publish('inbox:clearTabsBadge');
      }).catch((err) => console.log('clearBadge error!'));
    }).catch(error => {
      console.log(error);
    }).done(() => {
      this.zone.run(() => {
        refresher.complete();
      });
    });
  }

  doInfinite(infiniteScroll) {
    if (this.items.length == 0) {
      //没有数据就不能再刷新。否则不知道下边的_.last(this.items).date会不会报错。
      setTimeout(() => {
        this.zone.run(() => { infiniteScroll.complete(); });
      }, 500)
      return;
    }
    this.inboxSvc.loadMoreItems(this.global.MOBILE, _.last(this.items).date).then(data => {
      if (data.length > 0) {
        this.storage.get('readList').then((reads: any) => {
          if (reads == null || reads == undefined || reads.length <= 0) {
            for (let i = 0; i < data.length; i++) {
              data[i].dateStr = data[i].date.substr(5, 14);
              this.items.push({ id: data[i].id, date: data[i].date, dateStr: data[i].dateStr, msg: data[i].msg, url: data[i].url, isRead: true })
            }
          }
          else {
            for (let i = 0; i < data.length; i++) {
              var isRead = true;
              data[i].dateStr = data[i].date.substr(5, 14);

              var read = reads.filter((r: any) => {
                return r.id == data[i].id;
              })
              if (read != null && read != undefined && read.length > 0) {
                isRead = false;
              }
              this.items.push({ id: data[i].id, date: data[i].date, dateStr: data[i].dateStr, msg: data[i].msg, url: data[i].url, isRead: isRead })
            }
          }
        })
      }
      else {
        notie.alert('warning', this.errors.NOMORE_DATA, this.global.NOTIFICATION_DURATION);
      }
    }).catch(error => {
      notie.alert('error', this.errors.GET_INBOX_FAILED, this.global.NOTIFICATION_DURATION);
    }).done(() => {
      this.zone.run(() => { infiniteScroll.complete(); });
    });
  }

  gotoCommentDetail(item) {

    var readList: any = [];
    this.storage.keys().then((data: any) => {
      var readKey = data.filter((key: any) => {
        return key == 'readList';
      })
      if (readKey != null && readKey != undefined && readKey.length > 0) {
        this.storage.get('readList').then((data: any) => {
          if (data != null && data != undefined) {
            readList = data;
          }
          var read = readList.filter((r: any) => {
            return r.id == item.id;
          })
          if (read == null || read == undefined || read.length <= 0) {
            readList.push({ id: item.id });
          }
          this.storage.set('readList', readList);
        })
      }
      else {
        readList.push({ id: item.id });
        this.storage.set('readList', readList);
      }
    })
    var url = "";
    if (item.url == null || item.url == undefined) {
      url = "http://app.shtx.com.cn/StaticHtml/WeixinPingLun.html?content=" + encodeURIComponent(item.msg);
    }
    else {
      url += item.url + '&mobile=' + this.global.MOBILE;
    }

    this.showPage = true;
    item.isRead = false;
    this.navCtrl.push(CommentDetailPage, {
      url: url,
      msg: item.msg,
      date: item.dateStr
    });
  }

  copyItem(i, slidingItem) {
    Clipboard.copy(i.msg + ' ' + i.dateStr);
    slidingItem.close();
  }
}
