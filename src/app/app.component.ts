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

  // Método para verificar si la ruta actual es la de inicio de sesión
  isLoginPage(): boolean {
    return this.router.url === '/login';
  }

  // Método para verificar si la ruta actual es la de registro
  isRegisterPage(): boolean {
    return this.router.url === '/register';
  }
}
