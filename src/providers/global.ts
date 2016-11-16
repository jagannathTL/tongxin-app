import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Global provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Global {

  constructor(public http: Http) {
    console.log('Hello Global Provider');
  }

  // getServer(){
  //   return 'http://api.shtx.com.cn';
  // }
  //
  // setDeviceId(device){
  //   this.deviceId = device;
  // }
  //
  // getDeviceId(){
  //   return this.deviceId;
  // }

  SERVER = 'http://api.shtx.com.cn';

  DEVICE_ID = '';

  NOTIFICATION_DURATION = 2;

  MOBILE = '';

}
