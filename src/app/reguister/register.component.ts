import { Component } from '@angular/core';
import { ReguisterService } from '../reguister.service';
import { Router } from '@angular/router';
import { Reguister } from '../reguister';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  register: Reguister = { name: '', password: '' };

  constructor(private registerService: ReguisterService, private router: Router) { }

  signUp(): void {
    this.registerService.signUp(this.register)
      .subscribe(
        response => {
          console.log('Registro exitoso:', response);
          this.router.navigate(['/index']);
        },
        error => {
          console.error('Error al registrarse:', error);
        }
      );
  }
}
