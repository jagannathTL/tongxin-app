import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Errors provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Errors {
  LOGIN_FAILED = '登录失败，请重试！';
  NO_DEVICE_ID = '获取deviceID失败！';
  MOBILE_EMPTY = '手机号不能为空';
  PASSWORD_EMPTY = '密码不能为空';
  REGISTER_SUC = '注册成功';
  MOBILE_ERROR = '手机号不正确';
}
