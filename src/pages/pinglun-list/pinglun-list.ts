import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController} from 'ionic-angular';
import { Global } from '../../providers/global';
import { Errors } from '../../providers/errors';
import { PinglunSvc } from '../../providers/pinglun-svc';
import { CommentSvc } from '../../providers/comment-svc';
import { CommentDetailPage } from '../comment-detail/comment-detail';
declare var notie: any;
/*
  Generated class for the PinglunList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-pinglun-list',
  templateUrl: 'pinglun-list.html'
})
export class PinglunListPage {

  marketId = 1;
  title = '';
  pinglunList = [];
  constructor(public navCtrl: NavController, public params: NavParams, public global: Global, public loading: LoadingController, public err: Errors, public pinglunSvc: PinglunSvc, public commentSvc: CommentSvc) {
    this.marketId = params.get('marketId');
    if(this.marketId == 1276)
    {
      this.title = '项目招标';
    }
    else if(this.marketId == 1277)
    {
      this.title = '物资处置';
    }
    this.getPinglunList();
  }

  getPinglunList(){
    let loading = this.loading.create({});
    loading.present();
    this.pinglunSvc.getPinglunList(this.marketId).then((data: any) => {
      this.pinglunList = data;
    }).catch(err => {
      notie.alert('error', this.err.GET_DATA_FAILED, this.global.NOTIFICATION_DURATION);
    }).done(() => {
      loading.dismiss();
    })
  }

  gotoPinglun(url)
  {
    this.navCtrl.push(CommentDetailPage,{
      url:url
    });
  }

  subscribeOrC(pro, isOrder, slide)
  {
    this.commentSvc.subscribeOrCancel(pro.id, isOrder, this.global.MOBILE).then((data: any) => {
      if(data.result == "error")
      {
        if(pro.isOrder == "NO")
        {
          notie.alert('error', this.err.SUBSCRIBE_FAILED, this.global.NOTIFICATION_DURATION);
        }
        else
        {
          notie.alert('error', this.err.UNSUBSCRIBE_FAILED, this.global.NOTIFICATION_DURATION);
        }
      }
      else{
        if(pro.isOrder == 'NO')
        {
          pro.isOrder = 'YES';
        }
        else{
          pro.isOrder = 'NO';
        }
      }
    }).catch((err) => {
      notie.alert('error', this.err.OPTION_FAILED, this.global.NOTIFICATION_DURATION);
    }).done(() => {
      slide.close();
    })
  }

}
