import { Component, NgZone } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { ImagePicker } from 'ionic-native';
import { ProfileSvc } from '../../providers/profile-svc';
import { Global } from '../../providers/global';
import { Errors } from '../../providers/errors';
declare const Swiper: any;
declare var notie: any;
declare var $: any;
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
  allImgs: any = [];
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
  imgNameStr: any = "";
  isOpenMsg: any;

  constructor(public navCtrl: NavController, public zone: NgZone, public profileSvc: ProfileSvc, public global: Global, public loading: LoadingController, public err: Errors) {

  }

  ionViewDidLoad() {
    this.getUserInfo();
  }

  ionViewWillEnter(){
    this.getAddressData();
  }

  removePics(){
    var imgDiv = $(".swiper-slide-active img");
    if(imgDiv != null && imgDiv != undefined && imgDiv.length > 0){
      var src = imgDiv[0].src;
      var index = src.lastIndexOf("/");
      var name = src.substring(index + 1);
      var imgs = this.allImgs.filter((image) => {
        return image.newName == name;
      });
      if(imgs != null && imgs != undefined)
      {
         var isLastIndex = false;
         var index;
        this.zone.run(() => {
          index = this.allImgs.indexOf(imgs[0]);
          if((index + 1) == this.allImgs.length){
            //说明删除的是最后一张
            isLastIndex = true;
          }
          this.allImgs.splice(index,1);
        });
        setTimeout(() => {
          if(this.comPic != null && this.comPic != undefined){
            this.comPic.destroy(true,true);
          }
          this.comPic =  new Swiper('.companyP', {
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev'
          });
          if(isLastIndex)
          {
              this.comPic.slideTo(this.allImgs.length - 1,0);//如果删除的最后一张 跳转到删除后的最后一张
          }
          else{
            this.comPic.slideTo(index,0);//如果删除的不是最后一张 跳转到被删除后的集合index项
          }
      },500)
      }
    }

  }

  addPics(){
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
            this.allImgs.push({url: url, newName: data.newName});
          }else{
            //error
            notie.alert('error', this.err.UPLOADIMG_FAILED,this.global.NOTIFICATION_DURATION);
          }
        }).catch(err => {
          notie.alert('error', this.err.UPLOADIMG_FAILED,this.global.NOTIFICATION_DURATION);
        }).done(() => {
          setTimeout(() => {
            if(this.comPic != null && this.comPic != undefined){
              this.comPic.destroy(true,true);
            }
            this.comPic =  new Swiper('.companyP', {
              nextButton: '.swiper-button-next',
              prevButton: '.swiper-button-prev'
            });
            if(this.allImgs != null && this.allImgs != undefined && this.allImgs.length > 0){
              this.comPic.slideTo(this.allImgs.length - 1);
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

  getUserInfo()
  {
    let loading = this.loading.create({});
    loading.present();
    this.profileSvc.getUserInfo(this.global.MOBILE).then((data: any) => {
      this.zone.run(() => {
        this.companyName = data.companyName;
        data.companyPics.forEach((img) => {
          var url = this.global.SERVER + "/upload/" + img;
          this.allImgs.push({url:url, newName:img});
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
          this.comPic.destroy(true,true);
        }
        this.comPic =  new Swiper('.companyP', {
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev'
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
    this.allImgs.forEach((img) => {
      this.imgNameStr = this.imgNameStr + img.newName + "|||";
    })
    var obj = {
      pics:this.imgNameStr,
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
