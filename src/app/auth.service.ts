import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authTokenKey = 'token';
  private userDataEndpoint = '/api/user'; 

  constructor(private http: HttpClient) {}

  logout(): void {
    localStorage.removeItem(this.authTokenKey);
  }

  isAuthenticated(): boolean {
    const authToken = localStorage.getItem(this.authTokenKey);
    return authToken !== null;
  }

  fetchUserData(): Observable<any> {
    if (!this.isAuthenticated()) {
      throw new Error('User is not authenticated.');
    }
    const authToken = localStorage.getItem(this.authTokenKey);
    const headers = { Authorization: `Bearer ${authToken}` };
    return this.http.get<any>(this.userDataEndpoint, { headers });
  }


}
