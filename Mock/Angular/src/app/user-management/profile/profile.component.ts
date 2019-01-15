import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../user-data.service';
import { User } from '../user';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FavoriteFilmComponent } from './favorite-film/favorite-film.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  localUsername = localStorage.getItem('My-username');
  localToken = localStorage.getItem('My-Token');
  user = User.getDefault();
  currentId: any;
  newPasswrod: string;
  listFilm: any;
  nameUser: string;
  gender: any;
  date: any;
  email: string;
  phone: string;
  role: boolean;
  id: number;
  username: string;
  password = '';
  newPassword = '';


  constructor(private _data: UserDataService, private _router: Router, private modalService: NgbModal) {
    // this.currentId = this._router.url.slice(this._router.url.lastIndexOf('/') + 1);
    // this._data.GetUserById(this.currentId).subscribe(res => {
    //   this.user = res;
    // });
    if (this.localToken == null) {
      this._router.navigateByUrl('login');
      console.log('User: token không tồn tại! đăng nhập lại');
    } else {
      console.log('User: local token: ' + this.localToken);
      this.checkToken();
    }

  }

  NgbModalOptions: NgbModalOptions = {
     // backdrop: 'static',
     size: 'lg'
  };
  FavoriteFilm() {
    console.log('test: ' + this.user);
    const modalhref = this.modalService.open(FavoriteFilmComponent, this.NgbModalOptions);
    modalhref.componentInstance.currentId = this.user.UserID;

  }

  ngOnInit() {
    this.user.filmModel.forEach(e => {
      this.listFilm.add(e.FilmName);
    });
  }
  SaveChange() {
    if (this.newPassword.length > 0) {
      this.user.Password = this.newPassword;
    }
    this._data.EditData(this.user);
  }

  checkToken() {
    const params = {
      'Token': this.localToken
    };

    this._data.sendToken(params).subscribe(data => {
      console.log('Phim: token hợp lệ');
      this._data.GetUserByusername(this.localUsername).subscribe(res => {this.user = res; });
    }, Error => {
      localStorage.removeItem('My-Token');
      this._router.navigateByUrl('login');
      console.log('Phim: token không tồn tại');
    });
  }

}
