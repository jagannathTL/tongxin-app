import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginSvc } from '../../providers/login-svc';
import { RegisterPage } from '../register/register';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController) {}

  login(){

  }

  registerUser()
  {
    this.navCtrl.push(RegisterPage);
  }
}
