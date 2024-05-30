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
  register: Reguister = { name: '', email:'', password: ''};
  emailPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
  passwordLength: number = 5; 

  constructor(private registerService: ReguisterService, private authService: AuthService, private router: Router) { }

  signUp(): void {
    if (!this.isValidEmail(this.register.email)) {
      console.error('Error al registrarse: El correo electrónico no es válido.');
      return;
    }

    if (this.register.password.length < this.passwordLength) {
      console.error('Error al registrarse: La contraseña debe tener al menos 5 caracteres.');
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
            console.error('Error al registrarse: Los campos name y password son requeridos.');
          }
        },
        error => {
          console.error('Error al registrarse:', error);
        }
      );
  }

  isValidEmail(email: string): boolean {
    return this.emailPattern.test(email);
  }
}
