import { Director } from './classDirector';
import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { NgxPaginationModule } from 'ngx-pagination';
import '../../assets/js/material-kit.min.js';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { directiveDef } from '@angular/core/src/view';
import { DatePipe } from '@angular/common';
import { _sanitizeHtml } from '@angular/core/src/sanitization/html_sanitizer';
import { _sanitizeUrl } from '@angular/core/src/sanitization/url_sanitizer';
import { DomSanitizer } from '@angular/platform-browser';
import { DataDirectorService } from './data-director.service';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.scss']

})
export class DirectorComponent implements OnInit {

  // Get token
  localToken = localStorage.getItem('My-Token');


  // Director
  director: Director;
  // List director
  lstDirector: any = [];

  // property
  directorID: number;
  directorName: string;
  directorGender: true;
  directorBirthday: any;
  directorImg: string;
  directorDescribe: string;
  directorStatus = true;

  // Index search
  index: number;

  // Validate
  _DirectorNameValidate: string;
  _DirectorImageValidate: string;
  _DirectorDescribeValidate: string;
  isValidate: false;

 // rgxSpecialChar = new RegExp('^[\^\;!@#$%^&*\(\\)\\{\\}\\+\\-\_+:|<>?~\\\\/\\[\.,\'\\"\\]\\`\]*$');
  rgxNoSpecialChar = new RegExp('^[\^\;!@#$%^&*\(\\)\\{\\}\\+\\-\_+:|<>?~\\\\/\\[\.,\'\\"\\]\\`\]*$');
  // = new RegExp('^[a-zA-Z0-9 ]*$');
  doSubmit: boolean;

  // Constructor: get data
  constructor(private http: HttpClient, private _sanitizer: DomSanitizer, public datepipe: DatePipe,
    private directorService: DataDirectorService, private _router: Router) {

     // this.getData();
     console.log(this.localToken);
     if (this.localToken == null) {
       this._router.navigateByUrl('login');
       console.log('Đạo diễn: token không tồn tại! đăng nhập lại');
     } else {
       console.log('Đạo diễn: local token: ' + this.localToken);
       this.checkToken();
     }
  }


  checkToken() {
    const params = {
      'Token': this.localToken
    };

    this.directorService.sendToken(params).subscribe(data => {
      console.log('Đạo diễn: token hợp lệ');
      this.getData();
    }, Error => {
      localStorage.removeItem('My-Token');
      localStorage.clear();
      this._router.navigateByUrl('login');
      console.log('Đạo diễn: token không tồn tại');
    });
}


  // Get data from API
  getData() {

    // Call API and get database
    this.directorService.getData().subscribe(data => {

      // set data from database
      this.lstDirector = data;
    });
  }


  ngOnInit() {
    this.getData();
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngDoCheck(): void {
    // Called every time that the input properties of a component or a directive are checked.
    // Use it to extend change detection by performing a custom check.
    // Add 'implements DoCheck' to the class.

    this._DirectorNameValidate = '';
    this._DirectorImageValidate = '';
    this._DirectorDescribeValidate = '';


    if (this.directorName === '') {
      this._DirectorNameValidate = 'Tên đạo diễn không được bỏ trống !';
      this.doSubmit = false;
      console.log('Validate error director name is blank');

      this.isValidate = false;
      // return;
    }

    if (!this.rgxNoSpecialChar.test(this.directorName)) {
      this._DirectorNameValidate = 'Tên đạo diễn không được có kí tự đặc biệt !';
      this.doSubmit = false;
      console.log('Validate error director name');
      this.isValidate = false;
      // return;
    }

    if (this.directorDescribe === '') {
      this._DirectorDescribeValidate = 'Mô tả đạo diễn không được bỏ trống !';
      this.doSubmit = false;
      console.log('Validate error director describe is blank');
      this.isValidate = false;
      // return;
    }

    if (this.directorImg === '') {
      this._DirectorImageValidate = 'Hình ảnh đạo diễn không được bỏ trống !';
      this.doSubmit = false;
      console.log('Validate error director image is blank');
      this.isValidate = false;
      // return;
    }

    if (!this.isValidate) {
      return;
    }

    this.doSubmit = true;
  }

  // Add new director
  addDirector() {
    // create a new director
    const parameter = {
      'DirectorName': this.directorName,
      'DirectorGender': this.directorGender,
      'DirectorBirthday': this.directorBirthday,
      'DirectorDescribe': this.directorDescribe,
      'DirectorImg': this.directorImg,
      'DirectorStatus': true
    };

    // Call API and add new director to database
    this.directorService.addDirector(parameter).subscribe(data => {

      // Reload data on page
      this.getData();
    });

    // Reset data on modal
    this.ResetData();
  }

  // find director
  findEditDirector(i: number) {

    // Get information
    this.index = this.lstDirector.findIndex(d => d.DirectorID === i);
    this.directorName = this.lstDirector[this.index].DirectorName;
    this.directorGender = this.lstDirector[this.index].DirectorGender;
    this.directorDescribe = this.lstDirector[this.index].DirectorDescribe;
    this.directorStatus = this.lstDirector[this.index].DirectorStatus;
    this.directorImg = this.lstDirector[this.index].DirectorImg;
    this.directorBirthday = this.datepipe.transform(this.lstDirector[this.index].DirectorBirthday, 'yyyy-MM-dd');
  }

  // Edit director
  editDirector() {

    // Change information
    this.lstDirector[this.index].DirectorName = this.directorName;
    this.lstDirector[this.index].DirectorGender = this.directorGender;
    this.lstDirector[this.index].DirectorBirthday = this.directorBirthday;
    this.lstDirector[this.index].DirectorDescribe = this.directorDescribe;
    this.lstDirector[this.index].DirectorImg = this.directorImg;
    this.lstDirector[this.index].DirectorStatus = this.directorStatus;

    // Call API and edit director form database
    this.directorService.findEditDirector(this.lstDirector[this.index]).subscribe(data => {
      // Reload data on page
      this.getData();
    });

    // Reset data on modal
    this.ResetData();
  }

  // Update status director
  updateStatusDirector(i: number) {

    this.index = this.lstDirector.findIndex(d => d.DirectorID === i);

    this.director = this.lstDirector[this.index];

    // Call API and update director gender form database
    this.directorService.updateStatusDirector(this.director).subscribe(data => {
      // Reload data on page
      this.getData();
    });
  }

  // Delete director
  removeDirector(i) {

    // Call API and delete director form database
    this.directorService.removeDirector(i).subscribe(data => {
      // Reload data on page
      this.getData();
    });
  }

  // get data image and set text to input tag via ID attribute
  getImageDataAdd(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (Myevent: any) => {
        this.directorImg = Myevent.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
      // get data img
      this.directorImg = <string>this._sanitizer.bypassSecurityTrustResourceUrl(event.target.result);
      // set text file name add modal
      (<HTMLInputElement>document.getElementById('text')).value = event.target.files[0].name;
    }
  }

  // get data image and set text to input tag via ID attribute
  getImageDataModify(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (Myevent: any) => {
        this.directorImg = Myevent.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      // get data img
      this.directorImg = <string>this._sanitizer.bypassSecurityTrustResourceUrl(event.target.result);
      // set text file name add modal
      (<HTMLInputElement>document.getElementById('text_modify')).value = event.target.files[0].name;
    }
  }

  // Reset information on modal
  ResetData() {
    this.directorName = '';
    this.directorGender = true;
    this.directorStatus = true;
    this.directorImg = '';
    this.directorBirthday = this.datepipe.transform(Date.now(), 'yyyy-MM-dd');
    this.directorDescribe = '';
  }
}

