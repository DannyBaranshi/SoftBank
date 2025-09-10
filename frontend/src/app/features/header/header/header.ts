import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent {
  mobileMenuOpen = false;
  searchQuery = '';

  constructor(private router: Router) {}

  onLogoClick() {
    this.router.navigate(['/inicio']);
    this.mobileMenuOpen = false;
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
    this.mobileMenuOpen = false;
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  onSearchSubmit(event?: Event) {
    if (event) { event.preventDefault(); }
    const q = (this.searchQuery || '').trim();
    if (!q) { return; }
    this.router.navigate(['/search'], { queryParams: { q } });
    this.searchQuery = '';
    this.mobileMenuOpen = false;
  }
}
