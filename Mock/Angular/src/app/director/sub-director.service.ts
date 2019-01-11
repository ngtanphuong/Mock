import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


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
  // --------------------------------------------------------------------------//

  removeSubDirectorById(idDirector: number): Observable<any> {
    return this.http.delete<any>(`${this.DeleteSubDirectorById}${idDirector}`, {
      headers: this.reqHeader
    });
  }

  sendToken(params): Observable<any> {
    return this.http.post(this.BaseToken, params, {
      headers: this.reqHeader
    });
  }
  // constructor
  constructor(private http: HttpClient) { }
}
