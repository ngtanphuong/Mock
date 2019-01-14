import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Type, Film } from '../shared/type.model';

@Injectable({
  providedIn: 'root'
})
export class DataTypeService {

  constructor(private http: HttpClient) { }

  // localhost API
  public UrlAPI     = 'http://localhost:51215/api/Types/';
  public Get        = this.UrlAPI + 'GetTypes';
  public GetID      = this.UrlAPI + 'GetType';
  public Post       = this.UrlAPI + 'InsertType';
  public Put        = this.UrlAPI + 'UpdateType';
  public Delete     = this.UrlAPI + 'DeleteType';
  public GetFilms   = this.UrlAPI + 'GetFilmByTypes';
  public BaseToken  = 'http://localhost:51215/api/login/check';

  // GET
  getData(token): Observable<Array<Type>> {
    const reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return this.http.get<Array<Type>>(this.Get, {
      headers: reqHeader
    });
  }

  // POST
  sendToken(params): Observable<any> {
    return this.http.post(this.BaseToken, params);
  }

  // GET ID
  getIdData(id, token): Observable<Type> {
    const reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return this.http.get<Type>(this.GetID + `/${id}`, {
      headers: reqHeader
    });
  }

  // GET Film By Type
  getFilmByType(id, token): Observable<any> {
    const reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return this.http.get(this.GetFilms + `/${id}`, {
      headers: reqHeader
    });
  }

  // POST
  postData(type, token): Observable<Type> {
    const reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return this.http.post<Type>(this.Post, type, {
      headers: reqHeader
    });
  }

  // DELETE
  deleteData(id, token): Observable<Type> {
    const reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return this.http.delete<Type>(this.Delete + `/${id}`, {
      headers: reqHeader
    });
  }

  // PUT
  putData(type, token): Observable<Type> {
    const reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return this.http.put<Type>(this.Put, type, {
      headers: reqHeader
    });
  }

}
