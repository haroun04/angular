import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../restaurant';
import { RestaurantService } from '../restaurant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {
  restaurants: Restaurant[] = [];
  pagedRestaurants: Restaurant[] = [];
  currentPage = 1;
  pageSize = 5;
  totalPages = 0;
  pages: number[] = [];

  constructor(private restaurantService: RestaurantService, private router: Router) { }

  ngOnInit(): void {
    this.getAllRestaurants();
  }

  getAllRestaurants(): void {
    this.restaurantService.getAllRestaurants().subscribe(restaurants => {
      this.restaurants = restaurants;
      this.totalPages = Math.ceil(this.restaurants.length / this.pageSize);
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1); // Genera un arreglo de páginas [1, 2, ..., totalPages]
      this.updatePage();
    });
}
updatePage(): void {
  const startIndex = (this.currentPage - 1) * this.pageSize;
  const endIndex = Math.min(startIndex + this.pageSize, this.restaurants.length);
  this.pagedRestaurants = this.restaurants.slice(startIndex, endIndex);
}

  verDetalles(id: number): void {
    this.router.navigate(['restaurant-detail', id]);
  }

  getStars(starRating: number): number[] {
    return Array.from({ length: starRating }, (_, i) => i + 1);
  }

  goToPage(page: number, event: any): void {
    event.preventDefault(); //se crea el evento para que no sea default y se vaya a el index
    this.currentPage = page;
    this.updatePage();
  
    
    this.router.navigate(['/restaurants'], { queryParams: { page: page } });//Este enlace se realiza por que cuando dejamos el href con el # nnos manda al index pues se hace una redirecion
  }
  
  prevPage(event: any): void {
    event.preventDefault(); //se crea el evento para que no sea default y se vaya a el index
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePage();

      this.router.navigate(['/restaurants'], { queryParams: { page: this.currentPage } });//Este enlace se realiza por que cuando dejamos el href con el # nnos manda al index pues se hace una redirecion
    }
  }
  
  nextPage(event: any): void {
    event.preventDefault(); //se crea el evento para que no sea default y se vaya a el index
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePage();

      this.router.navigate(['/restaurants'], { queryParams: { page: this.currentPage } }); //Este enlace se realiza por que cuando dejamos el href con el # nnos manda al index pues se hace una redirecion
    }
}
}
