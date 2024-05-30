import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReviewAdmin } from './review-admin';

@Injectable({
  providedIn: 'root'
})
export class ReviewAdminService {

  private baseUrl = 'http://localhost:8080/api/reviews';

  constructor(private http: HttpClient) { }

  getAllReviews(): Observable<ReviewAdmin[]> {
    return this.http.get<ReviewAdmin[]>(this.baseUrl);
  }

  getReviewUserName(reviewId: number): Observable<string> {
    return this.http.get(`${this.baseUrl}/${reviewId}/user`, { responseType: 'text' });
  }

  getReviewUserProfilePicture(reviewId: number): Observable<string> {
    return this.http.get(`${this.baseUrl}/${reviewId}/userProfilePicture`, { responseType: 'text' });
  }

  deleteReview(reviewId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${reviewId}`);
  }
}