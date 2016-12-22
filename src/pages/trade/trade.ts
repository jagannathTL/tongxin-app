import { Component } from '@angular/core';
import { NavController, ViewController, PopoverController, NavParams, LoadingController  } from 'ionic-angular';
import { TradeDetailPage } from '../trade-detail/trade-detail';
import { AreaPopoverPage } from '../yellow/yellow';
import { ProfileSvc } from '../../providers/profile-svc';
import { Global } from '../../providers/global';
import { Errors } from '../../providers/errors';
import { TradeSvc } from '../../providers/trade-svc';
import { TradeViewPage } from '../trade-view/trade-view';
declare var notie: any;
import * as Promise from 'promise';

/*
  Generated class for the Trade page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-trade',
  templateUrl: 'trade.html'
})
export class TradePage {

  title = '';
  searchKey: any = "";
  selectedArea: any = "地区";
  selectedIndustry: any = "分类";
  provinces: any = ["全部"];
  documentType: any;
  tradeList: any = [];
  searchList: any = [];
  tradeID: any = 0;
  productLabelName = '';
  back = '商圈';

  constructor(public tradeSvc: TradeSvc, public err: Errors, public global: Global, public profileSvc: ProfileSvc, public navCtrl: NavController, public viewCtrl: ViewController, public params: NavParams, public popoverCtrl: PopoverController, public loading: LoadingController) {
    this.documentType = this.params.get('documentType');
    this.back = this.params.get('back');
    this.title = this.params.get('title');
    if (this.documentType == 1) {
      this.productLabelName = '采购';
    }
    else {
      this.productLabelName = '供应';
    }

  }

  ionViewDidEnter() {

    let load = this.loading.create({});
    load.present();
    this.getTradeDataList();
    this.getProvinces();
    
    Promise.all([this.getProvinces(), this.getTradeDataList()]).then((data) => {
    }).catch(err => {
      notie.alert('error', this.err.GET_DATA_FAILED, this.global.NOTIFICATION_DURATION);//err
    }).done(() => {
      this.searchTradeList();
      load.dismiss();
    })
  }

  gotoDetail(trade) {
    this.navCtrl.push(TradeViewPage, {
      trade: trade,
      title: this.title
    })
  }

  getProvinces() {
    return this.profileSvc.getProvinceList().then((data: any) => {
      data.forEach((p) => {
        this.provinces.push(p);
      })
    })
  }

  getTradeDataList() {
    return this.tradeSvc.getTradeList(this.tradeID, this.documentType, this.searchKey, this.selectedArea, this.selectedIndustry, "DOWN").then((data: any) => {
      data.forEach((trade) => {
        var firstImg = '';
        if (trade.pics1 != null && trade.pics1 != undefined && trade.pics1.length > 0) {
          firstImg = this.global.SERVER + '/upload/' + trade.pics1[0];
        }
        this.tradeList.push({ price: trade.price, quantity: trade.quantity, business: trade.buissnes, product: trade.product, province: trade.province, city: trade.city, contact: trade.contact, date: trade.date, pics: trade.pics, firstImg: firstImg });
      })
    })
  }

  doRefresh(e) {
    if (this.tradeList != null && this.tradeList != undefined && this.tradeList.lenght > 0) {
      this.tradeID = this.tradeList[0];
    }
    this.tradeSvc.getTradeList(this.tradeID, this.documentType, this.searchKey, this.selectedArea, this.selectedIndustry, "DOWN").then((data: any) => {
      data.forEach((trade) => {
        var firstImg = '';
        if (trade.pics1 != null && trade.pics1 != undefined && trade.pics1.length > 0) {
          firstImg = this.global.SERVER + '/upload/' + trade.pics1[0];
        }
        this.tradeList.push({ price: trade.price, quantity: trade.quantity, business: trade.business, product: trade.product, province: trade.province, city: trade.city, contact: trade.contact, date: trade.date, pics: trade.pics, firstImg: firstImg });
      })
    }).catch(err => {
      notie.alert('error', this.err.GET_DATA_FAILED, this.global.NOTIFICATION_DURATION);//err
    }).finally(() => {
      e.complete();
    })
  }

  doInfinite(e) {
    if (this.tradeList != null && this.tradeList != undefined && this.tradeList.lenght > 0) {
      this.tradeID = this.tradeList[this.tradeList.lenght - 1];
    }
    this.tradeSvc.getTradeList(this.tradeID, this.documentType, this.searchKey, this.selectedArea, this.selectedIndustry, "UP").then((data: any) => {
      data.forEach((trade) => {
        var firstImg = '';
        if (trade.pics1 != null && trade.pics1 != undefined && trade.pics1.length > 0) {
          firstImg = this.global.SERVER + '/upload/' + trade.pics1[0];
        }
        this.tradeList.push({ price: trade.price, quantity: trade.quantity, business: trade.business, product: trade.product, province: trade.province, city: trade.city, contact: trade.contact, date: trade.date, pics: trade.pics, firstImg: firstImg });
      })
    }).catch(err => {
      notie.alert('error', this.err.GET_DATA_FAILED, this.global.NOTIFICATION_DURATION);//err
    }).finally(() => {
      e.complete();
    })
  }

  ionViewDidLoad() {

  }

  ionViewWillEnter() {
    this.viewCtrl.setBackButtonText(this.back);
  }

  addTrade() {
    this.navCtrl.push(TradeDetailPage, {
      title: this.title
    });
  }

  searchTradeList() {
    this.searchList = this.tradeList;
    if (this.searchKey != "" && this.searchKey != undefined) {
      this.searchList = this.searchList.filter((open) => {
        return open.product.indexOf(this.searchKey) > -1;
      })
    }

    if (this.selectedIndustry != "分类" && this.selectedIndustry != undefined) {
      this.searchList = this.searchList.filter((open) => {
        return open.business == this.selectedIndustry;
      })
    }

    if (this.selectedArea != "地区" && this.selectedArea != undefined) {
      this.searchList = this.searchList.filter((open) => {
        return open.province == this.selectedArea;
      })
    }
  }

  onSearch(e) {
    this.searchTradeList();
  }

  onCancel(e) {
    this.searchKey = "";
    this.searchTradeList();
  }

  showIndustry(myEvent) {
    let popover = this.popoverCtrl.create(IndustryTradePage, {
      selectedIndustry: this.selectedIndustry,
      listPage: this,
      documentType: this.documentType
    });
    popover.onDidDismiss(() => {
      // document.getElementById('iconArea').removeAttribute('style');
    });
    popover.present({
      ev: myEvent
    });
  }

  showArea(myEvent) {
    let popover = this.popoverCtrl.create(AreaPopoverPage, {
      selectedArea: this.selectedArea,
      tradePage: this,
      provinces: this.provinces
    });
    popover.onDidDismiss(() => {

    });
    popover.present({
      ev: myEvent
    });
  }

  setArea(area) {
    if (area == "全部") {
      this.selectedArea = "地区";
    }
    else {
      this.selectedArea = area;
    }
    this.searchTradeList();
  }

  setIndustry(industry) {
    if (industry == "全部") {
      this.selectedIndustry = "分类";
    } else {
      this.selectedIndustry = industry;
    }
    this.searchTradeList();
  }
}

@Component({
  template: `
    <ion-list>
      <button detail-none ion-item *ngFor="let industry of industryList" (click)="industrySelected(industry)">
        <a>{{industry}}<ion-icon *ngIf="industry == selectedIndustry" style="float:right;" name="checkmark"></ion-icon></a>
      </button>
    </ion-list>
  `
})
export class IndustryTradePage {
  industryList: any = [];
  listPage: TradePage;
  selectedIndustry: any;
  documentType: any;

  constructor(public viewCtrl: ViewController, public navParams: NavParams) { }

  ngOnInit() {
    if (this.navParams.data) {
      this.selectedIndustry = this.navParams.data.selectedIndustry;
      this.listPage = this.navParams.data.listPage;
      this.documentType = this.navParams.data.documentType;
      this.setIndustryList();
    }
  }

  close() {
    this.viewCtrl.dismiss();
  }

  industrySelected(industry) {
    this.selectedIndustry = industry;
    this.listPage.setIndustry(industry);
    this.close();
  }

  setIndustryList() {
    if (this.documentType == 2) {
      this.industryList.push('全部');
      this.industryList.push('抓刚机');
      this.industryList.push('粉碎机');
      this.industryList.push('打包机');
      this.industryList.push('剪切机');
      this.industryList.push('地磅');
      this.industryList.push('航车');
      this.industryList.push('铜米机');
      this.industryList.push('剥线机');
      this.industryList.push('锅炉');
      this.industryList.push('吸盘');
      this.industryList.push('车船');
    }
    else {
      this.industryList.push('全部');
      this.industryList.push('基本金属');
      this.industryList.push('废旧金属');
      this.industryList.push('废旧钢铁');
      this.industryList.push('建筑钢材');
      this.industryList.push('贵金属');
      this.industryList.push('小金属');
      this.industryList.push('钢坯');
      this.industryList.push('热轧板');
      this.industryList.push('冷轧板');
      this.industryList.push('再生塑料');
      this.industryList.push('废纸');
    }
  }
}
