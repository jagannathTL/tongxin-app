import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController } from 'ionic-angular';
import { CommentSvc } from '../../providers/comment-svc';
import { Errors } from '../../providers/errors';
import { Global } from '../../providers/global';
import { InOutBucketsPage } from '../in-out-buckets/in-out-buckets';
import { CommentListPage } from '../comment-list/comment-list';
declare const Swiper: any;
declare var notie: any;
declare var $: any;

/*
  Generated class for the Comment page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html'
})
export class CommentPage {

  inBuckets: any = [];
  outBuckets: any = [];
  selectionData: any = [];
  markets: any = [];
  bindMarkets: any = [];
  marketC: any;
  productC: any;
  index: any = 0;

  constructor(public navCtrl: NavController, public err: Errors, public global: Global, public commentSvc: CommentSvc, public loading: LoadingController, public modalCtrl: ModalController) {

  }

  ionViewDidLoad() {
    this.getMarketCDatas();
  }

  slideToPro(obj) {
    this.index = this.inBuckets.indexOf(obj);
    this.marketC.slideTo(this.index);
    this.productC.slideTo(this.index, 500, false);
    var divs = $(".marketC .swiper-wrapper .swiper-slide");
    divs.css("color", 'black').css("border-bottom-width", '0px');
    divs.eq(this.index).css("color", "red").css("border-bottom", "2px solid red");
  }

  defaultSlide(){
    this.marketC.slideTo(0);
    this.productC.slideTo(0, 0, true);
    var divs = $(".marketC .swiper-wrapper .swiper-slide");
    divs.css("color", 'black').css("border-bottom-width", '0px');
    divs.eq(0).css("color", "red").css("border-bottom", "2px solid red");
  }


  moreBuckets(){
    let modal = this.modalCtrl.create(InOutBucketsPage, {
      inBucketList: this.inBuckets,
      outBucketList: this.outBuckets
    },{
      showBackdrop:true,
      enableBackdropDismiss:true
    });
    modal.onDidDismiss((data: any) => {
      this.inBuckets = data.list;
      setTimeout(() => {
        this.marketC.destroy(true, false);
        this.productC.destroy(true, false);
        this.marketC = new Swiper('.market', {
          spaceBetween: 10,
          centeredSlides: false,
          slidesPerView: 'auto',
          freeMode: true
        });
        this.productC = new Swiper('.product', {
          onSlideChangeStart: (swiper) => {
            var index = swiper.activeIndex;
            this.index = index;
            var divs = $(".market .swiper-wrapper .swiper-slide");
            divs.css("color", 'black').css("border-bottom-width", '0px');
            divs.eq(index).css("color", "red").css("border-bottom", "2px solid red");
          }
        });
      this.defaultSlide();
    },500)
    })
    modal.present();
  }

  ionViewDidEnter() {

  }

  getMarketCDatas()
  {
    this.selectionData = [];
    this.inBuckets = [];
    this.outBuckets = [];
    if(this.productC != null || this.productC != undefined){
      this.productC.destroy(true,true);//修改删掉当前选中的市场的时候 后面会多出一个空白页的BUG
    }
    let loading = this.loading.create({});
    loading.present();
    this.commentSvc.getCommentMarkets(this.global.MOBILE, this.inBuckets, this.outBuckets).then((data: any) => {
      this.marketC = new Swiper('.marketC', {
        spaceBetween: 10,
        centeredSlides: false,
        slidesPerView: 'auto',
        freeMode: true
      });
      this.productC = new Swiper('.productC', {
        onSlideChangeStart: (swiper) => {
          var index = swiper.activeIndex;
          this.index = index;
          var divs = $(".marketC .swiper-wrapper .swiper-slide");
          divs.css("color", 'black').css("border-bottom-width", '0px');
          divs.eq(index).css("color", "red").css("border-bottom", "2px solid red");
        }
      });

      this.productC.params.control = this.marketC;
      this.defaultSlide();//加载页面默认显示第一个 更改第一个样式
      // loading.dismiss();
    }).catch(err => {
      notie.alert('error', err, this.global.NOTIFICATION_DURATION);//err
    }).done(() => {
      loading.dismiss();
    });
  }


  gotoCommentDetail(inbucket,market){
    this.navCtrl.push(CommentListPage,{
      sName: inbucket.name,
      mName: market.name,
      mId: market.id
    })
  }

}
