import { Director } from './classDirector';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
 getData(): Observable<any> {
   // return this.http.get(this.UrlAPI);
   return this.http.get(this.UrlAPI);
 }

 // send token
 sendToken(params): Observable<any> {
  return this.http.post(this.BaseToken, params);
}

 // Add new director
 addDirector(params): Observable<any> {
   return this.http.post(this.UrlAPI_Add, params);
 }

 // Remove director
 removeDirector(i): Observable<any> {
   return this.http.get(this.UrlAPI_Del + i);
 }

 findDirector(i): Observable<any> {
  return this.http.get(this.UrlAPI_FindID + i);
 }

 // Edit director
 findEditDirector(params): Observable<any> {
   return this.http.post(this.UrlAPI_Edit, params);
 }

 // Edit gender director
 updateStatusDirector(params): Observable<any> {
  return this.http.post(this.UrlAPI_UpdateStatus, params);
 }
}
