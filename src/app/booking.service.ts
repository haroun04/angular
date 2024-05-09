import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from './booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private baseUrl = 'http://localhost:8080/api/bookings';

  constructor(private http: HttpClient) { }

  getUserBookings(userId: number): Observable<Booking[]> {
    const url = `${this.baseUrl}/user/${userId}`;
    return this.http.get<Booking[]>(url);
  }
}
