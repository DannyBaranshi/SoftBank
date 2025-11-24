import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Search } from '../search/search';
import { Logo } from '../logo/logo';
import { HamburguerMenu } from '../hamburguer-menu/hamburguer-menu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [Search, Logo, HamburguerMenu],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})

export class Header {
  constructor(private router: Router) {}

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}