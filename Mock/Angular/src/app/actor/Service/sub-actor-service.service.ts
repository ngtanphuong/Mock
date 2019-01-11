import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
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
  // --------------------------------------------------------------------------//

  removeSubActorById(idActor: number, myToken): Observable<any> {
    const reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + myToken
    });
    return this.http.delete<any>(`${this.DeleteSubActorById}${idActor}`, {
      headers: reqHeader
    });
  }

  sendToken(params): Observable<any> {
    return this.http.post(this.BaseToken, params);
  }
  // constructor
  constructor(private http: HttpClient) { }
}
