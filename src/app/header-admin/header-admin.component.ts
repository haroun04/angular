import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service'; 
import { User } from '../user';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrl: './header-admin.component.css'
})
export class HeaderAdminComponent implements OnInit {
  searchTerm: string = '';
  isLoggedIn: boolean = false;
  user: User | undefined;

  constructor(private router: Router,
              private authService: AuthService,
              private userService: UserService) {
    this.isLoggedIn = this.isAuthenticated();
  }

  ngOnInit(): void {
    this.getUserByToken();
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

  getUserByToken(): void {
    if (typeof localStorage !== undefined && localStorage.getItem('token') !== null) {
      const token: string = localStorage.getItem('token') as string; // Convertir a string
      this.userService.getUserByToken(token).subscribe(
        (user: User) => {
          this.user = user;
        },
        (error) => {
          console.error('Error al obtener el usuario:', error);
        }
      );
    } else {
      console.error('No se encontró el token en el localStorage');
    }
  }




}
