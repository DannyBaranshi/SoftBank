import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hamburguer-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hamburguer-menu.html',
  styleUrls: ['./hamburguer-menu.scss']
})
export class HamburguerMenu {
  isLoggedIn = signal(false);
  menuOpen = signal(false);

  toggleMenu() {
    this.menuOpen.update(open => !open);
  }

  iniciarSesion() {
    this.isLoggedIn.set(true);
    this.menuOpen.set(false);
  }

  cerrarSesion() {
    this.isLoggedIn.set(false);
    this.menuOpen.set(false);
  }
}
