import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Restaurant } from '../restaurant';
import { RestaurantService } from '../restaurant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  restaurants: Restaurant[] = [];
  restaurant: Restaurant | undefined;

  constructor(private route: ActivatedRoute, private router: Router, private restaurantService: RestaurantService) { } 

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const searchTerm = params['searchTerm'];
      this.restaurantService.searchRestaurantsByName(searchTerm).subscribe(restaurants => {
        this.restaurants = restaurants;
      });
    });
  }

  getRestaurantDetails(id: number): void {
    this.restaurantService.getRestaurantById(id)
      .subscribe(restaurant => {
        this.restaurant = restaurant;
      });
    
    }

    verDetalles2(id: number) {
      this.router.navigate(['search-results',id]);
    }
}
