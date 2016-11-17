import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CommentPage } from '../comment/comment';
import { FuturesPage } from '../futures/futures';
import { InboxPage } from '../inbox/inbox';
import { PricePage } from '../price/price';
import { CirclePage } from '../circle/circle';

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

  constructor(public navCtrl: NavController) {
    this.inbox = InboxPage;
    this.price = PricePage;
    this.comment = CommentPage;
    this.circle = CirclePage;
    this.futures = FuturesPage;
  }

  loadItems(){
    //把加载的数据传到inbox的items参数里面
  }

}
