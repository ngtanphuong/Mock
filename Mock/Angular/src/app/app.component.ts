import { DataService } from './data.service';
import { Component } from '@angular/core';
import { Router  } from '@angular/router';
import { UserDataService } from './user-management/user-data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Film Management';

  username: string;
  public isLogin: boolean;
  localToken: any;
  currentName: string;

  constructor(private router: Router, private _data: DataService, private _UserDataService: UserDataService) {
    this.localToken = localStorage.getItem('My-Token');

    this._UserDataService.currentName.subscribe(res => this.currentName = res);
    if (this.localToken != null) {
      this.checkToken();
    } else {
      this.isLogin = false;
    }
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {

  }

  checkToken() {
    const params = {
      'Token': this.localToken
    };

    this._data.sendToken(params).subscribe(data => {
      this.isLogin = true;
    }, Error => {
      localStorage.removeItem('My-Token');
      localStorage.removeItem('My-username');
      this.isLogin = false;
    });
}

  Logout() {
    this.isLogin = false;
    localStorage.removeItem('My-Token');
    localStorage.removeItem('My-username');
    this.currentName = '';

    this.router.navigateByUrl('login');
  }
}




