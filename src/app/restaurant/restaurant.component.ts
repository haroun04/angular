import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../restaurant'; // Asegúrate de tener un modelo para Restaurant
import { RestaurantService } from '../restaurant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  restaurants: Restaurant[]=[];

  constructor(private restaurantService: RestaurantService, private router: Router) { }

  ngOnInit(): void {
    this.getAllRestaurants();
  }

  getAllRestaurants(): void {
    this.restaurantService.getAllRestaurants().subscribe(restaurants => this.restaurants = restaurants);
  }
  verDetalles(id: number) {
    this.router.navigate(['restaurant-detail',id]);
  }
  
}
