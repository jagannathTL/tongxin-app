import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { PriceSvc } from '../../providers/price-svc';
import { Errors } from '../../providers/errors';
import { Global } from '../../providers/global';
declare const Swiper: any;
declare var notie: any;

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
  inBucket: any = [];
  outBucket: any = [];
  selectionData: any = [];
  markets: any = [];
  constructor(public navCtrl: NavController, public err: Errors, public global: Global, public priceSvc: PriceSvc, public loading: LoadingController) {

  }

  ionViewDidLoad() {

    let loading = this.loading.create({});
    loading.present();
    this.priceSvc.getMarkets('13817752189').finally(()=>{
      var market = new Swiper('.market', {

      });
      var product = new Swiper('.product', {

      });
      loading.dismiss();
    }).then((data: any) => {
      // console.log(data);
      data.forEach((r: any) => {
        if(r.inBucket == "true")
        {
          this.inBucket.push({id: r.id, name:r.name});
          this.selectionData.push(r.name);
        }
        else{
          this.outBucket.push({id: r.id, name: r.name});
        }
        if(r.markets != null)
        {
          r.markets.forEach((m: any) => {
            this.markets.push({name: r.name, marketId: m.id, marketName: m.name});
          });
        }
      });
    });
    // var market = new Swiper('.market', {
    //
    // });
    // var product = new Swiper('.product', {
    //
    // });
  }

  ionViewWillEnter(){
    // let loading = this.loading.create({});
    // loading.present();
    // this.priceSvc.getMarkets('13817752189').finally(()=>{
    //   var market = new Swiper('.market', {
    //
    //   });
    //   var product = new Swiper('.product', {
    //
    //   });
    //   loading.dismiss();
    // }).then((data: any) => {
    //   // console.log(data);
    //   data.forEach((r: any) => {
    //     if(r.inBucket == "true")
    //     {
    //       this.inBucket.push({id: r.id, name:r.name});
    //       this.selectionData.push(r.name);
    //     }
    //     else{
    //       this.outBucket.push({id: r.id, name: r.name});
    //     }
    //     if(r.markets != null)
    //     {
    //       r.markets.forEach((m: any) => {
    //         this.markets.push({name: r.name, marketId: m.id, marketName: m.name});
    //       });
    //     }
    //   });
    // });
  }

}
