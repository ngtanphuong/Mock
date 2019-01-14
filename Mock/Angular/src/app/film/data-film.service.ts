import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataFilmService {

  // port mặc định
  private BasePort = '51215';
  // đương dẫn mặc định
  private BaseUrl = 'http://localhost:' + this.BasePort + '/api/film/';



  private BaseToken = 'http://localhost:' + this.BasePort + '/api/login/check';
  // API
  private UrlAPI = this.BaseUrl + 'GetAllListFilm/';
  private UrlAPI_Add = this.BaseUrl + 'AddNewFilm/';
  private UrlAPI_Del = this.BaseUrl + 'DeleteFilm/';
  private UrlAPI_FindName = this.BaseUrl + 'FindFilmByName/';
  private UrlAPI_FindID = this.BaseUrl + 'FindFilmByID/';
  private UrlAPI_Edit = this.BaseUrl + 'EditFilm/';
  private UrlAPI_EditStatut = this.BaseUrl + 'EditStatustFilm/';

  private BaseUrl_Type = 'http://localhost:' + this.BasePort + '/api/types/';
  private UrlAPI_FindType = this.BaseUrl_Type + 'GetAllListTypeByFilmID/';
  private UrlAPI_FindTypeNotIn = this.BaseUrl_Type + 'GetAllListTypeNotInFilmByFilmID/';
  private UrlAPI_AddTypeFilm = this.BaseUrl_Type + 'AddNewTypeForFilm/';
  private UrlAPI_RemoveTypeFilm = this.BaseUrl_Type + 'RemoveTypeForFilm/';

  private BaseUrl_Actor = 'http://localhost:' + this.BasePort + '/api/Actor/';
  private UrlAPI_FindActor = this.BaseUrl_Actor + 'GetAllListActorByFilmID/';
  private UrlAPI_FindActorNotIn = this.BaseUrl_Actor + 'GetAllListActorNotInFilmByFilmID/';
  private UrlAPI_AddActorFilm = this.BaseUrl_Actor + 'AddNewActorForFilm/';
  private UrlAPI_RemoveActorFilm = this.BaseUrl_Actor + 'RemoveActorForFilm/';

  private BaseUrl_Director = 'http://localhost:' + this.BasePort + '/api/Director/';
  private UrlAPI_FindDirector = this.BaseUrl_Director + 'GetAllListDirectorByFilmID/';
  private UrlAPI_FindDirectorNotIn = this.BaseUrl_Director + 'GetAllListDirectorNotInFilmByFilmID/';
  private UrlAPI_AddDirectorFilm = this.BaseUrl_Director + 'AddNewDirectorForFilm/';
  private UrlAPI_RemoveDirectorFilm = this.BaseUrl_Director + 'RemoveDirectorForFilm/';

  // hàm dựng
  constructor(private http: HttpClient) { }

  // lấy dữ liệu từ server
  getData(token): Observable<any> {
    const reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return this.http.get(this.UrlAPI, {
      headers: reqHeader
    });
  }

  searchData(token, name): Observable<any> {
    const reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return this.http.get(this.UrlAPI_FindName + name, {
      headers: reqHeader
    });
  }

  sendToken(params): Observable<any> {
    return this.http.post(this.BaseToken, params);
  }

  // thêm phim mới
  addFilm(params, token): Observable<any> {
    const reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return this.http.post(this.UrlAPI_Add, params, {
      headers: reqHeader
    });
  }

  // xóa phim
  removeFilm(i, token): Observable<any> {
    const reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return this.http.get(this.UrlAPI_Del + i, {
      headers: reqHeader
    });
  }

  // cập nhật trạng thái
  updateStatusFilm(i, token): Observable<any> {
    const reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return this.http.get(this.UrlAPI_EditStatut + i, {
      headers: reqHeader
    });
  }

  // tìm phim theo ID
  findEditFilm(id, token): Observable<any> {
    const reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return this.http.get(this.UrlAPI_FindID + id, {
      headers: reqHeader
    });
  }

  // chỉnh sữa phim
  editFilm(params, token): Observable<any> {
    const reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return this.http.post(this.UrlAPI_Edit, params, {
      headers: reqHeader
    });
  }

  // ############################## TYPE #######################################
  // tìm phim theo ID
  findTypeByFilmID(id, token): Observable<any> {
    const reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return this.http.get(this.UrlAPI_FindType + id, {
      headers: reqHeader
    });
  }

  // tìm phim theo ID
  findTypeNotInByFilmID(id, token): Observable<any> {
    const reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return this.http.get(this.UrlAPI_FindTypeNotIn + id, {
      headers: reqHeader
    });
  }

  updateAddTypeFilm(params, token): Observable<any> {
    const reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return this.http.post(this.UrlAPI_AddTypeFilm, params, {
      headers: reqHeader
    });
  }

  updateRemoveTypeFilm(params, token): Observable<any> {
    const reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return this.http.post(this.UrlAPI_RemoveTypeFilm, params, {
      headers: reqHeader
    });
  }


  // ############################## TYPE #######################################
  // tìm phim theo ID
  findActorByFilmID(id, token): Observable<any> {
    const reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return this.http.get(this.UrlAPI_FindActor + id, {
      headers: reqHeader
    });
  }

  // tìm phim theo ID
  findActorNotInByFilmID(id, token): Observable<any> {
    const reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return this.http.get(this.UrlAPI_FindActorNotIn + id, {
      headers: reqHeader
    });
  }

  updateAddActorFilm(params, token): Observable<any> {
    const reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return this.http.post(this.UrlAPI_AddActorFilm, params, {
      headers: reqHeader
    });
  }

  updateRemoveActorFilm(params, token): Observable<any> {
    const reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return this.http.post(this.UrlAPI_RemoveActorFilm, params, {
      headers: reqHeader
    });
  }

  // ############################## DIRECTOR #######################################
  // tìm phim theo ID
  findDirectorByFilmID(id, token): Observable<any> {
    const reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return this.http.get(this.UrlAPI_FindDirector + id, {
      headers: reqHeader
    });
  }

  // tìm phim theo ID
  findDirectorNotInByFilmID(id, token): Observable<any> {
    const reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return this.http.get(this.UrlAPI_FindDirectorNotIn + id, {
      headers: reqHeader
    });
  }

  updateAddDirectorFilm(params, token): Observable<any> {
    const reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return this.http.post(this.UrlAPI_AddDirectorFilm, params, {
      headers: reqHeader
    });
  }

  updateRemoveDirectorFilm(params, token): Observable<any> {
    const reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return this.http.post(this.UrlAPI_RemoveDirectorFilm, params, {
      headers: reqHeader
    });
  }
}
