import { Injectable } from '@angular/core';

/*
  Generated class for the Errors provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Errors {
  LOGIN_FAILED = '登录失败，请重试！';
  NO_DEVICE_ID = '获取deviceID失败！';
  MOBILE_EMPTY = '手机号不能为空！';
  PASSWORD_EMPTY = '密码不能为空！';
  REGISTER_SUC = '注册成功！';
  MOBILE_ERROR = '手机号不正确！';
  GET_INBOX_FAILED = '获取收件箱失败！';
  NOMORE_DATA = '没有更多数据！';
  LOGOUT_FAILED = '退出失败，请重试！';
  GET_DATA_FAILED = '获取数据失败，请重试！';
  CANNOT_EXCEED_90_DAYS = '查询时间不能超过90天！';
  SUBSCRIBE_FAILED = '订阅失败，请重试！';
  UNSUBSCRIBE_FAILED = '取消订阅失败，请重试！';
  OPTION_FAILED = '操作失败，请重试！';
  LOGIN_ON_OTHER_MACHINE = '该账号已在其他终端登录，请重新登录！';
}
