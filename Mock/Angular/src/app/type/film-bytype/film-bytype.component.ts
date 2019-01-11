import { Component, OnInit } from '@angular/core';
import { DataTypeService } from 'src/app/type/Shared/data-type.service';
import { Type, Actor, Director } from '../shared/type.model';
@Component({
  selector: 'app-film-bytype',
  templateUrl: './film-bytype.component.html',
  styleUrls: ['./film-bytype.component.scss']
})
export class FilmBytypeComponent implements OnInit {
  // thuộc tính diễn viên
  type: Type;
  Types: any = [];

  // thuộc tính diễn viên
  actor: Actor;
  Actors: any = [];

  // Thuộc tính đạo diễn
  director: Director;
  directors: any = [];

  // Thuộc tính phim
  Films: any = [];
  idFilm: number;
  nameFilm: string;
  img: string;
  describe: string;
  rate: string;
  year: Date;
  status: boolean;
  constructor(private _data: DataTypeService) { }

  ngOnInit() {
  }

  // Lấy danh sách phim theo thể loại
  // getDataByType(id: number) {
  //   this._data.getFilmByType(id).subscribe(res => {
  //     this.Films = res;
  //   });
  // }

  showFilmByType(i, p) {
    if (p == null) {
      p = 1;
    }
    i = i + (4 * (p - 1));
    const id: number = this.Types[i].TypeID;
    this._data.getFilmByType(id).subscribe(res => {
        });
  }
}
