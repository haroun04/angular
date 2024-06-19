import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { ReviewComponent } from './review/review.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component'; 
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { IndexComponent } from './index/index.component';
import { AuthComponent } from './auth/auth.component';
import { AuthInterceptor } from './auth.interceptor';
import { BookingComponent } from './booking/booking.component';
import { UserComponent } from './user/user.component';
import { FrComponent } from './fr/fr.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { IndexAdminComponent } from './index-admin/index-admin.component';
import { ReservaComponent } from './reserva/reserva.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderAdminComponent } from './header-admin/header-admin.component';
import { ReviewAdminComponent } from './review-admin/review-admin.component';
import { UsersAdminComponent } from './users-admin/users-admin.component';
import { UpdateAdminComponent } from './update-admin/update-admin.component';
import { CreateRestAdminComponent } from './create-rest-admin/create-rest-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantComponent,
    RestaurantDetailComponent,
    SearchResultsComponent,
    ReviewComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    IndexComponent,
    AuthComponent,
    BookingComponent,
    FrComponent,
    UserComponent,
    LoginAdminComponent,
    IndexAdminComponent,
    ReservaComponent,
    PageNotFoundComponent,
    HeaderAdminComponent,
    ReviewAdminComponent,
    UsersAdminComponent,
    UpdateAdminComponent,
    CreateRestAdminComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    FormsModule 
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true } // Agrega tu interceptor aquí como un proveedor
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
