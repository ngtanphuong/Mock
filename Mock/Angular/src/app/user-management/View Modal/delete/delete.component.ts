import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserDataService } from '../../user-data.service';
import { UserDelete, User } from '../../user';




@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
  @Input() user: User;
  lUsers = [];
   _name;

  constructor(public activeModal: NgbActiveModal, private _data: UserDataService) { }

  ngOnInit() {
    this._name = this.user.Name;
  }


  deleteUser() {
    const userDelete = new UserDelete(this.user.UserID);
    this.activeModal.close('remove close');

    this._data.DeleteUser(userDelete);
  }

  removeItem() {
  }

}
