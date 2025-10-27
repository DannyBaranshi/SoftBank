import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.scss'
})
export class Search {
  query: string = '';
  items: string[] = ['texto', 'productos', 'información', 'works!'];
  results: string[] = [];

  constructor(private router: Router) {}

  onSearch() {
    console.log('Buscando:', this.query);
    const q = this.query.toLowerCase().trim();
    this.results = this.items.filter(item => item.toLowerCase().includes(q));

    if (this.results.length === 1 && q === this.results[0].toLowerCase()) {
      this.navigateTo(this.results[0]);
    }
  }

  navigateTo(item: string) {
    switch (item.toLowerCase()) {
      case 'inicio':
        this.router.navigate(['/']);
        break;
      case 'productos':
        this.router.navigate(['/productos']);
        break;
      case 'información':
        this.router.navigate(['/informacion']);
        break;
      default:
        console.log('Ruta no definida para:', item);
        break;
    }
  }
}
