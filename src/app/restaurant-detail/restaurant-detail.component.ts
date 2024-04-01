import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Restaurant } from '../restaurant';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.css']
})
export class RestaurantDetailComponent implements OnInit {
  restaurant: Restaurant | undefined;
  id?: number;

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService
  ) {
    console.log('RestaurantDetailComponent initialized');
  }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'] ?? undefined;
    console.log('ID recibido:', this.id); // Agregar log aquí para verificar el ID recibido desde la URL
    if (this.id !== undefined) {
      this.getRestaurantDetails(this.id);
    }
  }

  getRestaurantDetails(id: number): void {
    console.log('Obteniendo detalles del restaurante con ID:', id); // Agregar log aquí para verificar que se esté llamando a la función getRestaurantDetails con el ID correcto
    this.restaurantService.getRestaurantById(id)
      .subscribe(restaurant => {
        console.log('Detalles del restaurante recibidos:', restaurant); // Agregar log aquí para verificar los detalles del restaurante recibidos del servicio
        this.restaurant = restaurant;
      });
  }
}
