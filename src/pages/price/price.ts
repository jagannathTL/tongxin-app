import { Component, ChangeDetectorRef, NgZone } from '@angular/core';
import { NavController, LoadingController, ModalController, ViewController } from 'ionic-angular';
import { PriceSvc } from '../../providers/price-svc';
import { Errors } from '../../providers/errors';
import { Global } from '../../providers/global';
import { InOutBucketsPage } from '../in-out-buckets/in-out-buckets';
import { PriceDetailPage } from '../price-detail/price-detail';
import { SearchResultPage } from '../search-result/search-result';
declare const Swiper: any;
declare var notie: any;
declare var $: any;
/*
  Generated class for the Price page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-price',
  templateUrl: 'price.html'
})
export class PricePage {
  inBuckets: any = [];
  outBuckets: any = [];
  markets: any = [];
  bindMarkets: any = [];
  marketS: any;
  productS: any;
  index: any = 0;
  isShow: boolean = false;
  searchKey: any = "";

  constructor(public navCtrl: NavController, public err: Errors,
    public global: Global, public priceSvc: PriceSvc,
    public loading: LoadingController, public modalCtrl: ModalController,
    public ref: ChangeDetectorRef, public zone: NgZone, public viewCtrl: ViewController) {

  }

  refresh() {
    this.getMarketDatas();
  }

  ionViewWillEnter() {
    this.viewCtrl.setBackButtonText('首页');
  }

  ionViewDidLoad() {
    this.getMarketDatas();
  }

  slideToPro(obj) {
    this.index = this.inBuckets.indexOf(obj);
    var divs = $(".market .swiper-wrapper .swiper-slide");
    divs.css("color", 'white').css("border-bottom-width", '0px');
    divs.eq(this.index).css("color", "red").css("border-bottom", "2px solid red");
    this.marketS.slideTo(this.index);
    this.productS.slideTo(this.index, 500, false);
  }

  defaultSlide() {

    if (this.inBuckets.length < (this.index + 1)) {
     this.index = (this.inBuckets.length - 1);
   }
    this.marketS.slideTo(this.index);
    this.productS.slideTo(this.index, 0, true);

    var divs = $(".market .swiper-wrapper .swiper-slide");
    divs.css("color", 'white').css("border-bottom-width", '0px');
    divs.eq(this.index).css("color", "red").css("border-bottom", "2px solid red");
  }

  moreBuckets() {
    let modal = this.modalCtrl.create(InOutBucketsPage, {
      inBucketList: this.inBuckets,
      outBucketList: this.outBuckets
    });
    modal.onDidDismiss((data: any) => {
      this.inBuckets = data.list;
      setTimeout(() => {
        this.marketS.destroy(true, false);
        this.productS.destroy(true, false);
        this.marketS = new Swiper('.market', {
          spaceBetween: 10,
          centeredSlides: false,
          slidesPerView: 'auto',
          freeMode: true
        });
        this.productS = new Swiper('.product', {
          onSlideChangeStart: (swiper) => {
            var index = swiper.activeIndex;
            this.index = index;
            var divs = $(".market .swiper-wrapper .swiper-slide");
            divs.css("color", 'white').css("border-bottom-width", '0px');
            divs.eq(index).css("color", "red").css("border-bottom", "2px solid red");
          }
        });
      this.productS.params.control = this.marketS;
      this.defaultSlide();
    },500)
    });
    modal.present();
  }

  getMarketDatas() {
    this.isShow = false;
    this.inBuckets = [];
    this.outBuckets = [];
    if (this.productS != null || this.productS != undefined) {
      this.productS.destroy(true, true);//修改删掉当前选中的市场的时候 后面会多出一个空白页的BUG
    }
    let loading = this.loading.create({});
    loading.present();
    this.priceSvc.getMarkets(this.global.MOBILE).then((data: any) => {
      this.zone.run(() => {
        data.forEach((x: any) => {
          x.markets.forEach((m) => {
            this.priceSvc.translate(m);
          })
          if (x.inBucket == "true") {
            this.inBuckets.push(x);//已关注
          }
          else {
            this.outBuckets.push(x);//未关注
          }
        });
      });
      this.marketS = new Swiper('.market', {
        spaceBetween: 10,
        centeredSlides: false,
        slidesPerView: 'auto',
        freeMode: true
      });
      this.productS = new Swiper('.product', {
        onSlideChangeStart: (swiper) => {
          var index = swiper.activeIndex;
          this.index = index;
          var divs = $(".market .swiper-wrapper .swiper-slide");
          divs.css("color", 'white').css("border-bottom-width", '0px');
          divs.eq(index).css("color", "red").css("border-bottom", "2px solid red");
        }
      });
      this.isShow = true;
      this.productS.params.control = this.marketS;
      this.defaultSlide();//加载页面默认显示第一个 更改第一个样式
    }).catch(err => {
      console.log(err);
      notie.alert('error', this.err.GET_DATA_FAILED, this.global.NOTIFICATION_DURATION);
    }).done(() => {
      loading.dismiss();
    });
  }


  gotoPriceDetail(market, s) {
    this.navCtrl.push(PriceDetailPage, {
      market: market,
      type: s
    });
  }

  onSearch(event){
    this.navCtrl.push(SearchResultPage,{
      searchKey: this.searchKey,
      searchType: "1"//查询标识 1标识是价格查询
    });
  }

}
