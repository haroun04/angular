import { Component, OnInit } from '@angular/core';
import { ReviewAdmin } from '../review-admin';
import { ReviewAdminService } from '../review-admin.service';

@Component({
  selector: 'app-review-admin',
  templateUrl: './review-admin.component.html',
  styleUrl: './review-admin.component.css'
})
export class ReviewAdminComponent  implements OnInit {
  reviews: ReviewAdmin[] = [];
  constructor(private reviewAdminService: ReviewAdminService) { }

  ngOnInit(): void {
    this.getAllReviews();
  }
  
  getAllReviews(): void {
    this.reviewAdminService.getAllReviews().subscribe(reviews => {
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
    this.reviewAdminService.getReviewUserName(reviewId).subscribe({
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
    this.reviewAdminService.getReviewUserProfilePicture(reviewId).subscribe({
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

  deleteReview(reviewId: number): void {
    if (confirm('¿Quieres eliminar esta review?')) {
      this.reviewAdminService.deleteReview(reviewId).subscribe(
        () => {
          this.reviews = this.reviews.filter(review => review.id !== reviewId);
        },
        (error) => {
          console.error('Error en la eliminacion:', error);
        }
      );
    }

}
}
