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

  }

  //SERVER = 'http://api.shtx.com.cn';
  public SERVER = 'http://172.20.67.95:83';

  public DEVICE_ID = '';

  public NOTIFICATION_DURATION = 2;

  public MOBILE = '15802161396';

  public PRICE_HISTORY_DURATION_DAYS = 90;

  public IS_LOGGEDIN = true;

  public AD_MAIN_RATIO: number = 20 / 10;

}
