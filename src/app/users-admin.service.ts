import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersAdmin } from './users-admin';

@Injectable({
  providedIn: 'root'
})
export class UsersAdminService {
  private baseUrl = 'http://localhost:8080/api/user';
  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<UsersAdmin[]> {
    return this.http.get<UsersAdmin[]>(this.baseUrl);
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${userId}`);
  }
}
