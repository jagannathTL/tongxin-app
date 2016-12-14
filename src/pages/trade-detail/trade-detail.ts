import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { ImagePicker } from 'ionic-native';
import { Global } from '../../providers/global';
import { Errors } from '../../providers/errors';
import { ProfileSvc } from '../../providers/profile-svc';
import { TradeSvc } from '../../providers/trade-svc';
declare const Swiper: any;
declare var notie: any;
declare var $: any;

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
  allTradeImgs: any = [];
  tradeDivPic: any;
  imgNameStr = '';
  productLabelName = '';

  constructor(public tradeSvc: TradeSvc, public navCtrl: NavController, public viewCtrl: ViewController, public zone: NgZone, public params: NavParams, public profileSvc: ProfileSvc, public global: Global, public loading: LoadingController, public err: Errors) {
    this.backTitle = params.get('title');
    if(this.backTitle == '供应窗口')
    {
      this.title = '商圈 - 供应';
      this.documentType = 0;
      this.productLabelName = '供应';
    }
    else if(this.backTitle == '采购窗口')
    {
      this.title = '商圈 - 采购';
      this.documentType = 1;
      this.productLabelName = '采购';
    }
    else if(this.backTitle == '机械设备')
    {
      this.title = '商圈 - 设备';
      this.documentType = 2;
      this.productLabelName = '供应';
    }
    this.setIndustryList();
    this.getAddressData();
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
  }

  removeTradePics(){
    var imgDiv = $(".swiper-slide-active img");
    if(imgDiv != null && imgDiv != undefined && imgDiv.length > 0){
      var src = imgDiv[0].src;
      var index = src.lastIndexOf("/");
      var name = src.substring(index + 1);
      var imgs = this.allTradeImgs.filter((image) => {
        return image.newName == name;
      });
      if(imgs != null && imgs != undefined)
      {
         var isLastIndex = false;
         var index;
        this.zone.run(() => {
          index = this.allTradeImgs.indexOf(imgs[0]);
          if((index + 1) == this.allTradeImgs.length){
            //说明删除的是最后一张
            isLastIndex = true;
          }
          this.allTradeImgs.splice(index,1);
        });
        setTimeout(() => {
          if(this.tradeDivPic != null && this.tradeDivPic != undefined){
            this.tradeDivPic.destroy(true,true);
          }
          this.tradeDivPic =  new Swiper('.companyP', {
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev'
          });
          if(isLastIndex)
          {
              this.tradeDivPic.slideTo(this.allTradeImgs.length - 1,0);//如果删除的最后一张 跳转到删除后的最后一张
          }
          else{
            this.tradeDivPic.slideTo(index,0);//如果删除的不是最后一张 跳转到被删除后的集合index项
          }
      },500)
      }
    }

  }

  addTradePics(){
    let options = {
      maximumImagesCount:1
    };
    ImagePicker.getPictures(options).then((results) => {
      this.zone.run(() => {
        if(results != null && results != undefined && results.length > 0)
        {
          let loading = this.loading.create({});
          loading.present();
        this.profileSvc.uploadImg(results).then((data: any) => {
          if(data.result == "ok"){
            var url = this.global.SERVER + "/upload/" + data.newName;
            this.allTradeImgs.push({url: url, newName: data.newName});
          }else{
            //error
            notie.alert('error', this.err.UPLOADIMG_FAILED,this.global.NOTIFICATION_DURATION);
          }
        }).catch(err => {
          notie.alert('error', this.err.UPLOADIMG_FAILED,this.global.NOTIFICATION_DURATION);
        }).done(() => {
          setTimeout(() => {
            if(this.tradeDivPic != null && this.tradeDivPic != undefined){
              this.tradeDivPic.destroy(true,true);
            }
            this.tradeDivPic =  new Swiper('.tradePic', {
              nextButton: '.swiper-button-next',
              prevButton: '.swiper-button-prev'
            });
            if(this.allTradeImgs != null && this.allTradeImgs != undefined && this.allTradeImgs.length > 0){
              this.tradeDivPic.slideTo(this.allTradeImgs.length - 1);
            }
        },500)
        loading.dismiss();
        });
      }
      })
    },err => {
      console.log(err);
    })
  }

  saveTrade(){
    var errMsg = "";
    if(this.industry == null || this.industry == "" || this.industry == undefined){
      errMsg = "所属行业不能为空！";
    }else if(this.product == null || this.product == "" || this.product == undefined){
      errMsg = "名称不能为空！";
    }else if(this.quantity == null || this.quantity == "" || this.quantity == undefined){
      errMsg = "数量不能为空！";
    }else if(this.price == null || this.price == "" || this.price == undefined){
      errMsg = "价格不能为空！";
    }else if(this.mobile == null || this.mobile == "" || this.mobile == undefined){
      errMsg = "联系方式不能为空！";
    }else if(this.contact == null || this.contact == "" || this.contact == undefined){
      errMsg = "联系人不能为空！";
    }else if(this.provinceName == null || this.provinceName == "" || this.provinceName == undefined || this.cityName == null || this.cityName == "" || this.cityName == undefined){
      errMsg = "交货地不能为空！";
    }

    if(errMsg != ""){
      notie.alert('error', errMsg, this.global.NOTIFICATION_DURATION);//err
      return;
    }

    let loading = this.loading.create({});
    loading.present();
    this.allTradeImgs.forEach((img) => {
      this.imgNameStr = this.imgNameStr + img.newName + "|||";
    })
    let obj={
      pics: this.imgNameStr,
      industry: this.industry,
      product: this.product,
      quantity: this.quantity,
      price: this.price,
      mobile: this.mobile,
      contact: this.contact,
      provinceName: this.provinceName,
      cityName: this.cityName,
      description: this.description,
      documentType:this.documentType
    }
    this.tradeSvc.addTrade(obj).then((data: any) => {
      if(data.result == "ok")
      {
        this.navCtrl.pop();
      }else
      {
        notie.alert('error', this.err.OPTION_FAILED, this.global.NOTIFICATION_DURATION);//err
      }
    }).catch(err => {
      notie.alert('error', this.err.OPTION_FAILED, this.global.NOTIFICATION_DURATION);//err
    }).done(() => {
      loading.dismiss();
    })
  }

}
