import { Component, NgZone } from '@angular/core';
import { NavController, LoadingController, ModalController, ViewController, App } from 'ionic-angular';
import { CommentSvc } from '../../providers/comment-svc';
import { Errors } from '../../providers/errors';
import { Global } from '../../providers/global';
import { InOutBucketsPage } from '../in-out-buckets/in-out-buckets';
import { CommentListPage } from '../comment-list/comment-list';
import { CommentDetailPage } from '../comment-detail/comment-detail';
declare const Swiper: any;
declare var notie: any;
declare var $: any;
import * as moment from 'moment';
import { SearchResultPage } from '../search-result/search-result';
import { LoginPage } from '../login/login';
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
  isShow: boolean = false;
  searchKey: any = "";

  constructor(public navCtrl: NavController, public err: Errors,
    public global: Global, public commentSvc: CommentSvc, public loading: LoadingController,
    public modalCtrl: ModalController, public zone: NgZone, public viewCtrl: ViewController,
    public app: App) {
    if (this.global.IS_LOGGEDIN == false) {
      this.app.getRootNav().setRoot(LoginPage);
    }
  }

  ionViewWillEnter() {
    this.viewCtrl.setBackButtonText('首页');
  }

  ionViewDidLoad() {
    this.getMarketCDatas();
  }

  slideToPro(obj) {
    this.index = this.inBuckets.indexOf(obj);
    this.marketC.slideTo(this.index);
    this.productC.slideTo(this.index, 500, false);
    var divs = $(".marketC .swiper-wrapper .swiper-slide");
    divs.css("color", 'white').css("border-bottom-width", '0px');
    divs.eq(this.index).css("color", "red").css("border-bottom", "2px solid red");
  }

  defaultSlide() {
    if (this.inBuckets.length < (this.index + 1)) {
      this.index = (this.inBuckets.length - 1);
    }

    this.marketC.slideTo(this.index);
    this.productC.slideTo(this.index, 0, false);
    var divs = $(".marketC .swiper-wrapper .swiper-slide");
    divs.css("color", 'white').css("border-bottom-width", '0px');
    divs.eq(this.index).css("color", "red").css("border-bottom", "2px solid red");
  }


  moreBuckets() {
    let modal = this.modalCtrl.create(InOutBucketsPage, {
      inBucketList: this.inBuckets,
      outBucketList: this.outBuckets
    }, {
        showBackdrop: true,
        enableBackdropDismiss: true
      });
    modal.onDidDismiss((data: any) => {
      this.inBuckets = data.list;
      setTimeout(() => {
        this.marketC.destroy(true, false);
        this.productC.destroy(true, false);
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
            divs.css("color", 'white').css("border-bottom-width", '0px');
            divs.eq(index).css("color", "red").css("border-bottom", "2px solid red");
          }
        });
        this.productC.params.control = this.marketC;
        this.defaultSlide();
      }, 500)
    })
    modal.present();
  }

  ionViewDidEnter() {

  }

  getMarketCDatas() {
    this.isShow = false;
    this.selectionData = [];
    this.inBuckets = [];
    this.outBuckets = [];
    if (this.productC != null || this.productC != undefined) {
      this.productC.destroy(true, true);//修改删掉当前选中的市场的时候 后面会多出一个空白页的BUG
    }
    let loading = this.loading.create({});
    loading.present();
    this.commentSvc.getCommentMarkets(this.global.MOBILE).then((data: any) => {
      this.zone.run(() => {
        data.forEach((r: any) => {
          if (r.markets != null && r.markets != undefined && r.markets.length > 0) {
            r.markets.forEach(x => {
              if (x.pinglun != null && x.pinglun != undefined && x.pinglun.length > 0) {
                x.pinglun.forEach(y => {
                  y.date = moment(y.date).format('MM-DD');
                });
              }
            });
          }
          if (r.inBucket == "true") {
            this.inBuckets.push(r);//已关注
          }
          else {
            this.outBuckets.push(r);//未关注
          }
        });
      });
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
          divs.css("color", 'white').css("border-bottom-width", '0px');
          divs.eq(index).css("color", "red").css("border-bottom", "2px solid red");
        }
      });

      this.productC.params.control = this.marketC;
      this.defaultSlide();//加载页面默认显示第一个 更改第一个样式
      this.isShow = true;
    }).catch(err => {
      notie.alert('error', this.err.GET_DATA_FAILED, this.global.NOTIFICATION_DURATION);//err
    }).done(() => {
      loading.dismiss();
    });
  }


  gotoCommentDetail(inbucket, market) {
    this.navCtrl.push(CommentListPage, {
      sName: inbucket.name,
      mName: market.name,
      mId: market.id
    })
  }

  goDetail(p) {
    console.log(p);
    this.navCtrl.push(CommentDetailPage, {
      url: p.url,
      msg: p.title,
      date: p.date
    });
  }

  refreshComment() {
    this.getMarketCDatas();
  }

  onSearch(event){
    this.navCtrl.push(SearchResultPage,{
      searchKey: this.searchKey,
      searchType: "2"//2标识查询评论
    });
  }

}
