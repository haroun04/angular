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
  register: Reguister = { name: '', email:'' ,password: ''};

  constructor(private registerService: ReguisterService, private authService: AuthService,  private router: Router) { }

  signUp(): void {
    this.registerService.signUp(this.register)
      .subscribe(
        response => {
          console.log('Registro exitoso:', response);
          console.log('Datos del usuario:', this.register);
          if (this.register.name !== undefined && this.register.password !== undefined) {
            this.authService.login(this.register.name, this.register.password);
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
}
