import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { User, UserDelete, UserSetRole } from 'src/app/user-management/user';

import {HttpClient} from '@angular/common/http';

import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private _code: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _show: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  userNameExist = new Array<string>();
  lUsers = new Array<User>();
  show = this._show.asObservable();
  code = this._code.asObservable();
  // ser:Observable<any> = Observable.create(this.lUsers);
  // listUser :Observable<any> = this.GetData();
  id: number;
  user: any;
  private apiUrlGet = 'http://localhost:51215/api/user/getUser';
  private apiUrlPost = 'http://localhost:51215/api/user/AddUser';
  private apiUrlEdit = 'http://localhost:51215/api/user/EditUser';
  private apiUrlGetById = 'http://localhost:51215/api/user/getUser/16';
  private apiUrlDelete = 'http://localhost:51215/api/user/DeleteUser';
  private BaseToken = 'http://localhost:51215/api/login/check';
  private apiUrlSetRole = 'http://localhost:51215/api/user/SetRole';

  text: any;


  constructor(private http: HttpClient) {

    this.GetContact();
    this.GetData();

  }
    GetData() {
      return this.http.get<Array<User>>(this.apiUrlGet);
    }
    GetContact() {
      if (this.lUsers.length > 0) {
          this.lUsers.length = 0;
      }
      this.GetData().subscribe(res => {
        res.forEach(e => {
          this.lUsers.push(new User(e.UserID, e.Name, e.Gender, e.Birthday,
           e.Email, e.Phone, false, e.UserName, e.Password, e.Status, e.FavoriteFilm));
          this.userNameExist.push(e.UserName);
        });
        });
    }

    AddData(user) {
      this.http.post(this.apiUrlPost, user).subscribe(res => {
        this.GetContact();
        this._code.next(true);
      }, Error => {
        this._code.next(false);
      });
      this._show.next(true);
    }

    EditData(user) {
      this.http.post(this.apiUrlEdit, user).subscribe(res => {this.GetContact();
            this._code.next(true);
       }, Error => {
        this._code.next(false);
      });
      this._show.next(true);

    }

    GetUserById(id: number) {
      this.http.get(this.apiUrlGetById + id, null).subscribe(res => {this.user = res; });
      return this.user;
    }

    DeleteUser(userDelete: UserDelete) {
      this.http.post(this.apiUrlDelete, userDelete).subscribe(res => {this.GetContact(); });
    }

    SearchUser(word: string): any[] {
      if (word !== '') {
        return this.lUsers.filter(u => u.Name.toLowerCase().includes(word));

      } else {
        return this.lUsers;
      }
    }

    sendToken(params): Observable<any> {
      return this.http.post(this.BaseToken, params);
    }

    SetRole(userSetRole: UserSetRole) {
      return this.http.post(this.apiUrlSetRole, userSetRole).subscribe(res => {});
    }

}


