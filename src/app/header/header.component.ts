import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service'; // Importa el servicio UserService
import { User } from '../user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  searchTerm: string = '';
  isLoggedIn: boolean = false;
  user: User | undefined;

  constructor(private router: Router, 
              private authService: AuthService,
              private userService: UserService) { // Inyecta el servicio UserService
    this.isLoggedIn = this.isAuthenticated();
  }

  ngOnInit(): void {
    this.getUserByToken(); // Llama al método getUserByToken al inicializar el componente
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
      const token: string = localStorage.getItem('token') as string; // Convertir explícitamente a string
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
