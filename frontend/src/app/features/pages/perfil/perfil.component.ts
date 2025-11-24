import { Component, signal, Signal, WritableSignal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../services/model';
import { AuthService } from '../../services/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {
  private auth = inject(AuthService);
  private http = inject(HttpClient);

  usuarioActual: Signal<Usuario | null> = this.auth.obtenerUsuarioActual();

  // Password change form model
  currentPassword: WritableSignal<string> = signal('');
  newPassword: WritableSignal<string> = signal('');
  confirmPassword: WritableSignal<string> = signal('');

  // Feedback message
  message: WritableSignal<string> = signal('');

  cambiarContrasena() {
    if (this.newPassword() !== this.confirmPassword()) {
      this.message.set('Las contraseñas nuevas no coinciden.');
      return;
    }

    if (!this.usuarioActual() || !this.usuarioActual()!.username) {
      this.message.set('Usuario no autenticado.');
      return;
    }

    const payload = {
      nomUsuario: this.usuarioActual()!.username,
      contrasenaActual: this.currentPassword(),
      nuevaContrasena: this.newPassword(),
      confirmContrasena: this.confirmPassword()
    };

    this.http.post(`${environment.apiBaseUrl}/controller/cambioContrasena`, payload)
      .subscribe({
        next: () => {
          this.message.set('Contraseña cambiada exitosamente.');
          this.currentPassword.set('');
          this.newPassword.set('');
          this.confirmPassword.set('');
        },
        error: (err) => {
          this.message.set(err.error || 'Error al cambiar la contraseña.');
        }
      });
  }
}
