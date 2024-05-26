import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { BookingComponent } from './booking/booking.component';
import { FrComponent } from './fr/fr.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { ReviewComponent } from './review/review.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { ReservaComponent } from './reserva/reserva.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'index', component: IndexComponent },
  { path: 'restaurants', component: RestaurantComponent },
  { path: 'restaurant-detail/:id', component: RestaurantDetailComponent },
  { path: 'search-results', component: SearchResultsComponent },
  { path: 'search-results/:id', component: RestaurantDetailComponent },
  { path: 'reviews', component: ReviewComponent }, 
  { path: 'booking', component: BookingComponent }, 
  { path: 'fr', component: FrComponent }, 
  { path: 'login', component: LoginComponent }, 
  { path: 'register', component: RegisterComponent }, 
  { path: '', redirectTo: '/index', pathMatch: 'full' },
  { path: 'user', component: UserComponent },
  { path: 'about', component: AboutComponent },
  { path: 'reserva/:id', component: ReservaComponent },
  { path: '', redirectTo: '/index', pathMatch: 'full' },// redireccion automatica al index si no se encuentra
  { path: '**', component: PageNotFoundComponent }
     
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
