import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;
  private authTokenKey = 'authToken'; 

  constructor() {
    
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
    if (typeof localStorage !== 'undefined') {
      
      const authToken = localStorage.getItem(this.authTokenKey);
      return authToken !== null; 
    } else {
      
      return false;
    }
  }
}
