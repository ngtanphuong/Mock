import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // port mặc định
  private BasePort = '51215';
  private BaseToken = 'http://localhost:' + this.BasePort + '/api/login/check';

  private films = new BehaviorSubject<any>([]);
  film = this.films.asObservable();

  private directors = new BehaviorSubject<any>([]);
  director = this.directors.asObservable();
  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {

  }

  sendToken(params): Observable<any> {
    return this.http.post(this.BaseToken, params);
  }


}
