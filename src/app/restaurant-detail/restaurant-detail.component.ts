import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from '../restaurant';
import { RestaurantService } from '../restaurant.service';
import { ReviewService } from '../review.service';
import { Review } from '../review';
import { AuthService } from '../auth.service';
import { BookingService } from '../booking.service';
import { User } from '../user';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FrService } from '../fr.service';
import { HttpClient } from '@angular/common/http';
import { Fr } from '../fr';

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
  user: User | undefined;

  newReview: any = { 
    comment: '',
    assessment: 0,
    name:'',
    userProfilePicture: '',
    userId: 0,
    restaurantId: 0
  };

  submitted: boolean = false;
  isFavorite: boolean = false;
  favorite : Fr= new Fr();

  constructor(private route: ActivatedRoute,
              private restaurantService: RestaurantService,
              private reviewService: ReviewService,
              private authService: AuthService,
              private sanitizer: DomSanitizer,
              private router: Router,
              private bookingService: BookingService,
            private frService: FrService,
            private http: HttpClient) {}

   ngOnInit(): void {
    this.id = this.route.snapshot.params['id'] ?? undefined;
    if (this.id !== undefined) {
      this.getUserByToken();
      this.getRestaurantDetails(this.id);
      this.checkIfFavorite(this.id);
      this.newReview.restaurantId = this.id; 
       
    }
  }

  getRestaurantDetails(id: number): void {
    this.restaurantService.getRestaurantById(id).subscribe(
      restaurant => {
        if (restaurant) {
          this.restaurant = restaurant;
          this.getReviewsByRestaurantId(this.restaurant.id!);
        } else {
          this.router.navigate(['/page-not-found']);
        }
      },
      error => {
        this.router.navigate(['/page-not-found']);
      }
    );
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


  getUserByToken(): void {
    if (typeof localStorage !== undefined && localStorage.getItem('token') !== null) {
      const token: string = localStorage.getItem('token') as string;
      this.bookingService.getUserByToken(token).subscribe(
        (user: User) => {
          this.user = user;
        },
        (error) => {
          console.error('Error al obtener el usuario:', error);
        }
      );
    } else {
      console.error('No se encontró el token en el localStorage');
    }
  }


  setRating(rating: number): void {
    this.newReview.assessment = rating;
  }

  submitReview(): void {
    this.submitted = true;
    if (this.newReview.comment.trim() === '' || this.newReview.assessment === 0) {
      console.error('Formulario inválido');
      return;
    }

    if (this.restaurant && this.user) {
      this.newReview.restaurantId = this.restaurant.id!;
      this.newReview.userId = this.user.id;
      
      this.reviewService.createReview(this.newReview).subscribe(
        response => {
          window.location.reload();
          console.log('Review created successfully');
        },
        error => {
          console.error('Error creating review', error);
        }
      );
    }
  }

  verDetalles(id: number): void {
    this.router.navigate(['reserva', id]);
  }


  checkIfFavorite(id: number) {
    this.frService.isFavorite(id).subscribe((response) => {
      this.isFavorite = response;
      console.log('Favorito: ', this.isFavorite);
    });
  }

  

  deleteFavorite(restaurantId: number | undefined): void {
    if (restaurantId !== undefined) {
      this.frService.getFavoriteRestaurantByRestaurantID(restaurantId)
        .subscribe(response => {
          console.log(response); 
          if (response && response.id) {
            console.log(`Favorite Restaurant ID: ${response.id}`); 
            this.http.delete(`http://localhost:8080/api/favorite-restaurants/${response.id}`)
        .subscribe(
            () => {
                console.log('Favorito eliminado exitosamente');
                window.location.reload();
            },
            error => {
                console.error('Error al eliminar favorito:', error);
            }
        );
          }
        },
        error => {
          console.error('Error fetching favorite restaurant:', error);
        });
    }
  }


  
  saveFavorite(userId: number | undefined, restaurantId:number | undefined):void {
    this.favorite.userId=userId;
    this.favorite.restaurantId=restaurantId;

    this.frService.saveFavorite(this.favorite).subscribe(
      (savedFav: Fr) => {
        console.log('Añadido a favs');
        window.location.reload();
      },
      (error) => {
        console.log('Error al añadir a favs');
      }
    );
  }
  

}
