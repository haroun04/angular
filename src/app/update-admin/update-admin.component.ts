import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../restaurant';
import { RestaurantService } from '../restaurant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-update-admin',
  templateUrl: './update-admin.component.html',
  styleUrls: ['./update-admin.component.css']
})
export class UpdateAdminComponent implements OnInit {
  restaurant: Restaurant | undefined;
  id?: number;
  updateSuccess: boolean = false;

  constructor(private restaurantService: RestaurantService, private router: Router, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'] ?? undefined;
    if (this.id !== undefined) {
      this.getRestaurantDetails(this.id);
    }
  }

  getRestaurantDetails(id: number): void {
    this.restaurantService.getRestaurantById(id).subscribe(
      restaurant => {
        if (restaurant) {
          this.restaurant = restaurant;
        } else {
          this.router.navigate(['/page-not-found']);
        }
      },
      error => {
        this.router.navigate(['/page-not-found']);
      }
    );
  }

  updateRestaurant(): void {
    if (this.restaurant && this.id) {
      this.restaurantService.updateRestaurant(this.id, this.restaurant).subscribe(
        (updatedRestaurant: Restaurant) => {
          console.log('Restaurante actualizado:', updatedRestaurant);
          this.router.navigate(['/indexAdmin']); 
        },
      );
    } else {
      console.error('No hay información de restaurante para actualizar');
    }
  }
}
