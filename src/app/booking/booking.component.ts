import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';  
import { Booking } from '../booking';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  bookings: Booking[] = [];

  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    const userIdString = localStorage.getItem('userId');
    if (userIdString && typeof localStorage !== 'undefined') {
      const userId = parseInt(userIdString, 10); 
      this.bookingService.getUserBookings(userId).subscribe(
        bookings => {
          this.bookings = bookings; // Asignar las reservas obtenidas al arreglo de reservas del componente
        },
        error => {
          console.error('Error al obtener las reservas:', error);
        }
      );
    } else {
      console.error('ID de usuario no encontrado');
    }
  }
}
