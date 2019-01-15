import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UserDataService } from '../../user-data.service';
import { User, FavoriteFilm } from '../../user';


@Component({
  selector: 'app-favorite-film',
  templateUrl: './favorite-film.component.html',
  styleUrls: ['./favorite-film.component.scss']
})
export class FavoriteFilmComponent implements OnInit {

  constructor(private _sanitizer: DomSanitizer, private _data: UserDataService) {
  }
  @Input() currentId;
  favoriteFilm = new Array<FavoriteFilm>();
  ngOnInit() {

    this._data.GetFavoriteFilm(this.currentId).subscribe(res => { this.favoriteFilm = res; });
    console.log(this.currentId);

  }
  ghilog() {
    console.log(this.favoriteFilm);
  }
  // get data image and set text to input tag via ID attribute
  // getImageData(event: any, id?: string) {
  //   // this.ImageName = '';
  //   if (event.target.files && event.target.files[0]) {
  //     const reader = new FileReader();

  //     reader.onload = (Myevent: any) => {
  //       this.Image = Myevent.target.result;
  //     };
  //     reader.readAsDataURL(event.target.files[0]);
  //     // get data img
  //     this.Image = <string>this._sanitizer.bypassSecurityTrustResourceUrl(event.target.result);
  //     // set text file name add modal
  //     // this.ImageName = event.target.files[0].name;
  //     // (<HTMLInputElement>document.getElementById(id)).value = this.ImageName;
  //   }
  // }

}
