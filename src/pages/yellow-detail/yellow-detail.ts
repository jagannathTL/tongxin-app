import { Component, NgZone } from '@angular/core';
import { NavController,NavParams, LoadingController } from 'ionic-angular';
import { YellowSvc } from '../../providers/yellow-svc';
import { Global } from '../../providers/global';
// import { Errors } from '../../providers/errors';
declare const Swiper: any;
/*
  Generated class for the YellowDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-yellow-detail',
  templateUrl: 'yellow-detail.html'
})
export class YellowDetailPage {

  companyPics: any = [];
  companyName: any;
  contact: any;
  contactTel: any;
  industry: any;
  industryDesc: any;
  companyAddress: any;
  addressDesc: any;
  open: any = {companyName:"", contactName:"", contactTel:"", industry:"", industryDesc:"", address:"", addressDesc:""};
  allImgs: any = [];

  constructor(public navCtrl: NavController, public yellowSvc: YellowSvc, public navParms: NavParams, public loading: LoadingController, public global: Global, public zone: NgZone) {}

  ionViewDidEnter() {
    this.getCompanyData();
  }

  getCompanyData()
  {
    this.zone.run(() =>{
      var data = this.navParms.data.open;
      if(data != null && data != undefined)
      {
        this.open.companyName = data.companyName;
        this.open.contactName = data.contactName;
        this.open.contactTel = data.contactTel;
        this.open.industry = data.industry;
        if(data.industry != null && data.industry != "" && data.province != undefined){
          this.open.industry = this.open.industry + "     " + data.product;
        }else{
          this.open.industry = data.product;
        }
        this.open.industryDesc = data.industryDesc;

        this.open.address = data.province
        if(data.province != "" && data.province != undefined && data.province != null)
        {
          this.open.address = this.open.address + "     " + data.city;
        }
        else{
          this.open.address = data.city;
        }

        this.open.addressDesc = data.addressDesc;
      data.companyPics.forEach((img) => {
        var url = this.global.SERVER + "/upload/" + img;
        this.allImgs.push({url:url, newName:img});
      });
      }
    })
    setTimeout(() => {
      new Swiper(".companyDetailPics",{
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev'
      })
    }, 500)
  }

}
