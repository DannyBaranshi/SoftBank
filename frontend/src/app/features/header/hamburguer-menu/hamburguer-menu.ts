// src/app/features/header/hamburguer-menu/hamburguer-menu.ts

import { Component, inject, signal } from '@angular/core';
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
  private router = inject(Router);

  private _menuOpen = signal(false);
  menuOpen = this._menuOpen.asReadonly();

  showLoginModal = false;
  showRegisterModal = false;
  showLogoutConfirm = false;

  loginUser = '';
  loginPassword = '';
  registerUser = '';
  registerPassword = '';
  registerConfirmPassword = '';
  registerCedula = '';
  registerNombre = '';
  registerApellido = '';
  registerCorreo = '';
  registerTelefono = '';

  constructor(
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
  closeModal() { 
    this.modalService.close(); 
    this.resetForm(); 
    this.showRegisterModal = false; 
  }
  openLogoutConfirm() { this.showLogoutConfirm = true; }
  cancelLogout() { this.showLogoutConfirm = false; }

  private resetForm() {
    this.loginUser = '';
    this.loginPassword = '';
    this.registerUser = '';
    this.registerPassword = '';
    this.registerConfirmPassword = '';
    this.registerCedula = '';
    this.registerNombre = '';
    this.registerApellido = '';
    this.registerCorreo = '';
    this.registerTelefono = '';
  }

  private reload() {
    const currentUrl = this.router.url;
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate([currentUrl]);
  });
  }

  async registrarUsuario(event: Event) {
    event.preventDefault();
    const payload = {
      nomUsuario: this.registerUser,
      contrasena: this.registerPassword,
      confirmContrasena: this.registerConfirmPassword,
      cedula: this.registerCedula,
      nombre: this.registerNombre,
      apellido: this.registerApellido,
      correo: this.registerCorreo,
      telefono: this.registerTelefono
    };

    const success = await this.authService.registrarUsuario(payload);
    if (success === true) {
      alert('Usuario registrado correctamente.');
      this.closeModal();
      this.reload();
    } else if (typeof success === 'string') {
      alert(success);
    } else {
      alert('Error al registrar usuario. Verifique los datos o intente nuevamente.');
    }
    this.closeMenu();
  }

  async iniciarSesion(event: Event) {
    event.preventDefault();
    const ok = await this.authService.iniciarSesion(this.loginUser, this.loginPassword);
    if (ok === true) {
      alert(`Bienvenido, ${this.loginUser}`);
      this.closeModal();
      this.reload();
      
    } else if (typeof ok === 'string') {
      alert(ok);
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
    this.reload();
  }
}
