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

  constructor(private route: ActivatedRoute,private restaurantService: RestaurantService) {}

  ngOnInit(): void {
    
    this.id = this.route.snapshot.params['id'] ?? undefined;
    if (this.id !== undefined) {
      this.getRestaurantDetails(this.id);
    }
  }

  getRestaurantDetails(id: number): void {
    this.restaurantService.getRestaurantById(id)
      .subscribe(restaurant => {
        this.restaurant = restaurant;
      });
    
    }  
}
