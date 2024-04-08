import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { ReviewComponent } from './review/review.component';

const routes: Routes = [
  { path: 'restaurants', component: RestaurantComponent },
  { path: 'restaurant-detail/:id', component: RestaurantDetailComponent },
  { path: 'search-results', component: SearchResultsComponent },
  { path: 'search-results/:id', component: RestaurantDetailComponent },
  { path: '', redirectTo: '/restaurants', pathMatch: 'full' },
  { path: 'reviews', component: ReviewComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
