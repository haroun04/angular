import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  searchTerm: string = '';
  isLoggedIn: boolean = false;

  constructor(private router: Router, private authService: AuthService) {
    this.isLoggedIn = this.isAuthenticated();
  }

  searchRestaurant(): void {
    if (this.searchTerm.trim() !== '') {
      this.router.navigate(['/search-results'], { queryParams: { searchTerm: this.searchTerm } });
    }
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/index']);
  }

}
