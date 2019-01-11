import { Component, OnInit } from '@angular/core';
import { DataTypeService } from 'src/app/type/Shared/data-type.service';
import { Type } from './shared/type.model';
import { Router  } from '@angular/router';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss',
    '../../assets/scss/material-kit/bootstrap/scss/utilities/_align.scss'
  ]
})
export class TypeComponent implements OnInit {
  // Local Token
  localToken = localStorage.getItem('My-Token');
  // thuộc tính thể loại
  type: Type;
  Types: any = [];
  idType: number;
  nameType: string;
  index: number;

  nameTypeValidate: string;
  iconCheck: string;

  rgxNoSpecialChar = new RegExp('^[\^\;!@#$%^&*\(\\)\\{\\}\\+\\-\_+:|<>?~\\\\/\\[\.,\'\\"\\]\\`\]*$');
  doSubmit: boolean;
  constructor(private _data: DataTypeService, private _router: Router) {
    console.log(this.localToken);
    if (this.localToken == null) {
      this._router.navigateByUrl('login');
      console.log('Thể loại: token không tồn tại! đăng nhập lại');
    } else {
      console.log('Thể loại: local token: ' + this.localToken);
      this.checkToken();
    }
  }

  // Check Token
  checkToken() {
    const params = {
      'Token': this.localToken
    };

    this._data.sendToken(params).subscribe(data => {
      console.log('Thể loại: token hợp lệ');
      this.getData();
    }, Error => {
      localStorage.removeItem('My-Token');
      this._router.navigateByUrl('login');
      console.log('Thể loại: token không tồn tại');
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
    this._data.getData().subscribe(res => {
      this.Types = res;
      // console.log('Danh sách: ' + this.Types);
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
    return this._data.getIdData(id);
  }


  // Thêm thể loại
  insertType() {
    if (!this.doSubmit) {
      return;
    }
      this.type = this.createType(this.nameType);
      this._data.postData(this.type).subscribe(res => {
      this.getData();
      });
      this.nameType = '';
    }

  // Xóa thể loại
  removeType(i, p) {
    if (p == null) {
      p = 1;
    }
    i = i + (4 * (p - 1));
    const id: number = this.Types[i].TypeID;
    // console.log(id);
    this._data.deleteData(id).subscribe(res => {
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
    this._data.getIdData(id).subscribe(res => this.nameType = res.NameType);
  }

  // Thực thi sửa thể loại
  editType() {
    this.type = this.Types[this.idType];
    this.type.NameType = this.nameType ;
    console.log(this.type);
    this._data.putData(this.type).subscribe(res => {
      this.getData();
    });
  }
}
