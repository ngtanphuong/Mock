
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/user-management/user';
import { UserDataService } from 'src/app/user-management/user-data.service';
import { DatePipe } from '@angular/common';





@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  heroName: string;
  lUsers = [];

  date = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
  nameUser: string;
  email: string;
  phone: string;
  gender: any;
  user:  User;
  username: string;
  password: string;
  constructor(public activeModal: NgbActiveModal, private _data: UserDataService, private datepipe: DatePipe) {
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
    if (this.gender === 'Male') {
      this.gender = true;
    } else {
      this.gender = false;
    }


  this.user = new User(1, this.nameUser, this.gender, this.date, this.email, this.phone, false, this.username, this.password);
  this._data.AddData(this.user);

  this.activeModal.close('add close');

  }
}


