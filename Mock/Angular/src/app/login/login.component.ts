import { Component, OnInit } from '@angular/core';
import { DataLoginService } from './data-login.service';
import { Router  } from '@angular/router';
import { UserDataService } from '../user-management/user-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  token: string;
  userName: string;
  password: string;
  localToken = localStorage.getItem('');
  strError: string;
  constructor(private loginService: DataLoginService, private router: Router, private _UserDataService: UserDataService) {
    if (this.localToken != null) {
      this.checkToken();
    }
  }

  ngOnInit() {
    // console.log('Login: local token: ' + this.localToken);
  }

  // Kiểm tra token
  checkToken() {
    const params = {
      'Token': this.localToken
    };
    // nếu đã có token thì không đăng nhập
    this.loginService.sendToken(params).subscribe(data => {
      // console.log('Login: token hợp lệ');
      this.router.navigateByUrl('film');
    }, Error => {
      // console.log('Login: token không tồn tại, Token:' + this.localToken);
    });
}

  doLogin() {
    const params = {
      'UserName': this.userName,
      'Password': this.password,
    };

    this.loginService.doLogin(params).subscribe(data => {
      localStorage.removeItem('My-Token');
      localStorage.clear();
      this.token = data;
      localStorage.setItem('My-Token', this.token);
      localStorage.setItem('My-username', this.userName);
      this._UserDataService.GetName(this.userName);
      console.log('Login: đăng nhập thành công TOKEN: ' + this.token + this.userName);
      this.router.navigateByUrl('film');
    }, Error => {
      this.strError = 'Đăng nhập thất bại !!!';
      // console.log('Login Đăng nhập thất bại! ' + this.userName + ' | ' + this.password);
    });
  }

}
