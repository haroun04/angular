import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  name: string = '';
  password: string = '';
  loginError: boolean = false; 

  constructor(private loginService: LoginService, private authService: AuthService, private router: Router) {}

  loginUser(): void {
    this.loginService.login(this.name, this.password).subscribe(
      response => {
        console.log('Login exitoso:', response);
        localStorage.setItem('token', response.token);
        
        if (this.authService.isAuthenticated()) {
          this.router.navigate(['/index']);
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
