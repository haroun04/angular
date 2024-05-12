import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  userData: any; // Almacena los datos del usuario

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.getUserData();
  }

  // Método para obtener los datos del usuario
  getUserData(): void {
    this.authService.getUserData().subscribe(
      data => {
        this.userData = data;
      },
      error => {
        console.error('Error al obtener los datos del usuario:', error);
      }
    );
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
