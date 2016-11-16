import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
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

  items = [];

  constructor(public navCtrl: NavController, public inboxSvc: InboxSvc,
    public global: Global, public errors: Errors, public loadingCtrl: LoadingController) {
      let load = this.loadingCtrl.create();
      load.present();
    inboxSvc.loadItems('13524259846').then(data => {
      for(let i = 0;i<data.length;i++)
      {
        data[i].date = data[i].date.substr(5,14);
      }
      this.items = data;
    }).catch(error => {
      notie.alert('error', this.errors.GET_INBOX_FAILED, this.global.NOTIFICATION_DURATION);
    }).done(() => {
      load.dismiss();
    });
  }

  doInfinite(infiniteScroll) {

  }

}
