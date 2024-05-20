import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';  
import { Booking } from '../booking';
import { User } from '../user';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  bookings: Booking[] = [];
  user: any = { bookings: [] };

  constructor(private bookingService: BookingService, private http: HttpClient, ) { }

  ngOnInit(): void {
    this.getUserByToken();
  }


  getUserByToken(): void {
    if (typeof localStorage !== undefined && localStorage.getItem('token') !== null) {
      const token: string = localStorage.getItem('token') as string;
      this.bookingService.getUserByToken(token).subscribe(
        (user: User) => {
          this.user = user;
          console.log(user);
        },
        (error) => {
          console.error('Error al obtener el usuario:', error);
        }
      );
    } else {
      console.error('No se encontró el token en el localStorage');
    }
  }

  deleteBooking(id: number) {
    this.http.delete(`http://localhost:8080/api/bookings/${id}`)
        .subscribe(
            () => {
                console.log('Reserva eliminada exitosamente');
                this.getUserByToken();
            },
            error => {
                console.error('Error al eliminar la reserva:', error);
            }
        );
  }
}
