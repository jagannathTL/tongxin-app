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
import { TradePage, IndustryTradePage } from '../pages/trade/trade';
import { TradeDetailPage } from '../pages/trade-detail/trade-detail';
import { TradeSvc } from '../providers/trade-svc';
import { MyPubPage } from '../pages/my-pub/my-pub';
import { YellowSvc } from '../providers/yellow-svc';
import { YellowDetailPage } from '../pages/yellow-detail/yellow-detail';
import { TradeViewPage } from '../pages/trade-view/trade-view';
import { HomePage } from '../pages/home/home';
import { Storage } from '@ionic/storage';
import { SearchResultPage } from '../pages/search-result/search-result';
import { SearchSvc } from '../providers/search-svc';
import { SharePage } from '../pages/share/share';
import { BydesignPage } from '../pages/bydesign/bydesign';
import { OnboardPage } from '../pages/onboard/onboard';

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
    YellowDetailPage,
    IndustryTradePage,
    TradeViewPage,
    HomePage,
    SearchResultPage,
    SharePage,
    BydesignPage,
    OnboardPage
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
    YellowDetailPage,
    IndustryTradePage,
    TradeViewPage,
    HomePage,
    SearchResultPage,
    SharePage,
    BydesignPage,
    OnboardPage
  ],
  providers: [Global, RegisterSvc, PriceSvc, Errors,
    ForgetPasswordSvc, InboxSvc, BucketSvc, CommentSvc,
    ProfileSvc, YellowSvc, TradeSvc, Storage, SearchSvc]
})
export class AppModule { }
