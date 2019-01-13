import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserDataService } from 'src/app/user-management/user-data.service';
import {AddComponent} from 'src/app/user-management/View Modal/add/add.component';
import { User, UserSetRole } from 'src/app/user-management/user';
import { DeleteComponent } from 'src/app/user-management/View Modal/delete/delete.component';
import { EditComponent } from 'src/app/user-management/View Modal/edit/edit.component';
import { Router  } from '@angular/router';



@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})

export class UserManagementComponent implements OnInit {
  localToken = localStorage.getItem('My-Token');
  all;
  lUsers = [];
  user:  User;
  id: number;
  idd = [];
  nameSearch: string = null;
  data;
  code: boolean;
  show: boolean;
  userSetRole: UserSetRole;
  constructor(private modalService: NgbModal, private _data: UserDataService, private _router: Router) {

    if (this.localToken == null) {
      this._router.navigateByUrl('login');
      console.log('User: token không tồn tại! đăng nhập lại');
    } else {
      console.log('User: local token: ' + this.localToken);
      this.checkToken();
    }
    this._data.code.subscribe(res => this.code = res);
    this._data.show.subscribe(res => this.show = res);
   }


  deleteModal(user: User) {
    const modalRef = this.modalService.open(DeleteComponent);
    modalRef.componentInstance.user = user;
  }


  addModal() {
    const modalAddRef = this.modalService.open(AddComponent);
    console.log(this.code);
  }

  editModal(user: User) {
    const modalDelRef = this.modalService.open(EditComponent);
    modalDelRef.componentInstance.userEdit = user;
  }

  ngOnInit() {

  }

  searchlistUser() {
    this.lUsers = this._data.SearchUser(this.nameSearch);
  }

  setRole(user: User) {
    this.userSetRole = new UserSetRole(user.UserID, user.isAdmin);
    this._data.SetRole(this.userSetRole);
    console.log(user.UserID, user.isAdmin);
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngDoCheck() {
    if (this.nameSearch !== null) {
      this.searchlistUser();
      console.log(this.nameSearch);
    }


  }
  getData() {
  }

  checkToken() {
    const params = {
      'Token': this.localToken
    };

    this._data.sendToken(params).subscribe(data => {
      console.log('Phim: token hợp lệ');
      this.lUsers = this._data.lUsers;
    }, Error => {
      localStorage.removeItem('My-Token');
      this._router.navigateByUrl('login');
      console.log('Phim: token không tồn tại');
    });
}

}
