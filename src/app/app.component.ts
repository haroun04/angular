import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EatEasy';
  searchTerm: string = '';

  constructor(private router: Router) {}

  searchRestaurant(): void {
    if (this.searchTerm.trim() !== '') {
      this.router.navigate(['/search-results'], { queryParams: { searchTerm: this.searchTerm } });
    }
  }
}
