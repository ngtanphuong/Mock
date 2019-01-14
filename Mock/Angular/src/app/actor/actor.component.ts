import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { Actor } from './classActor';
import { ActorServiceService } from './Service/actor-service.service';
import { SubActorServiceService } from './Service/sub-actor-service.service';
import { _sanitizeHtml } from '@angular/core/src/sanitization/html_sanitizer';
import { _sanitizeUrl } from '@angular/core/src/sanitization/url_sanitizer';
import { NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    ActorServiceService
  ],
  imports: [
    NgxPaginationModule,
    NgbDatepicker]
})

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.scss']
})
export class ActorComponent implements OnInit {

  @Input() tokenData: string;
  // time (milisecond) to request server ( check user is active)
  timeRequest =  60 * 15 * 1000; // default 15  mimute

  // store your token in localStorage
  localToken = localStorage.getItem('My-Token');
  // button,... name
  nameBtn = 'Thêm';
  // check Validate name
  checkName = false;
  // regular expression(no special characters)
  rgxSpecialChar = new RegExp('^[\^\;!@#$%^&*\(\\)\\{\\}\\+\\-\_+:|<>?~\\\\/\\[\.,\'\\"\\]\\`\]*$');
  // property
  // list actor
  lstActor = [];

  tActor: Actor;
  rowCount = 5;
  // search input binding
  nameSearch: string;
  // obj actor binding
  actorID: number;
  Name: string;
  Image: string;
  ImageName: string;
  Gender: boolean;
  Birthday = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
  Describe: string;
  status: boolean;

  // error message
  errorMessage = '';

  // current time for datatimepicker
  today: string = new Date().toString();
  // contructor
  constructor(private Actordata: ActorServiceService,
    private _sanitizer: DomSanitizer,
    private _router: Router,
    private datepipe: DatePipe,
    private SubActor: SubActorServiceService) {
    console.log(this.localToken);
    if (this.localToken == null) {
      this._router.navigateByUrl('login');
      console.log('Phim: token không tồn tại! đăng nhập lại');
    } else {
      console.log('Phim: local token: ' + this.localToken);
      this.checkToken();
    }
  }
  // --------------------Method with api--------------------------------------------
  checkToken() {
    const params = {
      'Token': this.localToken
    };

    this.Actordata.sendToken(params).subscribe(data => {
      console.log('Phim: token hợp lệ');
      console.log(data);
    this.getAllActor();
      return 1;
    }, Error => {
      localStorage.removeItem('My-Token');
      localStorage.clear();
      this._router.navigateByUrl('login');
      console.log('Phim: token không tồn tại');
      return -1;
    });
  }

  searchlistActor() {
    if (this.nameSearch === '') {
      this.getAllActor();
      return;
    }
    console.log('search value' + this.nameSearch);
    this.Actordata.searchActorByName(this.nameSearch, this.localToken).subscribe(res => this.lstActor = res);
  }

  // position pagination ----------------
  // if (p == null) {
  //   p = 1;
  // }
  // i = i + (this.rowCount * (p - 1));
  // ------------------------------------
  DeleteSubActor(id: number) {
    this.SubActor.removeSubActorById(id, this.localToken).subscribe(
      res => {console.log('OK Xóa thành công!'); });
  }
  /**
   * Remove the Actor
   */
  RemoveActor() {
    // log to check id actor
    console.log(this.actorID);
    this.DeleteSubActor(this.actorID);
    this.Actordata.removeActor(this.actorID, this.localToken).subscribe(
      res => {
        this.getAllActor();
        console.log('xóa ok rồi nè senpai <3');
      });
  }

  // add new  actor
  AddActor() {
    if (!this.checkName) {
      console.log(this.Name);
      // Create actor
      this.tActor = this.CreateActor(this.Name, this.Image, this.Gender, this.Birthday, this.Describe, this.status);
      // console.log(this.tActor);
      if (this.tActor != null) {
        // Subscribe
        this.Actordata.AddActorToAPI(this.tActor, this.localToken).subscribe(data => this.getAllActor());
      }
    } else {
      // set default value
      this.SetDefaultDataBinding();
      alert('Oops !Tên nhập vào không hợp lệ !');
    }
  }
  // Change
  ChangeStatus(actor: Actor) {
    this.SetActorIDFromModal(actor.ActorID);
    console.log(this.actorID);
    this.Actordata.ChangeStatusActor(actor.ActorID, this.localToken).subscribe(
      res => {
        console.log('Change status sucess');
        this.getAllActor();
      });
  }

  // Modify a Actor at position i
  ModifyActor() {
    if (!this.checkName) {
      this.tActor = new Actor();
      // create actor
      this.tActor = this.CreateActor(this.Name, this.Image, this.Gender, this.Birthday, this.Describe, this.status);
      // console.log(this.actorID); // log to check ID is right :)
      // update actor via service
      this.Actordata.UpdateActor(this.actorID, this.tActor, this.localToken).subscribe(res => this.getAllActor());
      // set default value
      this.SetDefaultDataBinding();
    } else {
      this.Name = '';
      alert('Oops !Tên nhập vào không hợp lệ !');
    }
  }

  getAllActor() {
    this.Actordata.getActor(this.localToken).subscribe(res => {
      this.lstActor = res;
      console.log(this.lstActor);
    });
  }
  // --------------------method not use api------------------------------------------
  /**
  * Creating a actor
  */
 CreateActor(name: string, img: string, gender: boolean, birthday, Describe: string, Status: boolean): Actor {
  const actor = new Actor();
  actor.ActorName = name;
  actor.Img = img;
  actor.Birthday = birthday;
  actor.Gender = gender;
  actor.Describe = Describe;
  actor.Status = Status;
  return actor;
}

// Set default data binding
SetDefaultDataBinding() {
  this.tActor = null;
  this.Name = '';
  this.Gender = true;
  this.Describe = '';
  this.ImageName = '';
  this.Image = '';
  this.Birthday = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
  this.status = true;
}
  // Set actor id
  SetActorIDFromModal(id: number) {
    // console.log("actor id: "+ id);
    this.actorID = id;
  }

  // Set actor entity anad image name
  SetActorFromModal(actor: Actor, nameImg: string) {
    this.tActor = actor;
    this.Name = actor.ActorName;
    this.Image = actor.Img;
    this.ImageName = nameImg;
    this.Gender = actor.Gender;
    this.Birthday = this.datepipe.transform(actor.Birthday, 'yyyy-MM-dd');
    this.Describe = actor.Describe;
    this.status = actor.Status;
  }
  // get data image and set text to input tag via ID attribute
  getImageData(event: any, id?: string) {
    this.ImageName = '';
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (Myevent: any) => {
        this.Image = Myevent.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      // get data img
      this.Image = <string>this._sanitizer.bypassSecurityTrustResourceUrl(event.target.result);
      // set text file name add modal
      this.ImageName = event.target.files[0].name;
      (<HTMLInputElement>document.getElementById(id)).value = this.ImageName;
    }
  }
  // -----------------------Lifecycle Hooks------------------------ //
  // tslint:disable-next-line:use-life-cycle-interface
  ngDoCheck() {
    // Called every time that the input properties of a component or a directive are checked.
    // Use it to extend change detection by performing a custom check.
    // Add 'implements DoCheck' to the class.
    // console.log(!this.rgxSpecialChar.exec(this.Name));
    if (this.Name === '') {
      this.errorMessage = 'Tên diễn viên không được rỗng';
      this.checkName = true; // have special character => show
      return;
    }
    if (!this.rgxSpecialChar.test(this.Name)) {
      this.errorMessage = 'Tên diễn viên có kí tự đặc biệt.';
      this.checkName = true;
      return;
    }
      this.errorMessage = ' ';
      this.checkName = false;
      // setInterval(() => {this.checkToken(); }, 3000);
  }

  ngOnInit() {
    this.getAllActor();
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterContentChecked(): void {
    // Called after every check of the component's or directive's content.
    // Add 'implements AfterContentChecked' to the class.
  }
}
