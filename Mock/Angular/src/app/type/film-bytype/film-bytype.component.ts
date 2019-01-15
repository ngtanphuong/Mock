import { Component, OnInit, Input } from '@angular/core';
import { DataTypeService } from 'src/app/type/Shared/data-type.service';
import { Router } from '@angular/router';
import { Type, Actor, Director } from '../shared/type.model';
@Component({
  selector: 'app-film-bytype',
  templateUrl: './film-bytype.component.html',
  styleUrls: ['./film-bytype.component.scss']
})
export class FilmBytypeComponent implements OnInit {
  // token
  localToken: any;

  // thuộc tính thể loại
  type: Type;
  Types: any = [];
  idType: number;
  nameType: string;
  index: number;

  // thuộc tính diễn viên
  actor: Actor;
  Actors: any = [];
  idActor: number;
  nameActor: string;

  // Thuộc tính đạo diễn
  director: Director;
  directors: any = [];
  idDirector: number;
  nameDirector: string;

  // Thuộc tính phim
  Films: any = [];
  idFilm: number;
  nameFilm: string;
  img: string;
  describe: string;
  rate: string;
  year: Date;
  status: boolean;

  @Input() id: number;

  constructor(private _data: DataTypeService, private _router: Router) {
    this.localToken = localStorage.getItem('My-Token');

    if (this.localToken == null) {
      this._router.navigateByUrl('login');
      console.log('thể loại: token không tồn tại! đăng nhập lại');
    } else {
      console.log('thể loại: local token: ' + this.localToken);
      this.checkToken();
    }
  }

    // Lấy danh sách thể loại
    getData() {
      this._data.getData(this.localToken).subscribe(res => {
        this.Types = res;
         console.log('Danh sách: ' + this.Types);
      });
    }

  // Check Token
  checkToken() {
    const params = {
      'Token': this.localToken
    };

    this._data.sendToken(params).subscribe(data => {
      console.log('thể loại: token hợp lệ');
      this.getData();
    }, Error => {
      localStorage.removeItem('My-Token');
      localStorage.clear();
      this._router.navigateByUrl('login');
      console.log('thể loại: token không tồn tại');
    });
}

  ngOnInit() {
    this.showFilmByType(this.id);
  }

  showFilmByType(id) {
    this._data.getFilmByType(id, this.localToken).subscribe(res => {
      this.Films = res;
      console.log(this.Films);
    });
  }
}
