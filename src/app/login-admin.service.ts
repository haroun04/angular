import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginAdminService {

  constructor(private http: HttpClient) { }

  login(name: string, password: string): Observable<any> {
    const userData = { name, password };
    return this.http.post<any>('http://localhost:8080/api/auth/login/admin', userData);
  }
}
