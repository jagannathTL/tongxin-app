import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController } from 'ionic-angular';
import { PriceSvc } from '../../providers/price-svc';
import { Errors } from '../../providers/errors';
import { Global } from '../../providers/global';
import { InOutBucketsPage } from '../in-out-buckets/in-out-buckets';
import { PriceDetailPage } from '../price-detail/price-detail';
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
  selectionData: any = [];
  markets: any = [];
  bindMarkets: any = [];
  marketS: any;
  productS: any;
  constructor(public navCtrl: NavController, public err: Errors, public global: Global, public priceSvc: PriceSvc, public loading: LoadingController, public modalCtrl: ModalController) {

  }

  ionViewDidLoad() {

  }

  slideChange(swiper) {
    var index = swiper.activeIndex;
    var divs = $(".market .swiper-wrapper .swiper-slide");
    divs.css("color", 'black').css("border-bottom-width", '0px');
    divs.eq(index).css("color", "red").css("border-bottom", "2px solid red");
  }

  slideToPro(index) {
    this.marketS.slideTo(index);
    this.productS.slideTo(index, 500, true);
    var divs = $(".market .swiper-wrapper .swiper-slide");
    divs.css("color", 'black').css("border-bottom-width", '0px');
    divs.eq(index).css("color", "red").css("border-bottom", "2px solid red");
  }

  defaultSlide(){
    var index = this.selectionData.length - 1;
    //slide(0)不能正常跳转 所以先跳转到其他slide然后在slide(0)
    this.marketS.slideTo(index);
    this.productS.slideTo(index, 500, true);
    this.marketS.slideTo(0);
    this.productS.slideTo(0, 500, true);
    var divs = $(".market .swiper-wrapper .swiper-slide");
    divs.css("color", 'black').css("border-bottom-width", '0px');
    divs.eq(0).css("color", "red").css("border-bottom", "2px solid red");
  }


  moreBuckets(){
    this.navCtrl.push(InOutBucketsPage, {
      inBucketList: this.inBuckets,
      outBucketList: this.outBuckets
    });
  }

  ionViewDidEnter() {
    this.selectionData = [];
    this.inBuckets = [];
    this.outBuckets = [];
    let loading = this.loading.create({});
    loading.present();
    this.priceSvc.getMarkets(this.global.MOBILE, this.selectionData,this.inBuckets,this.outBuckets).then((data: any) => {
      this.marketS = new Swiper('.market', {
        spaceBetween: 10,
        centeredSlides: false,
        slidesPerView: 'auto',
        freeMode: true
      });
      this.productS = new Swiper('.product', {
        onSlideChangeStart: this.slideChange
      });

      this.productS.params.control = this.marketS;
      this.defaultSlide();//加载页面默认显示第一个 更改第一个样式
      loading.dismiss();
    });
  }

  gotoPriceDetail(market){
    this.navCtrl.push(PriceDetailPage, {
      market: market
    });
  }

}
