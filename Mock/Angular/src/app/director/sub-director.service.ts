import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubDirector } from './classSubDirector';


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
  private DeleteSubDirectorById = this.Route + '/api/SubActor/DeleteSubDirectorById?idDirector=';
  private UrlAddSubDirector = this.Route + 'api/SubActor/AddSubActor';
  private GetlistAllSubDirector = this.Route + 'api/SubActor/GetAllSubActor';
  private GetSubDirectorByIdDirector = this.Route + 'api/SubActor/GetSubActorByIdFilm?idActor=';
  private GetSubDirectorByIdFilm = this.Route + 'api/SubActor/GetSubActorByIdFilm?idFilm=';
  // --------------------------------------------------------------------------//

// Add subDirector
AddSubActor(mySubDirector: SubDirector, myToken): Observable<any> {
  const reqHeader = new HttpHeaders({
    'Authorization': 'Bearer ' + myToken
  });
  return this.http.post<any>(this.UrlAddSubDirector, mySubDirector, { headers: reqHeader});
}

// Get subdirector by Film's id
GetSubDirectorByIDFilm(idFilm: number, myToken): Observable<any> {
  const reqHeader = new HttpHeaders({
    'Authorization': 'Bearer ' + myToken
  });
  return this.http.get<any>(`${this.GetSubDirectorByIdFilm}${idFilm}`, { headers: reqHeader});
}

// Get subDirector by director id
GetSubDirectorByIDDirector(idDirector: number, myToken): Observable<any> {
  const reqHeader = new HttpHeaders({
    'Authorization': 'Bearer ' + myToken
  });
  return this.http.get<any>(`${this.GetSubDirectorByIdDirector}${idDirector}`, { headers: reqHeader});
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

// constructor
constructor(private http: HttpClient) { }
}
