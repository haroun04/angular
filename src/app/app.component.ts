import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EatEasy';

  constructor(private router: Router) {}


  isLoginPage(): boolean {
    return this.router.url === '/login';
  }

  isAdminIndex(): boolean {
    const adminroutes = ['/indexAdmin', '/reviewAdmin', '/usersAdmin', '/createRestAdmin'];
    const currentUrl = this.router.url;
    if (currentUrl.startsWith('/updateAdmin')) {
      return true;
    }
    return adminroutes.includes(currentUrl);
  }
  
  
  isRegisterPage(): boolean {
    return this.router.url === '/register';
  }
}
