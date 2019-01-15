import { Injectable } from '@angular/core';
import { Actor } from '../classActor';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActorServiceService {

  // Port
  private Port = 51215;
  // ulr
  private ActorRoute: string = 'http://localhost:' + this.Port.toString();

  // ---------------------- URL connect API-------------------------------------------------//
  private getAllActor = '/api/Actor/GetAllActor';
  // get actor by id
  private getActorbyID = `${this.ActorRoute}/api/Actor/GetActorById`;
  // post actor
  private PostActorToAPI = `${this.ActorRoute}/api/Actor/AddActor`;
  // put actor
  private PutActorToAPI = `${this.ActorRoute}/api/Actor/UpdateActor`;
  // Delete actor
  private DeleteActorToAPI = `${this.ActorRoute}/api/Actor/DeleteActor`;
  // GET : change status of actor
  private GetChangeStatusActor = `${this.ActorRoute}/api/Actor/EditStatusById`;
  // GET: search actor by name
  private searchByName = `${this.ActorRoute}/api/Actor/searchListActorByName?name=`;
  private BaseToken = this.ActorRoute + '/api/login/check';
  // --------------------------------------------------------------------------//

  // GET Method get all information of actor
  getActor(myToken): Observable<Array<Actor>> {
    const reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + myToken
    });
    return this.http.get<Array<Actor>>(this.ActorRoute + this.getAllActor, {
      headers: reqHeader
    });
  }

  // GET Method get a actor follow the id of actor
  getActorById(id: number, myToken): Observable<Actor> {
    const reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + myToken
    });
    return this.http.get<Actor>(`${this.getActorbyID}/${id}`, {
      headers: reqHeader
    });
  }

 // DELETE method remove a actor(delete a actor from database)
  removeActor(id: number, myToken): Observable<Actor> {
    const reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + myToken
    });
    return this.http.delete<Actor>(`${this.DeleteActorToAPI}/${id}`, {
      headers: reqHeader
    });
  }

  // POST method post a actor
  AddActorToAPI(actor: Actor, myToken): Observable<Actor> {
    const reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + myToken
    });
    // log to check paramater
    // console.log(actor);
    return this.http.post<Actor>(this.PostActorToAPI, actor, {
      headers: reqHeader
    });
  }

  // PUT Method help you update a actor
  UpdateActor(id: number , actor: Actor, myToken): Observable<Actor> {
    const reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + myToken
    });
    // log check paramater
    // console.log(actor);
    return this.http.put<Actor>(`${this.PutActorToAPI}/${id}`, actor, {
      headers: reqHeader
    });
  }

  // PUT this method help you change the status's actor
  ChangeStatusActor(id: number, myToken): Observable<Actor> {
    const reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + myToken
    });
    // log check paramater
    // console.log(id);
    return this.http.get<Actor>(`${this.GetChangeStatusActor}/${id}`, {
      headers: reqHeader
    });
  }

  // search actor by name
  searchActorByName(name: string, myToken): Observable<any> {
    const reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + myToken
    });
    return this.http.get<any>(`${this.searchByName}${name}`, {
      headers: reqHeader
    });
  }

  // send token to api
  sendToken(params): Observable<any> {
    return this.http.post(this.BaseToken, params);
  }

  // contructor
  constructor(private http: HttpClient) { }
}
