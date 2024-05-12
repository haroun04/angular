import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Restaurant } from '../restaurant';
import { RestaurantService } from '../restaurant.service';
import { ReviewService } from '../review.service';
import { Review } from '../review';
import { AuthService } from '../auth.service';

import { DomSanitizer } from '@angular/platform-browser';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.css']
})
export class RestaurantDetailComponent implements OnInit {
  restaurant: Restaurant | undefined;
  reviews: Review[] = [];
  id?: number;
  userIframeSrc: SafeResourceUrl | undefined;

  constructor(private route: ActivatedRoute,
              private restaurantService: RestaurantService,
              private reviewService: ReviewService,
              private authService: AuthService,
              private sanitizer: DomSanitizer) {}

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
      .subscribe(reviews => {
        this.reviews = reviews;
        this.reviews.forEach(review => {
          this.getReviewUserName(review.id!);
          this.getReviewUserProfilePicture(review.id!);
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

  generarArreglo(assessment: number): any[] {
    return Array(assessment);
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  extractIframeSrc(userIframeSrc: string | undefined): SafeResourceUrl | null {
    if (userIframeSrc) {
      const srcRegex = /<iframe.*?src=["'](.*?)["']/i;
      const match = userIframeSrc.match(srcRegex);
      if (match) {
        const src = match[1];
        return this.sanitizer.bypassSecurityTrustResourceUrl(src);
      }
    }
    return null;
  }
  
  
}
