import { Component } from '@angular/core';
import { NavController, LoadingController, Events } from 'ionic-angular';
import { CommentPage } from '../comment/comment';
import { FuturesPage } from '../futures/futures';
import { InboxPage } from '../inbox/inbox';
import { PricePage } from '../price/price';
import { CirclePage } from '../circle/circle';
import { InboxSvc } from '../../providers/inbox-svc';
import { Global } from '../../providers/global';

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
  items = [];

  constructor(public navCtrl: NavController, public inboxSvc: InboxSvc, public global: Global, public loadingCtrl: LoadingController, public events: Events) {
    this.inbox = InboxPage;
    this.price = PricePage;
    this.comment = CommentPage;
    this.circle = CirclePage;
    this.futures = FuturesPage;
  }

  loadItems(){
    console.log('loadItems');
    this.items.length = 0;//清空数组
    //把加载的数据传到inbox的items参数里面
    let loader = this.loadingCtrl.create({});
    loader.present();
    this.inboxSvc.loadNewItems(this.global.MOBILE).then(data => {
      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          data[i].dateStr = data[i].date.substr(5, 14);
          this.items.push(data[i]);
        }
        console.log('events');
        this.events.publish('tabsPage:loadItems', this.items);
      }
    }).catch(error => {
      console.log(error);
    }).finally(() => {
      loader.dismiss();
    });
  }

}
