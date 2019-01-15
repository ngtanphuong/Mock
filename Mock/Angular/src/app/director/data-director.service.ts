import { Director } from './classDirector';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DataDirectorService {

  // Port default
  private DefaultPort = '51215';

  // Default path
  private DefaultUrl = 'http://localhost:' + this.DefaultPort + '/api/director/';

  // API token
  private BaseToken = 'http://localhost:' + this.DefaultPort + '/api/login/check';

  // API
  private UrlAPI = this.DefaultUrl + 'getalldirectors/';
  private UrlAPI_Add = this.DefaultUrl + 'AddNewDirector/';
  private UrlAPI_Del = this.DefaultUrl + 'RemoveDirectorByID/';
  private UrlAPI_FindID = this.DefaultUrl + 'FindDirectorByID/';
  private UrlAPI_Edit = this.DefaultUrl + 'EditDirector/';
  private UrlAPI_UpdateStatus = this.DefaultUrl + 'UpdateStatusDirectorByID/';

  // Constructer
  constructor(private http: HttpClient) { }

  // Get data from server
  getData(token): Observable<any> {
    const reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return this.http.get(this.UrlAPI,  {
      headers: reqHeader
    });
  }

  // send token
  sendToken(params): Observable<any> {
    return this.http.post(this.BaseToken, params);
  }

  // Add new director
  addDirector(params, token): Observable<any> {
    const reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return this.http.post(this.UrlAPI_Add, params, {
      headers: reqHeader
    });
  }

  // Remove director
  removeDirector(i, token): Observable<any> {
    const reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return this.http.get(this.UrlAPI_Del + i, {
      headers: reqHeader
    });
  }

  // search director
  findDirector(i, token): Observable<any> {
    const reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    return this.http.get(this.UrlAPI_FindID + i,  {
      headers: reqHeader
    });
  }

  // Edit director
  findEditDirector(params, token): Observable<any> {
    const reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    return this.http.post(this.UrlAPI_Edit, params,  {
      headers: reqHeader
    });
  }

  // Edit gender director
  updateStatusDirector(i, token): Observable<any> {
    const reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return this.http.get(this.UrlAPI_UpdateStatus + i,  {
      headers: reqHeader
    });
  }
}
