import { Component, NgZone } from '@angular/core';
import { NavController, ViewController, PopoverController, NavParams, LoadingController } from 'ionic-angular';
import { ProfileSvc } from '../../providers/profile-svc';
import { Global } from '../../providers/global';
import { Errors } from '../../providers/errors';
import { YellowSvc } from '../../providers/yellow-svc';
import { YellowDetailPage } from '../yellow-detail/yellow-detail';
import { TradePage } from '../trade/trade';
declare var notie: any;
/*
  Generated class for the Yellow page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-yellow',
  templateUrl: 'yellow.html'
})
export class YellowPage {

  openList: any = [];
  searchKey: any = "";
  selectedArea: any = "地区";
  selectedIndustry: any = "分类";
  provinces: any = ["全部"];
  searchList: any = [];
  searchID: any = 0;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public popoverCtrl: PopoverController, public profileSvc: ProfileSvc, public global: Global, public err: Errors, public loading: LoadingController, public yellowSvc: YellowSvc, public zone: NgZone) { }

  ionViewDidLoad() {
    this.getProvinces();
    console.log('Hello YellowPage Page');
    this.getOpenList();
    this.searchDataList();
  }

  ionViewWillEnter() {
    this.viewCtrl.setBackButtonText('商圈');
  }

  getProvinces() {
    let loading = this.loading.create({});
    loading.present();
    this.profileSvc.getProvinceList().then((data: any) => {
      data.forEach((p) => {
        this.provinces.push(p);
      })
    }).catch(err => {
      notie.alert('error', this.err.GET_DATA_FAILED, this.global.NOTIFICATION_DURATION);//err
    }).done(() => {
      loading.dismiss();
    })
  }

  getOpenList() {
    let loading = this.loading.create({});
    loading.present();
    this.yellowSvc.getYellowList(this.searchID).then((data: any) => {
      data.forEach((open) => {
        this.openList.push({ id: open.id, companyName: open.companyName, contactTel: open.tel, contactName: open.customerName, industry: open.industry, product: open.product, industryDesc: open.businessDesc, province: open.province, city: open.city, addressDesc: open.addressDesc, companyPics: open.companyPics });
      })
      if (data != undefined && data != null && data.length > 0) {
        this.searchID = data[data.length - 1].id;
      }

    }).catch((err) => {
      notie.alert('error', this.err.GET_DATA_FAILED, this.global.NOTIFICATION_DURATION);//err
    }).done(() => {
      loading.dismiss();
    })
  }

  doInfinite(infiniteScroll) {
    this.yellowSvc.getYellowList(this.searchID).then((data: any) => {
      data.forEach((open) => {
        this.openList.push({ id: open.id, companyName: open.companyName, contactTel: open.tel, contactName: open.customerName, industry: open.industry, product: open.product, industryDesc: open.businessDesc, province: open.province, city: open.city, addressDesc: open.addressDesc, companyPics: open.companyPics });
      })
      if (data != undefined && data != null && data > 0) {
        this.searchID = data[data.length - 1].id;
      }
    }).catch((err) => {
      notie.alert('error', this.err.GET_DATA_FAILED, this.global.NOTIFICATION_DURATION);//err
    }).finally(() => {
      this.zone.run(() => {
        infiniteScroll.complete();
      });
    })
  }

  onSearch(e) {
    this.searchDataList();
  }

  onCancel(e) {
    this.searchKey = "";
    this.searchDataList();
  }

  gotoComDetail(open) {
    this.navCtrl.push(YellowDetailPage, {
      open: open
    })
  }

  searchDataList() {
    this.searchList = this.openList;
    if (this.searchKey != "" && this.searchKey != undefined) {
      this.searchList = this.searchList.filter((open) => {
        return open.companyName.indexOf(this.searchKey) > -1;
      })
    }

    if (this.selectedIndustry != "分类" && this.selectedIndustry != undefined) {
      this.searchList = this.searchList.filter((open) => {
        return open.industry == this.selectedIndustry;
      })
    }

    if (this.selectedArea != "地区" && this.selectedArea != undefined) {
      this.searchList = this.searchList.filter((open) => {
        return open.province == this.selectedArea;
      })
    }
  }

  setArea(area) {
    if (area == "全部") {
      this.selectedArea = "地区";
    }
    else {
      this.selectedArea = area;
    }
    this.searchDataList();
  }

  setIndustry(industry) {
    if (industry == "全部") {
      this.selectedIndustry = "分类";
    } else {
      this.selectedIndustry = industry;
    }
    this.searchDataList();
  }

  showIndustry(myEvent) {
    let popover = this.popoverCtrl.create(IndustryPage, {
      selectedIndustry: this.selectedIndustry,
      listPage: this
    });
    popover.onDidDismiss(() => {
      // document.getElementById('iconArea').removeAttribute('style');
    });
    popover.present({
      ev: myEvent
    });
  }

  showArea(myEvent) {
    console.log(this.provinces);
    let popover = this.popoverCtrl.create(AreaPopoverPage, {
      selectedArea: this.selectedArea,
      listPage: this,
      provinces: this.provinces
    });
    popover.onDidDismiss(() => {

    });
    popover.present({
      ev: myEvent
    });
  }

}

@Component({
  template: `
    <ion-list>
      <button detail-none ion-item *ngFor="let area of areaDatas" (click)="areaSelected(area)">
        <a>{{area}}<ion-icon *ngIf="area == selectedArea" style="float:right;" name="checkmark"></ion-icon></a>
      </button>
    </ion-list>
  `
})
export class AreaPopoverPage {
  areaDatas: any = [];
  selectedArea: string;
  listPage: YellowPage;
  listTradePage: TradePage;
  constructor(public viewCtrl: ViewController, public navParams: NavParams) { }

  ngOnInit() {
    if (this.navParams.data) {
      debugger
      this.areaDatas = this.navParams.data.provinces;
      this.selectedArea = this.navParams.data.selectedArea;
      this.listPage = this.navParams.data.listPage;
      this.listTradePage = this.navParams.data.tradePage;
    }
  }

  close() {
    this.viewCtrl.dismiss();
  }

  areaSelected(area) {
    debugger
    this.selectedArea = area;
    if (this.listPage != null && this.listPage != undefined) {
      this.listPage.setArea(area);
    }
    if (this.listTradePage != null && this.listTradePage != undefined) {
      this.listTradePage.setArea(area);
    }
    this.close();
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
export class IndustryPage {
  industryList: any = [
    "全部",
    "回收型",
    "加工型",
    "冶炼型",
    "贸易型",
    "其他"
  ];
  listPage: YellowPage;
  selectedIndustry: any;
  constructor(public viewCtrl: ViewController, public navParams: NavParams) { }

  ngOnInit() {
    if (this.navParams.data) {
      this.selectedIndustry = this.navParams.data.selectedIndustry;
      this.listPage = this.navParams.data.listPage;
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
}
