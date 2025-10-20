import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth-modal.html',
  styleUrl: './auth-modal.scss'
})
export class AuthModal {
  @Output() close = new EventEmitter<void>();
  mode: 'login' | 'register' = 'login';
  username = '';
  password = '';
  message = '';

  constructor(private authService: AuthService) {}

  switchMode() {
    this.mode = this.mode === 'login' ? 'register' : 'login';
    this.message = '';
  }

  submit() {
    if (!this.username || !this.password) {
      this.message = 'Por favor complete todos los campos.';
      return;
    }

    if (this.mode === 'register') {
      const success = this.authService.register(this.username, this.password);
      this.message = success ? 'Cuenta creada con éxito.' : 'El usuario ya existe.';
    } else {
      const success = this.authService.login(this.username, this.password);
      this.message = success ? 'Inicio de sesión exitoso.' : 'Usuario o contraseña incorrectos.';
    }
  }

  closeModal() {
    this.close.emit();
  }
}
