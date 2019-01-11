import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataLoginService {

  // port mặc định
  private BasePort = '51215';
  // đương dẫn mặc định
  private BaseUrl = 'http://localhost:' + this.BasePort + '/api/login/login';
  private BaseToken = 'http://localhost:' + this.BasePort + '/api/login/check';

  // hàm dựng
  constructor(private http: HttpClient) { }

  // đăng nhập
  doLogin(params): Observable<any> {
    return this.http.post(this.BaseUrl, params);
  }

  sendToken(params): Observable<any> {
    return this.http.post(this.BaseToken, params);
  }
}
