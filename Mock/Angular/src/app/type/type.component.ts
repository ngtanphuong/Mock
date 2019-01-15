import { Component, OnInit } from '@angular/core';
import { DataTypeService } from 'src/app/type/Shared/data-type.service';
import { Type } from './shared/type.model';
import { FilmBytypeComponent } from '../type/film-bytype/film-bytype.component';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss',
    '../../assets/scss/material-kit/bootstrap/scss/utilities/_align.scss'
  ]
})
export class TypeComponent implements OnInit {
  // Local Token
  localToken: any;

  // Thuộc tính phim
  Films: any = [];

  // thuộc tính thể loại
  type: Type;
  Types: any = [];
  idType: number;
  nameType: string;
  index: number;
  nameTypeValidate: string;
  iconCheck: string;

  idDelte: number;
  nameSearch: string;

  rgxNoSpecialChar = new RegExp('^[\^\;!@#$%^&*\(\\)\\{\\}\\+\\-\_+:|<>?~\\\\/\\[\.,\'\\"\\]\\`\]*$');
  doSubmit: boolean;
  constructor(private modalService: NgbModal, private _data: DataTypeService, private _router: Router) {
    this.localToken = localStorage.getItem('My-Token');

    if (this.localToken == null) {
      this._router.navigateByUrl('login');
      console.log('thể loại: token không tồn tại! đăng nhập lại');
    } else {
      console.log('thể loại: local token: ' + this.localToken);
      this.checkToken();
    }
  }
  ngbModalOption: NgbModalOptions = {
    size: 'lg',
    windowClass: 'Modal',
    // centered: true
  };

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

  // tslint:disable-next-line:use-life-cycle-interface
  ngDoCheck() {
    this.nameTypeValidate = '';

    // name type
    if (this.nameType === '') {
      this.nameTypeValidate = 'Không được bỏ trống ';
      this.doSubmit = false;
      console.log('ERR null');
      return;
    }

    if (!this.rgxNoSpecialChar.test(this.nameType)) {
      this.nameTypeValidate = 'Không được có kí tự đặc biệt ';
      this.doSubmit = false;
      console.log('ERR char');
      return;
    }

    this.doSubmit = true;
    this.iconCheck = '';
  }
  ngOnInit() {
    this.getData();
  }

  // Lấy danh sách thể loại
  getData() {
    this._data.getData(this.localToken).subscribe(res => {
      this.Types = res;
       console.log('Danh sách: ' + this.Types);
    });
  }

  // Xóa trắng textbox nametype
  init() {
    this.nameType = '';
  }

  // Tạo mới thể loại
  createType(name: string): Type {
    const temptype = new Type(name);
    return temptype;
  }

  // Lấy thể loại theo id
  getId(id: number) {
    return this._data.getIdData(id, this.localToken);
  }

  // Tìm tên thể loại
  searchListType() {
    if (this.nameSearch === '') {
      this.getData();
      return;
    }

    this._data.searchData(this.nameSearch, this.localToken).subscribe(res => {
      this.Types = res;
    });
  }

  // Thêm thể loại
  insertType() {
    if (!this.doSubmit) {
      return;
    }
    this.type = this.createType(this.nameType);
    this._data.insertData(this.type, this.localToken).subscribe(res => {
      this.getData();
    });
    this.nameType = '';
  }

  // Xóa thể loại
  getIdDelete(type: Type) {
    this.idDelte = type.TypeID;
  }

  removeType() {
    this._data.deleteData(this.idDelte, this.localToken).subscribe(res => {
      this.getData();
    });
  }

  // Hiển thị thông tin thể loại
  showType(i, p) {
    if (p == null) {
      p = 1;
    }
    i = i + (4 * (p - 1));
    const id: number = this.Types[i].TypeID;
    this.idType = i;

    console.log('ID : ' + this.idType);
    this._data.getIdData(id, this.localToken).subscribe(res => this.nameType = res.NameType);
  }

  // Thực thi sửa thể loại
  editType() {
    this.type = this.Types[this.idType];
    this.type.NameType = this.nameType;
    console.log(this.type);
    this._data.updateData(this.type, this.localToken).subscribe(res => {
      this.getData();
    });
  }

  // Show modal Film by Type
  filmByType(type: any) {
    const modalDelRef = this.modalService.open(FilmBytypeComponent, this.ngbModalOption);
    modalDelRef.componentInstance.id = type.TypeID;
  }
}
