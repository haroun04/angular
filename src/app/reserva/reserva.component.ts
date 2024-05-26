import { Component } from '@angular/core';
import { Restaurant } from '../restaurant';
import { RestaurantService } from '../restaurant.service';
import { User } from '../user';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../booking.service';
import { Booking } from '../booking';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrl: './reserva.component.css'
})
export class ReservaComponent{
  restaurant: Restaurant | undefined;
  id?: number;
  user: User | undefined;
  booking: Booking = new Booking();
  numberDiners: number | undefined;
  selectedDate: string = '';
  selectedTime: string = '';

  constructor(private restaurantService: RestaurantService, private router: Router, private route: ActivatedRoute,
    private bookingService: BookingService
  ) { 
  }

  ngOnInit(): void {
    this.getUserByToken();
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

  createBooking(): void {
    this.booking.numberDiners = Number(this.numberDiners);
    this.booking.reservedAt = new Date(this.selectedDate + 'T' + this.selectedTime);
    this.booking.restaurantId = this.restaurant?.id;
    this.booking.userId = this.user?.id;
  
    this.bookingService.saveBooking(this.booking).subscribe(
      (savedBooking: Booking) => {
        console.log('Reserva guardada:');
      },
      (error) => {
        console.error('Error al guardar la reserva:', error);
      }
    );
  }
  

 
}
