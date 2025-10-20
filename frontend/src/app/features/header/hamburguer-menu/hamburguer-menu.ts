import { Component, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthModal } from '../../auth/auth-modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hamburguer-menu',
  standalone: true,
  imports: [CommonModule, FormsModule, AuthModal],
  templateUrl: './hamburguer-menu.html',
  styleUrls: ['./hamburguer-menu.scss']
})

export class HamburguerMenu {
  
  // Estado del menú
  private _menuOpen = signal(false);
  menuOpen = this._menuOpen.asReadonly();

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

  // Navegacion
  navigateTo(path: string) {
    this.router.navigate([path]);
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