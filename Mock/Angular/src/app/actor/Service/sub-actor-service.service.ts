import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubActor } from '../classSubActor';
@Injectable({
  providedIn: 'root'
})
export class SubActorServiceService {

  // Port
  private Port = 51215;
  // ulr
  private Route: string = 'http://localhost:' + this.Port.toString();
  // ---------------------- URL connect API-------------------------------------------------//
  private BaseToken = this.Route + '/api/login/check';
  private DeleteSubActorById = this.Route + '/api/SubActor/DeleteSubActorById?idActor=';
  private UrlAddSubActor = this.Route + 'api/SubActor/AddSubActor';
  private GetlistAllSubActor = this.Route + 'api/SubActor/GetAllSubActor';
  private GetSubActorByIdActor = this.Route + 'api/SubActor/GetSubActorByIdFilm?idActor=';
  private GetSubActorByIdFilm = this.Route + 'api/SubActor/GetSubActorByIdFilm?idFilm=';
  // --------------------------------------------------------------------------//

  // Add subActor
  AddSubActor(mySubActor: SubActor, myToken): Observable<any> {
    const reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + myToken
    });
    return this.http.post<any>(this.UrlAddSubActor, mySubActor, { headers: reqHeader});
  }

  // Get subActor by Film's id
  GetSubActorByIDFilm(idFilm: number, myToken): Observable<any> {
    const reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + myToken
    });
    return this.http.get<any>(`${this.GetSubActorByIdFilm}${idFilm}`, { headers: reqHeader});
  }

  // Get subActor by Film's id
  GetSubActorByIDActor(idActor: number, myToken): Observable<any> {
    const reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + myToken
    });
    return this.http.get<any>(`${this.GetSubActorByIdActor}${idActor}`, { headers: reqHeader});
  }

  // Get all subActor from api
  GetAllSubActor(myToken): Observable<any> {
    const reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + myToken
    });
    return this.http.get<any>(this.GetlistAllSubActor, {
      headers: reqHeader
    });
  }

  // delete all SubActor have Actor's id
  removeSubActorById(idActor: number, myToken): Observable<any> {
    const reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + myToken
    });
    return this.http.delete<any>(`${this.DeleteSubActorById}${idActor}`, {
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
