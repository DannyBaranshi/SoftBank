<<<<<<< HEAD
import { Component, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthModal } from '../../auth/auth-modal';
import { Router } from '@angular/router';
=======
// src/app/features/header/hamburguer-menu/hamburguer-menu.ts

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ModalLoginService } from '../../services/modal-login.service';
>>>>>>> 7f39322b (Segunda entrega version dos)

@Component({
  selector: 'app-hamburguer-menu',
  standalone: true,
<<<<<<< HEAD
  imports: [CommonModule, FormsModule, AuthModal],
=======
  imports: [CommonModule, FormsModule],
>>>>>>> 7f39322b (Segunda entrega version dos)
  templateUrl: './hamburguer-menu.html',
  styleUrls: ['./hamburguer-menu.scss']
})

export class HamburguerMenu {
<<<<<<< HEAD
  
  // Estado del menú
  private _menuOpen = signal(false);
  menuOpen = this._menuOpen.asReadonly();
=======
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
    public modalService: ModalLoginService) {}

  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  get usuarioActual() {
    return this.authService.usuarioActual()?.username || '';
  }
>>>>>>> 7f39322b (Segunda entrega version dos)

  // Estado de sesión
  private _isLoggedIn = signal(false);
  isLoggedIn = this._isLoggedIn.asReadonly();

  // Modales
  showLoginModal = false;
  showRegisterModal = false;
  showLogoutConfirm = false;

  // Datos de usuario
  private usuarios: { [key: string]: string } = {};
  usuarioActual: string | null = null;

  // Campos de formulario
  loginUser = '';
  loginPassword = '';
  registerUser = '';
  registerPassword = '';

  constructor(private router: Router) {
    // Restaurar sesión si existía
    const user = localStorage.getItem('usuarioActual');
    if (user) {
      this._isLoggedIn.set(true);
      this.usuarioActual = user;
    }

    // Efecto reactivo para guardar estado
    effect(() => {
      if (this._isLoggedIn()) {
        localStorage.setItem('usuarioActual', this.usuarioActual || '');
      } else {
        localStorage.removeItem('usuarioActual');
      }
    });
  }

  // Menú ---
  toggleMenu() {
    this._menuOpen.update(v => !v);
  }

  closeMenu() {
    this._menuOpen.set(false);
  }

<<<<<<< HEAD
  // Navegacion
  navigateTo(path: string) {
    this.router.navigate([path]);
=======
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
    const usuario = this.authService.obtenerUsuarioActual();
    alert(`Bienvenido, ${this.loginUser}`);
    this.closeModal();

    if (usuario && usuario.cuentas.length === 0) {
      this.router.navigate(['/cuentas/crear']);
    } else {
      this.router.navigate(['/cuentas']);
    }
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
>>>>>>> 7f39322b (Segunda entrega version dos)
  }
  
  // Modales ---
  openLoginModal() {
    this.showLoginModal = true;
  }

  openRegisterModal() {
    this.showRegisterModal = true;
  }

  closeModal() {
    this.showLoginModal = false;
    this.showRegisterModal = false;
    this.resetForm();
  }

  openLogoutConfirm() {
    this.showLogoutConfirm = true;
  }

  cancelLogout() {
    this.showLogoutConfirm = false;
  }

  private resetForm() {
    this.loginUser = '';
    this.loginPassword = '';
    this.registerUser = '';
    this.registerPassword = '';
  }

  // ---------------------
  // Lógica de sesión
  // ---------------------
  registrarUsuario(event: Event) {
    event.preventDefault();
    if (this.usuarios[this.registerUser]) {
      alert('El usuario ya existe.');
      return;
    }
    this.usuarios[this.registerUser] = this.registerPassword;
    alert('Usuario registrado correctamente.');
    this.closeModal();
    this.closeMenu();
  }

  iniciarSesion(event: Event) {
    event.preventDefault();
    const password = this.usuarios[this.loginUser];
    if (password && password === this.loginPassword) {
      this._isLoggedIn.set(true);
      this.usuarioActual = this.loginUser;
      this.closeModal();
      alert(`Bienvenido, ${this.loginUser}`);
    } else {
      alert('Usuario o contraseña incorrectos.');
    }
    this.closeMenu();
  }

  confirmarCerrarSesion() {
    this._isLoggedIn.set(false);
    this.usuarioActual = null;
    this.showLogoutConfirm = false;
    alert('Sesión cerrada.');
    this.closeMenu();
  }
}