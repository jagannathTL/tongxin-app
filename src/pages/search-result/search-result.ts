import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { SearchSvc } from '../../providers/search-svc';
import { Global } from '../../providers/global';
import { PriceSvc } from '../../providers/price-svc';
import { Errors } from '../../providers/errors';
import { CommentSvc } from '../../providers/comment-svc';
import { CommentDetailPage } from '../comment-detail/comment-detail';
declare const notie: any;
import * as _ from 'lodash';

/*
  Generated class for the SearchResult page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-search-result',
  templateUrl: 'search-result.html'
})
export class SearchResultPage {

  searchKey: any = "";
  prices: any = [];
  comments: any = [];
  searchTitle: any = "";
  searchType: any = "";

  constructor(public commentSvc: CommentSvc, public priceSvc: PriceSvc, public errors: Errors, public navCtrl: NavController, public navParams: NavParams, public searchSvc: SearchSvc, public global: Global, public loading: LoadingController) {
    this.searchKey = navParams.get('searchKey');
    this.searchType = navParams.get('searchType');
  }

  ionViewDidEnter() {
    if (this.searchType == "1") {
      this.comments = [];
      this.searchTitle = "查询价格";
      this.getData();
    }
    else {
      this.prices = [];
      this.searchTitle = "评论查询";
      this.getPLData();
    }
  }

  gotoComDetail(url) {
    this.navCtrl.push(CommentDetailPage, {
      url: url
    });
  }

  getPLData() {
    let loading = this.loading.create({});
    loading.present();
    this.searchSvc.getPLSearchData(this.global.MOBILE, this.searchKey).then((data: any) => {
      if (data != null && data != undefined && data.length > 0) {
        this.comments = _.concat(data);
      }
    }).catch((err) => {
      notie.alert('error', this.errors.GET_DATA_FAILED, this.global.NOTIFICATION_DURATION);
    }).done(() => {
      loading.dismiss();
    })
  }

  getData() {
    let loading = this.loading.create({});
    loading.present();
    this.searchSvc.getSearchResult(this.global.MOBILE, this.searchKey).then((data: any) => {
      if (data != null && data != undefined) {
        data.forEach((d) => {
          var products = [];
          d.products.forEach((p) => {
            products.push({ change: p.Change, pName: p.ProductName, pId: p.ProductId, priceStr: p.LPrice + "-" + p.HPrice, date: p.Date, Comment: p.Comment });
          })
          this.prices.push({ name: d.name, id: d.id, products: products });
        })
      }
    }).catch((err) => {
      notie.alert('error', this.errors.GET_DATA_FAILED, this.global.NOTIFICATION_DURATION);
    }).done(() => {
      loading.dismiss();
    })
  }

  subscribe(product, slidingItem) {
    console.log(product);
    this.priceSvc.subscribe(product.ProductId, this.global.MOBILE).then(data => {
      if (data.result == 'error') {
        notie.alert('error', this.errors.SUBSCRIBE_FAILED, this.global.NOTIFICATION_DURATION);
      } else {
        product.isOrder = 'YES';
      }
    }).catch(err => {
      console.log(err);
      notie.alert('error', this.errors.SUBSCRIBE_FAILED, this.global.NOTIFICATION_DURATION);
    }).done(() => {
      slidingItem.close();
    });
  }

  unsubscribe(product, slidingItem) {
    this.priceSvc.unsubscribe(product.ProductId, this.global.MOBILE).then(data => {
      if (data.result == 'error') {
        notie.alert('error', this.errors.UNSUBSCRIBE_FAILED, this.global.NOTIFICATION_DURATION);
      } else {
        product.isOrder = 'NO';
      }
    }).catch(err => {
      console.log(err);
      notie.alert('error', this.errors.UNSUBSCRIBE_FAILED, this.global.NOTIFICATION_DURATION);
    }).done(() => {
      slidingItem.close();
    });
  }

  subscribeOrC(pro, isOrder, slide) {
    this.commentSvc.subscribeOrCancel(pro.id, isOrder, this.global.MOBILE).then((data: any) => {
      if (data.result == "error") {
        if (pro.isOrder == "NO") {
          notie.alert('error', this.errors.SUBSCRIBE_FAILED, this.global.NOTIFICATION_DURATION);
        }
        else {
          notie.alert('error', this.errors.UNSUBSCRIBE_FAILED, this.global.NOTIFICATION_DURATION);
        }
      }
      else {
        if (pro.isOrder == 'NO') {
          pro.isOrder = 'YES';
        }
        else {
          pro.isOrder = 'NO';
        }
      }
    }).catch((err) => {
      console.log('er');
      console.log(err);
      notie.alert('error', this.errors.OPTION_FAILED, this.global.NOTIFICATION_DURATION);
    }).done(() => {
      slide.close();
    })
  }

}
