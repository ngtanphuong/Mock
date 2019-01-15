import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserDataService } from '../../user-data.service';
import { DatePipe } from '@angular/common';
import { User, FavoriteFilm } from '../../user';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['../add/add.component.scss']
})
export class EditComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, private _data: UserDataService, private datepipe: DatePipe) {
  }
  user: User;
  lfavoriteFilm: Array<FavoriteFilm>;

  @Input() userEdit: User;

  nameUser: string;
  gender: any;
  date: any;
  email: string;
  phone: string;
  role: boolean;
  id: number;
  username: string;
  password: string;
  newPassword = '';
  match = false;
  status = true;



  ngOnInit() {

    this.id = this.userEdit.UserID;
    this.nameUser = this.userEdit.Name;
    if (this.userEdit.Gender) {
      this.gender = 'Male';
    } else {
      this.gender = 'Female';
    }
    this.date = this.datepipe.transform(this.userEdit.Birthday, 'yyyy-MM-dd');
    this.email = this.userEdit.Email;
    this.phone = this.userEdit.Phone;
    this.match = false;
    this.username = this.userEdit.UserName;
    console.log(this.userEdit.Password);

  }
  checkPassword(): boolean {
    if (this.password === this.userEdit.Password) {
      return true;
    } else {
      return false;
    }
  }

  editUser() {
    if (this.gender === 'Male') {
      this.gender = true;
    } else {
      this.gender = false;
    }
    if (this.newPassword.length === 0 ) {
      this.newPassword = this.userEdit.Password;
      console.log(this.password);
    }
    this.user = new User(this.id, this.nameUser, this.gender, this.date, this.email, this.phone, false,
                          this.userEdit.UserName, this.newPassword, this.status, this.lfavoriteFilm);
    this._data.EditData(this.user);
    this.activeModal.close('edit close');
  }
}
