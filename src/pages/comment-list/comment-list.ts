import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { CommentSvc } from '../../providers/comment-svc';
import { Global } from '../../providers/global';
import { CommentDetailPage } from '../comment-detail/comment-detail';
import { Errors } from '../../providers/errors';
declare const notie: any;
/*
  Generated class for the ComDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-comment-list',
  templateUrl: 'comment-list.html'
})
export class CommentListPage {

  titleStr: any;
  marketId: any;
  comList: any = [];
  constructor(public navCtrl: NavController, public param: NavParams, public commentSvc: CommentSvc, public global: Global, public loading: LoadingController, public errors: Errors) {
    var sName = param.get("sName");
    var mName = param.get("mName");
    this.marketId = param.get("mId");
    this.titleStr = sName + "-" + mName;
  }

  ionViewDidLoad() {
    console.log('Hello ComDetailPage Page');
    this.getDetailData();
  }

  goDetail(url){
    this.navCtrl.push(CommentDetailPage,{
      url:url
    });
  }

  getDetailData(){
    let loading = this.loading.create({});
      loading.present();
    this.commentSvc.getCommentDetail(this.global.MOBILE, this.marketId).then((data: any) => {
        data.forEach((c: any) => {
          this.comList.push({avatar:c.avatar, url:c.url, title:c.title, date:c.date, id:c.id, proName:c.productname, isOrder:c.isOrder});
        });
        console.log(this.comList);
    }).catch((err) => {

    }).done(() => {
      loading.dismiss();
    });
  }

  subscribeOrC(pro, slide)
  {
    console.log(pro);
    this.commentSvc.subscribeOrCancel(pro,this.global.MOBILE).then((data: any) => {
      debugger
      if(data.result == "error")
      {
        notie.alert('error', this.errors.SUBSCRIBE_FAILED, this.global.NOTIFICATION_DURATION);
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
      notie.alert('error', this.errors.SUBSCRIBE_FAILED, this.global.NOTIFICATION_DURATION);
    }).done(() => {
      slide.close();
    })
  }

}
