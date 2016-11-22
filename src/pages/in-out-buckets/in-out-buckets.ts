import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController,ViewController } from 'ionic-angular';
declare var Sortable: any;
declare var $: any;
import { BucketSvc } from '../../providers/bucket-svc';
import { Global } from '../../providers/global';
/*
  Generated class for the InOutBuckets page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-in-out-buckets',
  templateUrl: 'in-out-buckets.html'
})
export class InOutBucketsPage {

  inBuckets: any = [];//已关注列表
  outBuckets: any = [];//未关注列表
  groupIDList: any = "";
  allList: any = [];
  defaultObj: any;
  sortOut: any;
  sortB: any;

  constructor(public navCtrl: NavController, public params: NavParams, public bucketSvc: BucketSvc, public global: Global, public loading: LoadingController, public viewCtrl: ViewController) {
    this.allList = params.get('inBucketList');
    var obj = this.allList.filter((fir: any) => {
      return fir.id == 0;
    });
    this.defaultObj = obj[0];
    this.inBuckets = this.allList.filter((all: any) => {
      return all.id != 0;
    });
    this.outBuckets = params.get('outBucketList');
  }

  appendOut(name){
    var obj = this.inBuckets.filter((inB) => {
        return inB.name == name;
    });
    if(obj != null && obj != undefined){
        var index = this.inBuckets.indexOf(obj[0]);
        this.inBuckets.splice(index,1);
        this.outBuckets.push(obj[0]);
    }
  }

  appendIn(name){
    var obj = this.outBuckets.filter((outB) => {
        return outB.name == name;
    });
    if(obj != null && obj != undefined){
        var index = this.outBuckets.indexOf(obj[0]);
        this.outBuckets.splice(index,1);
        this.inBuckets.push(obj[0]);
    }
  }

  ionViewDidLoad() {
    console.log('Hello InOutBucketsPage Page');
    var inB = document.getElementById("inBucketC");
    var outB = document.getElementById("outBucketC");
    this.sortB = Sortable.create(inB,{
      group: "sorting",
      sort: true,
      draggable:".moveClass",
      setData: (dataT, dragEl) => {

      },
      onEnd: (evt) => {

      },
      onAdd: (evt) => {
        var addObj = this.outBuckets.filter((out: any) => {
          return out.name == evt.item.textContent;
        });
        if(addObj != null && addObj != undefined)
        {
          this.outBuckets.splice(evt.oldIndex, 1);
          this.inBuckets.splice(evt.newIndex, 0, addObj[0]);
        }
      },
      onRemove: (evt) => {
        // console.log("remove");
        var removeObj = this.inBuckets.filter((inB: any) => {
          return inB.name == evt.item.textContent;
        });
        if(removeObj != undefined && removeObj != null)
        {
          this.inBuckets.splice(evt.oldIndex, 1);
          this.outBuckets.splice(evt.newIndex, 0, removeObj[0]);
        }
      },
      onUpdate: (evt) => {
        var updateObj = this.inBuckets.filter((out: any) => {
          return out.name == evt.item.textContent;
        });
        if(updateObj != null && updateObj != undefined)
        {
            this.inBuckets.splice(evt.oldIndex, 1);
            this.inBuckets.splice(evt.newIndex, 0, updateObj[0]);
        }
      }
    });
    this.sortOut =  Sortable.create(outB,{
      group: "sorting",
      sort: false
    });
  }

  closeModal()
  {
    this.inBuckets.splice(0,0,this.defaultObj);
    this.viewCtrl.dismiss({list:this.inBuckets});
  }

  ionViewWillLeave()
  {
    console.log('leave');
    this.inBuckets.forEach((inB) => {
      var str = inB.id + "|";
      this.groupIDList += str;
    });

    this.bucketSvc.updateBuckets(this.groupIDList, this.global.MOBILE).then((data) => {

    });
  }

}
