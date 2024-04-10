import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from './review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private baseUrl = 'http://localhost:8080/api/reviews';

  constructor(private http: HttpClient) { }

  getAllReviews(): Observable<Review[]>{
    return this.http.get<Review[]>(this.baseUrl);
  }

  getReviewsByRestaurantId(restaurantId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/restaurant/${restaurantId}`);
  }

}