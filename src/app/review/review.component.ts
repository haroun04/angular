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
        this.getReviewUserName(review.id ?? 0); // Si review.id es undefined, se usa 0
        this.getReviewUserProfilePicture(review.id ?? 0);
      });
    });
  }
  

  getReviewUserName(reviewId: number): void {
    this.reviewService.getReviewUserName(reviewId).subscribe({
      next: userName => {
        const review = this.reviews.find(r => r.id === reviewId);
        if (review) {
          review.userName = userName;
        }
      },
      error: error => {
        console.error('Error al obtener el nombre de usuario:', error);
      }
    });
  }

  getReviewUserProfilePicture(reviewId: number): void{
    this.reviewService.getReviewUserProfilePicture(reviewId).subscribe({
      next: userProfilePicture => {
        const review = this.reviews.find(r => r.id === reviewId);
        if (review) {
          review.userProfilePicture = userProfilePicture;
        }
      },
      error: error => {
        console.error('Error al obtener la foto de perfil:', error);
      }
    });
  }

  

}
