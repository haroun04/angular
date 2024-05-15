import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';  
import { Booking } from '../booking';
import { User } from '../user';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  bookings: Booking[] = [];
  user: any = { bookings: [] };

  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    this.getUserByToken();
  }


  getUserByToken(): void {
    if (typeof localStorage !== undefined && localStorage.getItem('token') !== null) {
      const token: string = localStorage.getItem('token') as string;
      this.bookingService.getUserByToken(token).subscribe(
        (user: User) => {
          this.user = user;
          //console.log(user);
        },
        (error) => {
          console.error('Error al obtener el usuario:', error);
        }
      );
    } else {
      console.error('No se encontró el token en el localStorage');
    }
  }



}