import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';
import { Fr } from './fr';

@Injectable({
  providedIn: 'root'
})
export class FrService {
  private baseUrl = 'http://localhost:8080/api/user';
  private baseUrlFrestaurant = 'http://localhost:8080/api/favorite-restaurants';

  constructor(private http: HttpClient) { }

  getUserFr(userId: number): Observable<Fr[]> {
    const url = `${this.baseUrl}/${userId}`; 
    const authToken = localStorage.getItem('authToken'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`); 
    return this.http.get<Fr[]>(url, { headers });
  }

  getUserByToken(token: string): Observable<User> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<User>(`${this.baseUrl}/me`, { headers });
  }

  deleteBooking(id: number): Observable<void> {
    const url = `${this.baseUrlFrestaurant}/${id}`;
    return this.http.delete<void>(url);
  }

  isFavorite(restaurantId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrlFrestaurant}/${restaurantId}/isFavorite`);
  }

  saveFavorite(favorite: Fr): Observable<Fr> {
    const authToken = localStorage.getItem('authToken'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`); 
    return this.http.post<Fr>(this.baseUrlFrestaurant, favorite, { headers });
  }

  getFavoriteRestaurantByRestaurantID(restaurantId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrlFrestaurant}/restaurantId/${restaurantId}`);
  }
}
