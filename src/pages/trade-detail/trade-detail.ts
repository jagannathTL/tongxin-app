import { Component, NgZone,ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { ImagePicker } from 'ionic-native';
import { Global } from '../../providers/global';
import { Errors } from '../../providers/errors';
import { ProfileSvc } from '../../providers/profile-svc';
// import { TradeSvc } from '../../providers/trade-svc';
declare const Swiper: any;
declare var notie: any;

/*s
  Generated class for the TradeDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-trade-detail',
  templateUrl: 'trade-detail.html'
})
export class TradeDetailPage {
  provinces: any = [];
  citys: any = [];
  backTitle: string;
  title: string;
  industryList = [];//所属行业列表数据
  industry = '';//所属行业
  tradePic: any;
  imgs = [];
  provinceName= '';//省份
  cityName = '';//城市
  documentType = 0;//0:供应,1:采购,2:机械设备
  product='';//名称
  quantity='';//数量
  price = '';//价格
  mobile='';//联系方式
  contact='';//联系人
  description='';//简介

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public zone: NgZone, public params: NavParams, public profileSvc: ProfileSvc, public global: Global, public loading: LoadingController, public err: Errors) {
    this.backTitle = params.get('title');
    if(this.backTitle == '供应窗口')
    {
      this.title = '商圈 - 供应';
      this.documentType = 0;
    }
    else if(this.backTitle == '采购窗口')
    {
      this.title = '商圈 - 采购';
      this.documentType = 1;
    }
    else if(this.backTitle == '机械设备')
    {
      this.title = '商圈 - 设备';
      this.documentType = 2;
    }
    this.setIndustryList();
  }

  setIndustryList(){
    if(this.documentType == 2)
    {
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
    else
    {
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

  getAddressData(){
    this.profileSvc.getProvinceList().then((data: any) => {
        data.forEach((p) => {
          this.provinces.push(p);
        })
    }).catch(err => {
      notie.alert('error', this.err.GET_DATA_FAILED, this.global.NOTIFICATION_DURATION);//err
    }).done(() => {

    })
  }

  selectChange(){
    this.citys = [];
    this.profileSvc.getCityByProvince(this.provinceName).then((data: any) => {
       data.forEach((c) => {
         this.citys.push(c);
       });
    })
  }

  ionViewWillEnter() {
    this.viewCtrl.setBackButtonText(this.backTitle);
    this.getAddressData();
  }

  addPics(){
    let options = {
    }
    ImagePicker.getPictures(options).then((results) => {
      this.zone.run(() => {
        for(var i = 0; i < results.length; i++){
          this.imgs.push(results[i]);
        }
        this.convertImg();
      })

      setTimeout(() => {
        if(this.tradePic != null && this.tradePic != undefined){
          this.tradePic.destroy(true,false);
        }
        this.tradePic =  new Swiper('.tradePic', {

        });
    },500)
      console.log(results);
    },err => {
      console.log(err);
    })
  }

  convertImg(){
    this.imgs.forEach(img => {
        var image = document.createElement("img");
        image.src = img;
        var canvas = document.createElement('canvas');
        canvas.getContext('2d').drawImage(image, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        // this.base64Datas.push(dataURL);
        //this.base64DataStr = this.base64DataStr + dataURL + "|||";
    })
  }

  saveTrade(){

  }

}
