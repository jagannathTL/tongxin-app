import { Component } from '@angular/core';
import { NavController, LoadingController, ModalController } from 'ionic-angular';
import { PriceSvc } from '../../providers/price-svc';
import { Errors } from '../../providers/errors';
import { Global } from '../../providers/global';
<<<<<<< HEAD
import { InOutBucketsPage } from '../in-out-buckets/in-out-buckets';
=======
import { PriceDetailPage } from '../price-detail/price-detail';
>>>>>>> origin/master
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
    console.log(this.selectionData);
    // console.log(this.productS);
    this.marketS.slideTo(index);
    this.productS.slideTo(index, 500, false);
    var divs = $(".market .swiper-wrapper .swiper-slide");
    divs.css("color", 'black').css("border-bottom-width", '0px');
    divs.eq(index).css("color", "red").css("border-bottom", "2px solid red");
  }

  moreBuckets(){
    this.navCtrl.push(InOutBucketsPage, {
      inBucketList: this.inBuckets,
      outBucketList: this.outBuckets
    });
  }

  ionViewDidEnter() {
    console.log('didenter');
    // console.log(this.inBuckets);
    this.selectionData = [];
    this.inBuckets = [];
    this.outBuckets = [];
    // this.marketS
    let loading = this.loading.create({});
    loading.present();
    this.priceSvc.getMarkets(this.global.MOBILE, this.selectionData,this.inBuckets,this.outBuckets).then((data: any) => {
      this.marketS = new Swiper('.market', {
        spaceBetween: 10,
        centeredSlides: false,
        slidesPerView: 'auto',
        freeMode: true
        // touchRatio: 0.2
      });
      this.productS = new Swiper('.product', {
        onSlideChangeStart: this.slideChange
      });

      this.productS.params.control = this.marketS;
      this.slideToPro(0);//加载页面默认显示第一个 更改第一个样式
      loading.dismiss();
    });
  }

  gotoPriceDetail(market){
    console.log(market);
    this.navCtrl.push(PriceDetailPage, {
      market: market
    });
  }

}
