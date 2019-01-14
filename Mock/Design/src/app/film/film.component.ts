import { DatePipe } from '@angular/common';
import { DataFilmService } from './data-film.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Router  } from '@angular/router';
@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
}
)

export class FilmComponent implements OnInit {

  localToken: any;

  lstFilm: any = [];
  find: any;

  // thuộc tính
  filmID: number;
  filmName: string;
  describe: string;
  rate: number;
  yearCreate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
  filmImage: string;
  Status: boolean;

  // Validate
  _filmNameValidate: string;
  _filmDescribeValidate: string;
  _filmFilmImageValidate: string;
  // rgxNoSpecialChar = new RegExp('^[!@#$%^&*()_+:|<>?~`]*$');
  rgxNoSpecialChar = new RegExp('^[a-zA-Z0-9 ]*$');

  doSubmit: boolean;

  // life cycle hook
  ngOnInit() {

  }

  // kiểm tra nhập
  // tslint:disable-next-line:use-life-cycle-interface
  ngDoCheck() {
    this._filmNameValidate = '';
    this._filmDescribeValidate = '';
    this._filmFilmImageValidate = '';

    // film name
    if (this.filmName === '') {
      this._filmNameValidate = 'Tên phim không được bỏ trống !';
      this.doSubmit = false;
      console.log('Validate error film name is blank');
      return;
    }

    if (!this.rgxNoSpecialChar.test(this.filmName)) {
      this._filmNameValidate = 'Tên phim không được có kí tự đặc biệt !';
      this.doSubmit = false;
      console.log('Validate error film name');
      return;
    }

    if (this.describe === '') {
      this._filmDescribeValidate = 'Giới thiệu phim không được bỏ trống !';
      this.doSubmit = false;
      console.log('Validate error film describe is blank');
      return;
    }

    if (!this.rgxNoSpecialChar.test(this.describe)) {
      this._filmDescribeValidate = 'Giới thiệu phim không được có kí tự đặc biệt !';
      this.doSubmit = false;
      console.log('Validate error film describe');
      return;
    }

    if (this.filmImage === '') {
      this._filmFilmImageValidate = 'Tên phim không được bỏ trống !';
      this.doSubmit = false;
      console.log('Validate error film image is blank');
      return;
    }

    this.doSubmit = true;
  }


  constructor(private filmService: DataFilmService, private _sanitizer: DomSanitizer, private _router: Router, private datepipe: DatePipe) {
    this.localToken = localStorage.getItem('My-Token');

    if (this.localToken == null) {
      this._router.navigateByUrl('login');
      console.log('Phim: token không tồn tại! đăng nhập lại');
    } else {
      console.log('Phim: local token: ' + this.localToken);
      this.checkToken();
    }
  }

  // lấy list data
  getData() {
    this.filmService.getData(this.localToken).subscribe(data => {
      console.log('Get List Film Success');
      this.lstFilm = data;
    }, Error => {
      console.log('Get List Film False');
    });
  }

  checkToken() {
      const params = {
        'Token': this.localToken
      };

      this.filmService.sendToken(params).subscribe(data => {
        console.log('Phim: token hợp lệ');
        this.getData();
      }, Error => {
        localStorage.removeItem('My-Token');
        localStorage.clear();
        this._router.navigateByUrl('login');
        console.log('Phim: token không tồn tại');
      });
  }

  // Thêm phim mới
  addFilm() {
    if (!this.doSubmit) {
      return;
    }

    const params = {
      'FilmName': this.filmName,
      'Describe': this.describe,
      'Rate': 0,
      'Year': this.yearCreate,
      'Img': this.filmImage,
      'Status': true
    };

    this.filmService.addFilm(params, this.localToken).subscribe(data => {
      this.getData();
      console.log('Add film succsess');
    }, Error => {
      console.log('Add Film False');
    });
  }

  // Xóa phim
  removeFilm(i) {
    this.filmService.removeFilm(i , this.localToken).subscribe(data => {
      this.getData();
      console.log('Remove Film Success');
    }, Error => {
      console.log('Remove Film False: ' + Error);
    });
  }

  // cập nhật phim
  updateStatusFilm(i) {
    this.filmService.updateStatusFilm(i, this.localToken).subscribe(data => {
      this.getData();
      console.log('Update Status Film Success');
    }, Error => {
      console.log('Update Status Film False: ' + Error);
    });
  }

  // tìm kiếm phim theo ID để chỉnh
  findEditFilm(i, p) {
    if (p == null) {
      p = 1;
    }
    i = i + (4 * (p - 1));

    const id: number = this.lstFilm[i].FilmID;

    this.filmID = this.lstFilm[i].FilmID;
    this.filmName = this.lstFilm[i].FilmName;
    this.describe = this.lstFilm[i].Describe;
    this.rate = this.lstFilm[i].Rate;
    this.yearCreate = this.datepipe.transform(this.lstFilm[i].Year, 'yyyy-MM-dd');
    this.filmImage = this.lstFilm[i].Img;
    this.Status = this.lstFilm[i].Status;

    this.filmService.findEditFilm(id , this.localToken).subscribe(data => {
      this.find = data;
      console.log('Find Film Success');
    }, Error => {
      console.log('Find Film False');
    });
  }

  // chỉnh sữa phim
  editFilm() {
    if (!this.doSubmit) {
      return;
    }

    const params = {
      'FilmID': this.filmID,
      'FilmName': this.filmName,
      'Describe': this.describe,
      'Rate': 0,
      'Year': this.yearCreate,
      'Img': this.filmImage,
      'Status': this.Status
    };

    this.filmService.editFilm(params , this.localToken).subscribe(data => {
      this.getData();
      console.log('Update Succsses');
    }, Error => {
      console.log('Update False');
    });
  }

  // get data image and set text to input tag via ID attribute
  getImageDataAdd(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (Myevent: any) => {
        this.filmImage = Myevent.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
      // get data img
      this.filmImage = <string>this._sanitizer.bypassSecurityTrustResourceUrl(event.target.result);
      // set text file name add modal
      (<HTMLInputElement>document.getElementById('text')).value = event.target.files[0].name;
    }
  }

  // get data image and set text to input tag via ID attribute
  getImageDataModify(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (Myevent: any) => {
        this.filmImage = Myevent.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      // get data img
      this.filmImage = <string>this._sanitizer.bypassSecurityTrustResourceUrl(event.target.result);
      // set text file name add modal
      (<HTMLInputElement>document.getElementById('text_modify')).value = event.target.files[0].name;
    }
  }
}

