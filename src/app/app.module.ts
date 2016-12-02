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
import { RegisterPage } from '../pages/register/register';
import { RegisterSvc } from '../providers/register-svc';
import { PriceSvc } from '../providers/price-svc';
import { ForgetPasswordSvc } from '../providers/forget-password-svc';
import { Errors } from '../providers/errors';
import { InboxSvc } from '../providers/inbox-svc';
import { InOutBucketsPage } from '../pages/in-out-buckets/in-out-buckets';
import { BucketSvc } from '../providers/bucket-svc';
import { CommentDetailPage } from '../pages/comment-detail/comment-detail';
import { InfoPage } from '../pages/info/info';
import { PriceHistoryPage } from '../pages/price-history/price-history';
import { PriceDetailPage } from '../pages/price-detail/price-detail';
import { CommentListPage } from '../pages/comment-list/comment-list';
import { CommentSvc } from '../providers/comment-svc';
import { ProfilePage } from '../pages/profile/profile';
import { ProfileSvc } from '../providers/profile-svc';
import { YellowPage, AreaPopoverPage, IndustryPage } from '../pages/yellow/yellow';
import { TradePage } from '../pages/trade/trade';
import { TradeDetailPage } from '../pages/trade-detail/trade-detail';
import { MyPubPage } from '../pages/my-pub/my-pub';
import { YellowSvc } from '../providers/yellow-svc';
import { YellowDetailPage } from '../pages/yellow-detail/yellow-detail';

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
    InOutBucketsPage,
    CommentDetailPage,
    InfoPage,
    PriceDetailPage,
    PriceHistoryPage,
    CommentListPage,
    ProfilePage,
    YellowPage,
    TradePage,
    TradeDetailPage,
    MyPubPage,
    AreaPopoverPage,
    IndustryPage,
    YellowDetailPage
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      backButtonText: '返回',
      mode: 'ios',
      tabsHideOnSubPages: true,
      swipeBackEnabled: true
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
    InOutBucketsPage,
    CommentDetailPage,
    InfoPage,
    PriceDetailPage,
    PriceHistoryPage,
    CommentListPage,
    ProfilePage,
    YellowPage,
    TradePage,
    TradeDetailPage,
    MyPubPage,
    AreaPopoverPage,
    IndustryPage,
    YellowDetailPage
  ],
  providers: [Global, RegisterSvc, PriceSvc, Errors,
    ForgetPasswordSvc, InboxSvc, BucketSvc, CommentSvc,
    ProfileSvc, YellowSvc]
})
export class AppModule { }
