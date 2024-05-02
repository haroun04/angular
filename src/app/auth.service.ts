import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;
  private authToken: string | null = null;

  constructor() {}

  login(name: string, password: string): void {
    // Lógica de inicio de sesión...
    this.loggedIn = true;
  }

  logout(): void {
    // Lógica de cierre de sesión...
    this.loggedIn = false;
  }


  isAuthenticated(): boolean {
    return this.loggedIn;
  }
}
