import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubDirector } from './classSubDirector';
import { DataFilmService } from '../film/data-film.service';


@Injectable({
  providedIn: 'root'
})
export class SubDirectorService {

  localToken = localStorage.getItem('My-Token');
  reqHeader = new HttpHeaders({
    'Authorization': 'Bearer ' + this.localToken
  });

  // Port
  private Port = 51215;
  // ulr
  private Route: string = 'http://localhost:' + this.Port.toString();
  // ---------------------- URL connect API-------------------------------------------------//
  private BaseToken = this.Route + '/api/login/check';
  private DeleteSubDirectorById = this.Route + '/api/SubDirector/DeleteSubDirectorById?idDirector=';
  private UrlAddSubDirector = this.Route + '/api/SubDirector/AddSubDirector';
  private GetlistAllSubDirector = this.Route + '/api/SubDirector/GetAllSubDirector';
  private GetSubDirectorByIdDirector = this.Route + '/api/SubDirector/GetSubDirectorByIdDirector?idDirector=';
  private GetSubDirectorByIdFilm = this.Route + '/api/SubDirector/GetSubDirectorByIdFilm?idFilm=';
  private GetListFilmByIdDirector = this.Route + '/api/SubDirector/GetListFilmByIdDirector?idDirector=';

  // --------------------------------------------------------------------------//

  // constructor
  constructor(private http: HttpClient, private filmService: DataFilmService) { }

  // Add subDirector
  AddSubActor(mySubDirector: SubDirector, myToken): Observable<any> {
    const reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + myToken
    });
    return this.http.post<any>(this.UrlAddSubDirector, mySubDirector, { headers: reqHeader });
  }

  // Get subdirector by Film's id
  GetSubDirectorByIDFilm(idFilm: number, myToken): Observable<any> {
    const reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + myToken
    });
    return this.http.get<any>(`${this.GetSubDirectorByIdFilm}${idFilm}`, { headers: reqHeader });
  }

  // Get subDirector by director id
  GetSubDirectorByIDDirector(idDirector: number, myToken): Observable<any> {
    const reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + myToken
    });
    return this.http.get<any>(`${this.GetSubDirectorByIdDirector}${idDirector}`, { headers: reqHeader });
  }

  // Get information of film
  GetListFilmOfFilmByIDDirector(id: number, myToken): Observable<any> {
    const reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + myToken
    });
    return this.http.get<any>(`${this.GetListFilmByIdDirector}${id}`, { headers: reqHeader });
  }


  // Get all subDirector from api
  GetAllSubDirector(myToken): Observable<any> {
    const reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + myToken
    });
    return this.http.get<any>(this.GetlistAllSubDirector, {
      headers: reqHeader
    });
  }

  // delete all SubDirector have Director's id
  removeSubActorById(idActor: number, myToken): Observable<any> {
    const reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + myToken
    });
    return this.http.delete<any>(`${this.DeleteSubDirectorById}${idActor}`, {
      headers: reqHeader
    });
  }

  // send token to api
  sendToken(params): Observable<any> {
    return this.http.post(this.BaseToken, params);
  }


}
