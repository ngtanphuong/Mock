import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserDataService } from 'src/app/user-management/user-data.service';
import { DatePipe } from '@angular/common';
import { User } from 'src/app/user-management/user';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['../add/add.component.scss']
})
export class EditComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, private _data: UserDataService, private datepipe: DatePipe) {
   }
  user: User;

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


  ngOnInit() {

    this.id = this.userEdit.UserID;
    this.nameUser = this.userEdit.Name;
    this.gender = this.userEdit.Gender;
    this.date = this.datepipe.transform(this.userEdit.Birthday, 'yyyy-MM-dd');
    this.email = this.userEdit.Email;
    this.phone = this.userEdit.Phone;
    this.username = this.userEdit.UserName;
    this.password = 'helloworld';

  }

  editUser() {
    if (this.gender === 'Male') {
      this.gender = true;
    } else {
      this.gender = false;
    }
    this.user = new User(this.id, this.nameUser, this.gender, this.date, this.email, this.phone, false, this.username, this.password);
    this._data.EditData(this.user);
    this.activeModal.close('edit close');

  }

}
