import { Component } from '@angular/core';
import { ReguisterService } from '../register.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Reguister } from '../register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  register: Reguister = { name: '', email: '', password: '' };
  emailPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
  passwordLength: number = 5; 
  errorMessage: string = '';

  constructor(private registerService: ReguisterService, private authService: AuthService, private router: Router) { }

  signUp(): void {
    this.errorMessage = ''; 

    if (!this.isValidEmail(this.register.email)) {
      this.errorMessage = 'El correo electrónico no es válido.';
      return;
    }

    if (this.register.password.length < this.passwordLength) {
      this.errorMessage = 'La contraseña debe tener al menos 5 caracteres.';
      return;
    }

    this.registerService.signUp(this.register)
      .subscribe(
        response => {
          console.log('Registro exitoso:', response);
          if (response.token) {
            localStorage.setItem('token', response.token);
          }
          console.log('Datos del usuario:', this.register);
          if (this.register.name !== undefined && this.register.password !== undefined) {
            this.router.navigate(['/index']);
          } else {
            this.errorMessage = 'Los campos name y password son requeridos.';
          }
        },
        error => {
          this.errorMessage = 'Error al registrarse: ' + (error.error.message || error.message);
        }
      );
  }

  isValidEmail(email: string): boolean {
    return this.emailPattern.test(email);
  }
}
