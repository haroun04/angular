import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Restaurant } from '../restaurant';
import { RestaurantService } from '../restaurant.service';
import { ReviewService } from '../review.service';
import { Review } from '../review';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.css']
})
export class RestaurantDetailComponent implements OnInit {
  restaurant: Restaurant | undefined;
  reviews: Review[] = [];
  id?: number;

  constructor(private route: ActivatedRoute,
              private restaurantService: RestaurantService,
              private reviewService: ReviewService) {}

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
        if (this.restaurant !== undefined) {
          this.getReviewsByRestaurantId(this.restaurant.id!); 
        }
      });
  }

  getReviewsByRestaurantId(restaurantId: number): void {
    this.reviewService.getReviewsByRestaurantId(restaurantId)
      .subscribe(reviews => this.reviews = reviews);
  }
}
