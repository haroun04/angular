import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../restaurant';
import { RestaurantService } from '../restaurant.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user';
@Component({
  selector: 'app-index-admin',
  templateUrl: './index-admin.component.html',
  styleUrl: './index-admin.component.css'
})
export class IndexAdminComponent implements OnInit {
  restaurants: Restaurant[] = [];
  pagedRestaurants: Restaurant[] = [];


  constructor(private restaurantService: RestaurantService, private router: Router, private authService: AuthService,) { }

  ngOnInit(): void {
    this.getAllRestaurants();
  }

  getAllRestaurants(): void {
    this.restaurantService.getAllRestaurants().subscribe(restaurants => {
      this.restaurants = restaurants;

      this.updatePage();
    });
}
updatePage(): void {
  this.pagedRestaurants = this.restaurants;
}
loadRestaurants(): void {
  this.restaurantService.getAllRestaurants().subscribe(
    (restaurants: Restaurant[]) => {
      this.restaurants = restaurants;
    },
    error => {
      console.error('Error loading restaurants', error);
    }
  );
}


  deleteRestaurant(id: number): void {

        this.restaurantService.deleteRestaurant(id);
        this.getAllRestaurants();


  }


  updateRestaurant(id: number): void {
    this.router.navigate(['/update-restaurant', id]);
  }

verDetalles(id: number): void {
    this.router.navigate(['restaurant-detail', id]);
  }
}
