import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header2',
  templateUrl: './header2.component.html',
  styleUrl: './header2.component.css'
})
export class Header2Component {
  searchTerm: string = '';

  constructor(private router: Router) {}

  searchRestaurant(): void {
    if (this.searchTerm.trim() !== '') {
      this.router.navigate(['/search-results'], { queryParams: { searchTerm: this.searchTerm } });
    }
  }
}
