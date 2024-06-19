import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create-rest-admin',
  templateUrl: './create-rest-admin.component.html',
  styleUrl: './create-rest-admin.component.css'
})
export class CreateRestAdminComponent {

  restaurant = {
    name: '',
    url: '',
    location: '',
    foodStyle: '',
    timeTable: '',
    capacity: null,
    phoneNumber: '',
    description: '',
    starRating: this.getRandomNumber(),
    userIframeSrc: '',
    owner_id: null
  };

  updateSuccess = false;
  updateError = false;

  constructor(private router: Router, private http: HttpClient) {
    
  }

  createRestaurant() {
    this.http.post('http://localhost:8080/api/restaurants', this.restaurant)
      .subscribe({
        next: (response) => {
          console.log('Creado con éxito: ',this.restaurant);
          this.updateSuccess = true;
          this.updateError = false;
        },
        error: (error) => {
          this.updateError = true;
          this.updateSuccess = false;
          console.error('Error creating restaurant', error);
        }
      });
  }

  getRandomNumber(): number {
    return Math.floor(Math.random() * 5) + 1;
  }
  
  

}
