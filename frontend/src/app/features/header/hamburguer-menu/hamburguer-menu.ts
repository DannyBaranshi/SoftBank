// src/app/features/header/hamburguer-menu/hamburguer-menu.ts

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ModalLoginService } from '../../services/modal-login.service';

@Component({
  selector: 'app-hamburguer-menu',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hamburguer-menu.html',
  styleUrls: ['./hamburguer-menu.scss']
})
export class HamburguerMenu {
  private _menuOpen = signal(false);
  menuOpen = this._menuOpen.asReadonly();

  showLoginModal = false;
  showRegisterModal = false;
  showLogoutConfirm = false;

  loginUser = '';
  loginPassword = '';
  registerUser = '';
  registerPassword = '';

  constructor(
    private router: Router, 
    private authService: AuthService,
    public modalService: ModalLoginService
  ) {}

  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  get usuarioActual() {
    return this.authService.usuarioActual()?.username || '';
  }

  toggleMenu() {
    this._menuOpen.update(v => !v);
  }

  closeMenu() {
    this._menuOpen.set(false);
  }

  navigateTo(path: string) {
    if (!this.isLoggedIn) {
      alert('Debe iniciar sesión para acceder a esta sección.');
      this.openLoginModal();
      return;
    }
    this.router.navigate([path]);
  }

  openLoginModal() { this.modalService.open(); }
  openRegisterModal() { this.showRegisterModal = true; }
  closeModal() { this.modalService.close(); this.resetForm(); }
  openLogoutConfirm() { this.showLogoutConfirm = true; }
  cancelLogout() { this.showLogoutConfirm = false; }

  private resetForm() {
    this.loginUser = '';
    this.loginPassword = '';
    this.registerUser = '';
    this.registerPassword = '';
  }

  registrarUsuario(event: Event) {
    event.preventDefault();
    try {
      this.authService.registrarUsuario(this.registerUser, this.registerPassword);
      alert('Usuario registrado correctamente.');
      this.closeModal();
    } catch (e) {
      alert((e as Error).message);
    }
    this.closeMenu();
  }

  iniciarSesion(event: Event) {
    event.preventDefault();
    const ok = this.authService.iniciarSesion(this.loginUser, this.loginPassword);
    if (ok) {
      alert(`Bienvenido, ${this.loginUser}`);
      this.closeModal();
    } else {
      alert('Usuario o contraseña incorrectos.');
    }
    this.closeMenu();
  }

  confirmarCerrarSesion() {
    this.authService.cerrarSesion();
    this.showLogoutConfirm = false;
    alert('Sesión cerrada.');
    this.closeMenu();
  }
}
