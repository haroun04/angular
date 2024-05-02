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
import { RegisterComponent } from './reguister/register.component'; 
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { IndexComponent } from './index/index.component';
import { AuthComponent } from './auth/auth.component';
import { AuthInterceptor } from './auth.interceptor'; // Importa tu interceptor aquí

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
