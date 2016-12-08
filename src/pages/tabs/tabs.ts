import { Component, NgZone } from '@angular/core';
import { NavController, LoadingController, Events, Platform } from 'ionic-angular';
import { InboxPage } from '../inbox/inbox';
import { CirclePage } from '../circle/circle';
import { HomePage } from '../home/home';
import { InfoPage } from '../info/info';
import { InboxSvc } from '../../providers/inbox-svc';
import { Global } from '../../providers/global';
import { Splashscreen, Badge } from 'ionic-native';
import { LoginPage } from '../login/login';

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
  home: any;
  info: any;
  circle: any;
  badge = 0;

  constructor(public navCtrl: NavController, public inboxSvc: InboxSvc,
    public global: Global, public loadingCtrl: LoadingController,
    public events: Events, public platform: Platform, public zone: NgZone) {

    this.home = HomePage;
    this.inbox = InboxPage;
    this.circle = CirclePage;
    this.info = InfoPage;

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
      this.zone.run(() => {
        this.badge = parseInt(count);
        Badge.set(this.badge);
      });
    });
  }
}
