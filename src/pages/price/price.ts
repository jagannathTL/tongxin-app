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
  index: any = 0;

  constructor(public navCtrl: NavController, public err: Errors, public global: Global, public priceSvc: PriceSvc, public loading: LoadingController, public modalCtrl: ModalController) {

  }

  ionViewDidLoad() {
    this.getMarketDatas();
  }

  // slideChange(swiper) {
  //   debugger
  //   var index = swiper.activeIndex;
  //   this.index = index;
  //   var divs = $(".market .swiper-wrapper .swiper-slide");
  //   divs.css("color", 'black').css("border-bottom-width", '0px');
  //   divs.eq(index).css("color", "red").css("border-bottom", "2px solid red");
  // }

  slideToPro(index) {
    this.index = index;
    this.marketS.slideTo(index);
    this.productS.slideTo(index, 500, false);
    var divs = $(".market .swiper-wrapper .swiper-slide");
    divs.css("color", 'black').css("border-bottom-width", '0px');
    divs.eq(index).css("color", "red").css("border-bottom", "2px solid red");
  }

  defaultSlide(){
    if(this.selectionData.length < (this.index + 1))
    {
      this.index = (this.selectionData.length - 1);
    }
    this.marketS.slideTo(this.index);
    this.productS.slideTo(this.index, 500, true);
    var divs = $(".market .swiper-wrapper .swiper-slide");
    divs.css("color", 'black').css("border-bottom-width", '0px');
    divs.eq(this.index).css("color", "red").css("border-bottom", "2px solid red");
  }


  moreBuckets(){
    // this.navCtrl.push(InOutBucketsPage, {
    //   inBucketList: this.inBuckets,
    //   outBucketList: this.outBuckets
    // });

    let modal = this.modalCtrl.create(InOutBucketsPage, {
      inBucketList: this.inBuckets,
      outBucketList: this.outBuckets
    },{
      showBackdrop:true,
      enableBackdropDismiss:true
    });
    modal.onDidDismiss(() => {
      this.getMarketDatas();
    })
    modal.present();
  }

  ionViewDidEnter() {

  }

  getMarketDatas()
  {
    this.selectionData = [];
    this.inBuckets = [];
    this.outBuckets = [];
    if(this.productS != null || this.productS != undefined){
      this.productS.destroy(true,true);//修改删掉当前选中的市场的时候 后面会多出一个空白页的BUG
    }
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
        // onSlideChangeStart: this.slideChange
        onSlideChangeStart: (swiper) => {
          var index = swiper.activeIndex;
          this.index = index;
          var divs = $(".market .swiper-wrapper .swiper-slide");
          divs.css("color", 'black').css("border-bottom-width", '0px');
          divs.eq(index).css("color", "red").css("border-bottom", "2px solid red");
        }
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
