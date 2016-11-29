import { Component, NgZone } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { ImagePicker } from 'ionic-native';
import { ProfileSvc } from '../../providers/profile-svc';
import { Global } from '../../providers/global';
import { Errors } from '../../providers/errors';
declare const Swiper: any;
declare var notie: any;
/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  provinces: any = [];
  citys: any = [];
  imgs: any = [];
  comPic: any;
  provinceName: any;
  cityName: any;
  addressDesc: any;
  industryDesc: any;
  industry: any;
  product: any;
  tel: any;
  contact: any;
  companyName: any;
  base64Datas: any = [];
  base64DataStr: any = "";
  isOpenMsg: any;

  constructor(public navCtrl: NavController, public zone: NgZone, public profileSvc: ProfileSvc, public global: Global, public loading: LoadingController, public err: Errors) {

  }

  ionViewDidLoad() {
    // console.log('Hello ProfilePage Page');
    this.getUserInfo();
  }

  ionViewWillEnter(){
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
      console.log(this.base64Datas);
      setTimeout(() => {
        if(this.comPic != null && this.comPic != undefined){
          this.comPic.destroy(true,false);
        }
        this.comPic =  new Swiper('.companyP', {

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
        this.base64DataStr = this.base64DataStr + dataURL + "|||";
    })
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
    debugger
    this.citys = [];
    this.profileSvc.getCityByProvince(this.provinceName).then((data: any) => {
       data.forEach((c) => {
         this.citys.push(c);
       });
    })
  }

  getUserInfo()
  {
    let loading = this.loading.create({});
    loading.present();
    this.profileSvc.getUserInfo(this.global.MOBILE).then((data: any) => {
      this.zone.run(() => {
        this.companyName = data.companyName;
        data.companyPics.forEach((img) => {
          var url = this.global.SERVER + img;
          this.imgs.push(url);
        });
        this.contact = data.customerName;
        this.tel = data.tel;
        this.industry = data.industry;
        this.product = data.product;
        this.industryDesc = data.businessDesc;
        this.provinceName = data.province;
        this.cityName = data.city;
        this.addressDesc = data.addressDesc;
        this.isOpenMsg = data.isOpenMsg;
      })

      setTimeout(() => {
        if(this.comPic != null && this.comPic != undefined){
          this.comPic.destroy(true,false);
        }
        this.comPic =  new Swiper('.companyP', {

        });
    },500)
    }).catch((err) => {
      notie.alert('error', this.err.GET_DATA_FAILED, this.global.NOTIFICATION_DURATION);//err
    }).done(() => {
      this.selectChange();
      loading.dismiss();
    })
  }

  subClick(){
    var obj = {
      pics:this.base64DataStr,
      companyName:this.companyName,
      contact:this.contact,
      tel:this.tel,
      industry:this.industry,
      product:this.product,
      industryDesc:this.industryDesc,
      provinceName:this.provinceName,
      cityName:this.cityName,
      addressDesc:this.addressDesc,
      isOpenMsg:this.isOpenMsg
    }
    let loading = this.loading.create({});
    loading.present();
    this.profileSvc.updateUserInfo(this.global.MOBILE, obj).then((data: any) => {
      if(data.result == "ok")
      {
        this.navCtrl.pop();
      }
    }).catch((err) => {
      notie.alert('error', this.err.OPTION_FAILED, this.global.NOTIFICATION_DURATION);//err
    }).done(() => {
      loading.dismiss();
    })
  }
}
