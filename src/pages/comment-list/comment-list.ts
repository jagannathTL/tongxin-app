import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CommentSvc } from '../../providers/comment-svc';
import { Global } from '../../providers/global';
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
  constructor(public navCtrl: NavController, public param: NavParams, public commentSvc: CommentSvc, public global: Global) {
    var sName = param.get("sName");
    var mName = param.get("mName");
    this.marketId = param.get("mId");
    this.titleStr = sName + "-" + mName;
  }

  ionViewDidLoad() {
    console.log('Hello ComDetailPage Page');
    this.getDetailData();
  }

  getDetailData(){
    this.commentSvc.getCommentDetail(this.global.MOBILE, this.marketId).then((data: any) => {
        console.log(data);
    });
  }

}
