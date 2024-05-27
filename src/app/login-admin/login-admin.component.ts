import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginAdminService } from '../login-admin.service';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.css'
})
export class LoginAdminComponent {
  name: string = '';
  password: string = '';
  loginError: boolean = false; 

  constructor(private loginAdminService: LoginAdminService, private authService: AuthService, private router: Router) {}

  loginUser(): void {
    this.loginAdminService.login(this.name, this.password).subscribe(
      response => {
        console.log('Login exitoso:', response);
        localStorage.setItem('token', response.token);
        
        if (this.authService.isAuthenticated()) {
          this.router.navigate(['/indexAdmin']);
        } else {
          console.error('Error en la autenticación:', 'No se pudo verificar la autenticación del usuario');
          this.loginError = true;
        }
      },
      error => {
        console.error('Error en el login:', error);
        this.loginError = true;
      }
    );
  }
}