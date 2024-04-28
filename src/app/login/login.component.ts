import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  name: string = '';
  password: string = '';
  loginError: boolean = false; 

  constructor(private loginService: LoginService, private router: Router) {}

  loginUser(): void {
    this.loginService.login(this.name, this.password).subscribe(
      response => {
        console.log('Login exitoso:', response);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/index']);
      },
      error => {
        console.error('Error en el login:', error);
        this.loginError = true;
      }
    );
  }
}