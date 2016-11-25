
import { Component, NgZone } from '@angular/core';
import { NavController, LoadingController, Events, Platform } from 'ionic-angular';
import { CommentPage } from '../comment/comment';
import { FuturesPage } from '../futures/futures';
import { InboxPage } from '../inbox/inbox';
import { PricePage } from '../price/price';
import { CirclePage } from '../circle/circle';
import { InboxSvc } from '../../providers/inbox-svc';
import { Global } from '../../providers/global';
import { Splashscreen, Badge } from 'ionic-native';

/*
  Generated class for the Tabs page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  inbox: any;
  price: any;
  comment: any;
  circle: any;
  futures: any;
  badge = 0;

  constructor(public navCtrl: NavController, public inboxSvc: InboxSvc,
    public global: Global, public loadingCtrl: LoadingController,
    public events: Events, public platform: Platform, public zone: NgZone) {
    this.inbox = InboxPage;
    this.price = PricePage;
    this.comment = CommentPage;
    this.circle = CirclePage;
    this.futures = FuturesPage;

    platform.ready().then(() => {
      Splashscreen.hide();
    });

    events.unsubscribe('inbox:clearTabsBadge');
    events.subscribe('inbox:clearTabsBadge', () => {
      this.zone.run(() => {
        this.badge = 0;
        Badge.clear();
      });
    })
    events.unsubscribe('tabsPage:setBadge');
    events.subscribe('tabsPage:setBadge', (count) => {
      //console.log('set badge:' + count);
      this.zone.run(() => {
        this.badge = parseInt(count);
        Badge.set(this.badge);
      });
    });
  }
}
