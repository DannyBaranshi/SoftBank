// src/app/core/services/auth/auth.service.ts

import { Injectable, signal, computed, inject, Signal, resource } from '@angular/core';
import { Usuario } from '../model';
import * as jose from 'jose'
import { Cuenta } from '../../services/model';
import { toObservable } from '@angular/core/rxjs-interop'; // 🔹 para convertir Signals a Observables
import { firstValueFrom, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AccountsService as ApiAccountsService }from '../../accounts/account.service'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private api = inject(ApiAccountsService);
  
  private _token = signal<string | null>(sessionStorage.getItem('token') ?? localStorage.getItem('token') ?? null);

  userResource = resource({
    params: () => ({token: this._token()}),
    loader: async ({params: {token}}) => token ? await this.getUser(token) : null,
  });

  usuarioActual = computed(() => this.userResource.hasValue() ? this.userResource.value() : null);
  isLoggedIn = computed(() => this.usuarioActual() !== null);

  // 🔹 Nuevo: puente Observable para los componentes que usen suscripción reactiva
  usuarioActual$: Observable<Usuario | null> = toObservable(this.usuarioActual);

  private async getUser(token: string): Promise<Usuario | null> {
    const tokenUser = jose.decodeJwt<{username: string, email: string}>(token);

    const cuentas = await firstValueFrom<any[]>(this.api.listAccounts());

  
    return {
      ...tokenUser,
      cuentas,
      historial: [],
    }
  }

  private save() {
    if (this._token()) {
      sessionStorage.setItem('token', this._token()!);
    } else {
      sessionStorage.removeItem('token');
    }

    if (this.usuarioActual()) {
      sessionStorage.setItem('usuarioActual', JSON.stringify(this.usuarioActual()));
    } else {
      sessionStorage.removeItem('usuarioActual');
    }
  }

  registrarUsuario(registro: {
    nomUsuario: string,
    contrasena: string,
    confirmContrasena?: string,
    cedula?: string,
    nombre?: string,
    apellido?: string,
    correo?: string,
    telefono?: string
  }): Promise<boolean | string> {
    // Enviar exactamente la estructura que espera el backend
    const body = {
      nomUsuario: registro.nomUsuario,
      contrasena: registro.contrasena,
      confirmContrasena: registro.confirmContrasena ?? registro.contrasena,
      cedula: registro.cedula ?? '',
      nombre: registro.nombre ?? '',
      apellido: registro.apellido ?? '',
      correo: registro.correo ?? '',
      telefono: registro.telefono ?? ''
    };

    const observable = this.http.post<{token?: string} | string>("http://localhost:8081/controller/registro", body);

    return new Promise((resolve) => {
      observable.subscribe({
        next: (res) => {
          if (typeof res === 'string') {
            resolve(res);
            return;
          }

          if (res && (res as any).token) {
            this._token.set((res as any).token);
            this.save();
            resolve(true);
          } else {
            // Registro ok pero sin token (compatibilidad), indicar éxito para que UX lo maneje
            resolve(true);
          }
        },
        error: (err) => {
          console.error('Error en registro', err);
          resolve(err.error as string);
        }
      });
    });
  }

  iniciarSesion(username: string, password: string): Promise<string | boolean> {
    const observable = this.http.post<{token: string} | string>("http://localhost:8081/controller/login", {nomUsuario: username, contrasena: password});

    return new Promise((resolve) => {
      observable.subscribe({
      next: (res) => {
        if (typeof res === 'string') {
          resolve(res);
          return;
        }

        this._token.set(res.token);
        console.log("Login exitoso");
        this.save();
        resolve(true);
      },
      error: (err) => {
        console.error("Error de login", err);
        resolve(err.error as string);
      }
    });
  });
  }

  cerrarSesion() {
    this._token.set(null);
    this.save(); // 🔹 limpiar también persistencia
  }

  obtenerUsuarioActual(): Signal<Usuario | null> {
    return this.usuarioActual;
  }

  actualizarUsuario(usuario: any) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const idx = usuarios.findIndex((u: any) => u.id === usuario.id);
    if (idx !== -1) {
      usuarios[idx] = usuario;
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }
  }

  buscarCuentaGlobal(cuentaId: string): { usuario: any; cuenta: Cuenta } | null {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    for (const u of usuarios) {
      const cuenta = u.cuentas.find((c: Cuenta) => c.id === cuentaId);
      if (cuenta) return { usuario: u, cuenta };
    }
    return null;
  }
}
