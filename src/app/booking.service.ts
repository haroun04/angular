import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from './booking';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private baseUrl = 'http://localhost:8080/api/user';
  private baseUrlBooking = 'http://localhost:8080/api/bookings';

  constructor(private http: HttpClient) { }

  getUserBookings(userId: number): Observable<Booking[]> {
    const url = `${this.baseUrl}/user/${userId}`;
    const authToken = localStorage.getItem('authToken'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`); 
    return this.http.get<Booking[]>(url, { headers });
  }

  getUserByToken(token: string): Observable<User> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<User>(`${this.baseUrl}/me`, { headers });
  }

  deleteBooking(id: number): Observable<void> {
    const url = `${this.baseUrlBooking}/${id}`;
    return this.http.delete<void>(url);
  }

  saveBooking(booking: Booking): Observable<Booking> {
    const authToken = localStorage.getItem('authToken'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`); 
    return this.http.post<Booking>(this.baseUrlBooking, booking, { headers });
  }
  
}