import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserDataService } from 'src/app/user-management/user-data.service';
import {AddComponent} from 'src/app/user-management/View Modal/add/add.component';
import { User } from 'src/app/user-management/user';
import { DeleteComponent } from 'src/app/user-management/View Modal/delete/delete.component';
import { EditComponent } from 'src/app/user-management/View Modal/edit/edit.component';



@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})

export class UserManagementComponent implements OnInit {
  all;
  lUsers = [];
  user:  User;
  id: number;
  idd = [];
  nameSearch: string;
  data;
  code: any;
  constructor(private modalService: NgbModal, private _data: UserDataService) {
    // this._data.GetData().subscribe(res => this.lUsers = res);
    this._data.code.subscribe(res => this.code = res);
    // this._data.code.subscribe(res => this.code = res);
    console.log(this.code);

   }


  deleteModal(user: User) {
    const modalRef = this.modalService.open(DeleteComponent);
    modalRef.componentInstance.user = user;
  }


  addModal() {
    const modalAddRef = this.modalService.open(AddComponent);

  }

  editModal(user: User) {
    const modalDelRef = this.modalService.open(EditComponent);
    modalDelRef.componentInstance.userEdit = user;
  }

  ngOnInit() {
    this.lUsers = this._data.lUsers;
  }

  searchlistUser() {
    this.lUsers = this._data.SearchUser(this.nameSearch);
  }

}
