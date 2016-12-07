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

  //SERVER = 'http://api.shtx.com.cn';
  SERVER = 'http://172.20.67.133:83';

  DEVICE_ID = '';

  NOTIFICATION_DURATION = 2;

  MOBILE = '13524259846';

  PRICE_HISTORY_DURATION_DAYS = 90;

  IS_LOGGEDIN = false;

}
