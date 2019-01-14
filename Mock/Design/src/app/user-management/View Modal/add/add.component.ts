
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/user-management/user';
import { UserDataService } from 'src/app/user-management/user-data.service';
import { DatePipe } from '@angular/common';
import { FavoriteFilm } from 'src/app/user-management/user';





@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  userNameExist = new Array<string>();
  lUsers = [];
  lFavoriteFilm = [];

  date = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
  nameUser: string;
  email: string;
  phone: string;
  gender: any;
  user:  User;
  username: string;
  password: string;
  exist: boolean;
  constructor(public activeModal: NgbActiveModal, private _data: UserDataService, private datepipe: DatePipe) {
    this.userNameExist = this._data.userNameExist;
  }
  ngOnInit() {

    this.nameUser = '';
    this.email = '';
    this.phone = '';
    this.username = '';
    this.password = '';

    this.date = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
  }

  addUser() {
    if (this.userNameExist.includes(this.username)) {
      this.exist = true;
      return;
    }

    if (this.gender === 'Male') {
      this.gender = true;
    } else {
      this.gender = false;
    }

  this.user = new User(1, this.nameUser, this.gender, this.date, this.email, this.phone, false,
    this.username, this.password, true, this.lFavoriteFilm);
  this._data.AddData(this.user);

  this.activeModal.close('add close');

  }
}


