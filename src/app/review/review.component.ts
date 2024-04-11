import { Component, OnInit } from '@angular/core';
import { Review } from '../review';
import { ReviewService } from '../review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  reviews: Review[] = [];

  constructor(private reviewService: ReviewService) { }

  ngOnInit(): void {
    this.getAllReviews();
  }
  getAllReviews(): void {
    this.reviewService.getAllReviews().subscribe(reviews => {
      this.reviews = reviews;
      this.reviews.forEach(review => {
        review.restaurantId = review.restaurantId;
        review.userId = review.userId;
      });
    });
  }
  

}
