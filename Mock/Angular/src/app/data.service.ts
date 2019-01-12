import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private films = new BehaviorSubject<any>([]);
  film = this.films.asObservable();

  private directors = new BehaviorSubject<any>([]);
  director = this.directors.asObservable();
  constructor() { }
 ngOnInit() {
  }

  addFilm(film) {

  }

  changeFilm(film) {
    this.films.next(film);
  }

  addDirector(director) {

  }

  changeDirector(director) {
    this.directors.next(director);
  }


}
