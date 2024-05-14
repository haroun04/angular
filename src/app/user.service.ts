import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/api/user'; 

  constructor(private http: HttpClient) { }

  getUserInfo(): Observable<User> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<User>(`${this.baseUrl}/me`, { headers });
  }

  getUserByToken(token: string): Observable<User> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<User>(`${this.baseUrl}/me`, { headers });
  }

  updateUser(id: number, user: User): Observable<User> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<User>(url, user);
  }

}
