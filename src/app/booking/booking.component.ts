import { Component } from '@angular/core';
import { BookingService } from '../booking.service';  
import { Booking } from '../booking';
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {
  bookings: Booking[] = [];
  userId: number | null = null; // Inicializa userId con null

  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    const userIdString = localStorage.getItem('userId');
    if (userIdString) {
      this.userId = parseInt(userIdString, 10); // Convertir el string a number
      this.getBookings(this.userId);
    } else {
      console.error('User ID not found'); // Manejo de errores si no se encuentra el ID de usuario
    }
  }

  getBookings(userId: number): void {
    this.bookingService.getUserBookings(userId).subscribe(bookings => {
      this.bookings = bookings;
    });
  }
}
