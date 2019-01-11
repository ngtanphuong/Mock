import { HttpClient, HttpHeaders  } from '@angular/common/http';
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
  private UrlAPI_FindID = this.BaseUrl + 'FindFilmByID/';
  private UrlAPI_Edit = this.BaseUrl + 'EditFilm/';
  private UrlAPI_EditStatut = this.BaseUrl + 'EditStatustFilm/';

  // hàm dựng
  constructor(private http: HttpClient) { }

  // lấy dữ liệu từ server
  getData(token): Observable<any> {
    const reqHeader = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    return this.http.get(this.UrlAPI,  {
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
}
