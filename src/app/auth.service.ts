import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;
  private authTokenKey = 'authToken';
  private userDataEndpoint = '/api/user'; 

  constructor(private http: HttpClient) {
    this.loggedIn = this.isAuthenticated();
  }

  login(name: string, password: string): void {
    this.loggedIn = true;
    const token = 'your-auth-token';
    localStorage.setItem(this.authTokenKey, token);
  }

  logout(): void {
    this.loggedIn = false;
    localStorage.removeItem(this.authTokenKey);
  }

  isAuthenticated(): boolean {
    const authToken = localStorage.getItem(this.authTokenKey);
    return authToken !== null;
  }

  getUserData(): Observable<any> {
    const authToken = localStorage.getItem(this.authTokenKey);
    const headers = { Authorization: `Bearer ${authToken}` };
    return this.http.get<any>(this.userDataEndpoint, { headers });
  }
}
