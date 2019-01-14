import { DataService } from './data.service';
import { Component } from '@angular/core';
import { Router  } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Film Management';

  public isLogin: boolean;
  localToken: any;

  constructor(private router: Router, private _data: DataService) {
    this.localToken = localStorage.getItem('My-Token');

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
      this.isLogin = false;
    });
}

  Logout() {
    this.isLogin = false;
    localStorage.removeItem('My-Token');
    localStorage.clear();
    this.router.navigateByUrl('login');
  }
}

