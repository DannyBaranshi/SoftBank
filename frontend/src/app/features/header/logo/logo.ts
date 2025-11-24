import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [],
  templateUrl: './logo.html',
  styleUrl: './logo.scss'
})

export class Logo {
  constructor(private router: Router) {}

  onLogoClick() {
    console.log('Logo clickeado'); 
    this.router.navigate(['/inicio']);
  }
}

