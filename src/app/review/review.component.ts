import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Review } from '../review';
import { ReviewService } from '../review.service';
@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {
  reviews: Review[] = []; 

  constructor(private reviewService: ReviewService, private router: Router) { }

  ngOnInit(): void {
    this.getAllReviews();
  }

  getAllReviews(): void {
    this.reviewService.getAllReviews().subscribe(reviews => this.reviews = reviews);
  }
}
