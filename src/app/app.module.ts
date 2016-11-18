import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { CommentPage } from '../pages/comment/comment';
import { FuturesPage } from '../pages/futures/futures';
import { InboxPage } from '../pages/inbox/inbox';
import { PricePage } from '../pages/price/price';
import { CirclePage } from '../pages/circle/circle';
import { ForgetPasswordPage } from '../pages/forget-password/forget-password';
import { Global } from '../providers/global';
import { LoginSvc } from '../providers/login-svc';
import { RegisterPage } from '../pages/register/register';
import { RegisterSvc } from '../providers/register-svc';
import { PriceSvc } from '../providers/price-svc';
import { ForgetPasswordSvc } from '../providers/forget-password-svc';
import { Errors } from '../providers/errors';
import { InboxSvc } from '../providers/inbox-svc';
import { CommentDetailPage } from '../pages/comment-detail/comment-detail';
import { InfoPage } from '../pages/info/info';
import { PriceHistoryPage } from '../pages/price-history/price-history';
import { PriceChartPage } from '../pages/price-chart/price-chart';
import { PriceDetailPage } from '../pages/price-detail/price-detail';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    LoginPage,
    CommentPage,
    FuturesPage,
    InboxPage,
    PricePage,
    CirclePage,
    RegisterPage,
    ForgetPasswordPage,
    CommentDetailPage,
    InfoPage,
    PriceChartPage,
    PriceDetailPage,
    PriceHistoryPage
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      backButtonText: '返回',
      mode: 'ios',
      tabsHideOnSubPages: 'true'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    LoginPage,
    CommentPage,
    FuturesPage,
    InboxPage,
    PricePage,
    CirclePage,
    RegisterPage,
    ForgetPasswordPage,
    CommentDetailPage,
    InfoPage,
    PriceChartPage,
    PriceDetailPage,
    PriceHistoryPage
  ],
  providers: [Global, LoginSvc, RegisterSvc, PriceSvc, Errors, ForgetPasswordSvc, InboxSvc]
})
export class AppModule { }
