import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  name: string = '';
  password: string = '';
  loginError: boolean = false; // Variable para controlar el mensaje de error

  constructor(private http: HttpClient, private router: Router) {}

  loginUser(): void {
    const userData = { name: this.name, password: this.password };

    this.http.post<any>('http://localhost:8080/api/users/login', userData).subscribe(
      response => {
        console.log('Login exitoso:', response);
        this.router.navigate(['/restaurants']); 
      },
      error => {
        console.error('Error en el login:', error);
        this.loginError = true;
      }
    );
  }
}
