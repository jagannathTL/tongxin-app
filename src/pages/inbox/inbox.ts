import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InboxSvc } from '../../providers/inbox-svc';
import { Global } from '../../providers/global';
import { Errors } from '../../providers/errors';
declare const notie: any;

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

  items = [{msg: 'eeeee'}, {msg: 'hrllo'}];

  constructor(public navCtrl: NavController, public inboxSvc: InboxSvc, public global: Global, public errors: Errors) {
    inboxSvc.loadItems('15802161396').then(data => {
      this.items = data;
      console.log(this.items);
    }).catch(error => {
      notie.alert('error', this.errors.GET_INBOX_FAILED, this.global.NOTIFICATION_DURATION);
    });
  }

  doInfinite(infiniteScroll) {

  }

}
