import { Director } from './classDirector';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import '../../assets/js/material-kit.min.js';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { _sanitizeHtml } from '@angular/core/src/sanitization/html_sanitizer';
import { _sanitizeUrl } from '@angular/core/src/sanitization/url_sanitizer';
import { DomSanitizer } from '@angular/platform-browser';
import { DataDirectorService } from './data-director.service';
import { SubDirectorService } from './sub-director.service';

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
  indexDelete: number;
  idDirectorDelete: number;
  directorNameDelete: string;

  // Validate
  _DirectorNameValidate: string;
  _DirectorImageValidate: string;
  _DirectorDescribeValidate: string;
  isValidate: false;

  rgxNoSpecialChar = new RegExp('^[\^\;!@#$%^&*\(\\)\\{\\}\\+\\-\_+:|<>?~\\\\/\\[\.,\'\\"\\]\\`\]*$');

  doSubmit: boolean;

  // Constructor: get data
  constructor(private http: HttpClient, private _sanitizer: DomSanitizer, public datepipe: DatePipe,
    private directorService: DataDirectorService, private _router: Router) {

    //  console.log(this.localToken);
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
      this._DirectorNameValidate = '(*) Tên đạo diễn không được bỏ trống !';
      this.doSubmit = false;
      console.log('Validate error director name is blank');

      this.isValidate = false;
    }

    if (!this.rgxNoSpecialChar.test(this.directorName)) {
      this._DirectorNameValidate = '(*) Tên đạo diễn không được có kí tự đặc biệt !';
      this.doSubmit = false;
      console.log('Validate error director name');
      this.isValidate = false;
    }

    if (this.directorDescribe === '') {
      this._DirectorDescribeValidate = '(*) Mô tả đạo diễn không được bỏ trống !';
      this.doSubmit = false;
      console.log('Validate error director describe is blank');
      this.isValidate = false;
    }

    if (this.directorImg === '') {
      this._DirectorImageValidate = '(*) Hình ảnh đạo diễn không được bỏ trống !';
      this.doSubmit = false;
      console.log('Validate error director image is blank');
      this.isValidate = false;
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
      'DirectorStatus': this.directorStatus
    };

    if ( this.directorName === '' || this.directorImg === '' || this.directorDescribe === '') {
      console.log('YAMETE !');
      return 'YAMETE !';
    }

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

  findDirectorDelete(i: number) {

    // Find
    this.indexDelete = this.lstDirector.findIndex(d => d.DirectorID === i);
    this.idDirectorDelete = i;
    this.directorNameDelete = this.lstDirector[this.indexDelete].DirectorName;
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
    // Call API and update director gender form database
    this.directorService.updateStatusDirector(i).subscribe(data => {
      // Reload data on page
      this.getData();
    });
  }

  // Delete director
  removeDirector() {

   // Call API and delete director form database
    this.directorService.removeDirector(this.idDirectorDelete).subscribe(data => {
    // Reload data on page
      this.getData();
    });
  }

  // get data image and set text to input tag via ID attribute
  getImageDataAndName(event: any, id: string) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (Myevent: any) => {
        this.directorImg = Myevent.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      // get data img
      this.directorImg = <string>this._sanitizer.bypassSecurityTrustResourceUrl(event.target.result);
      // set text file name add modal
      (<HTMLInputElement>document.getElementById(id)).value = event.target.files[0].name;
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

