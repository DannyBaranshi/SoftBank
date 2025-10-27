// src/app/core/services/auth/auth.service.ts

import { Injectable, signal, computed } from '@angular/core';
import { Usuario } from '../model';
import { Cuenta } from '../../services/model';
import { toObservable } from '@angular/core/rxjs-interop'; // 🔹 para convertir Signals a Observables
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _usuarios = signal<Usuario[]>([]);
  private _usuarioActual = signal<Usuario | null>(null);

  usuarios = this._usuarios.asReadonly();
  usuarioActual = computed(() => this._usuarioActual());
  isLoggedIn = computed(() => this._usuarioActual() !== null);

  // 🔹 Nuevo: puente Observable para los componentes que usen suscripción reactiva
  usuarioActual$: Observable<Usuario | null> = toObservable(this._usuarioActual);

  constructor() {
    // Recupera desde sessionStorage
    const stored = sessionStorage.getItem('usuarios');
    if (stored) this._usuarios.set(JSON.parse(stored));

    // Recupera sesión activa si existía (persistencia leve opcional)
    const usuarioActivo = sessionStorage.getItem('usuarioActual');
    if (usuarioActivo) this._usuarioActual.set(JSON.parse(usuarioActivo));
  }

  private save() {
    sessionStorage.setItem('usuarios', JSON.stringify(this._usuarios()));
    if (this._usuarioActual()) {
      sessionStorage.setItem('usuarioActual', JSON.stringify(this._usuarioActual()));
    } else {
      sessionStorage.removeItem('usuarioActual');
    }
  }

  registrarUsuario(username: string, password: string) {
    const existe = this._usuarios().some(u => u.username === username);
    if (existe) throw new Error('El usuario ya existe.');

    const nuevo: Usuario = {
      username,
      password,
      cuentas: [],
      historial: []
    };
    this._usuarios.update(arr => [...arr, nuevo]);
    this.save();
  }

  iniciarSesion(username: string, password: string): boolean {
    const usuario = this._usuarios().find(u => u.username === username && u.password === password);
    if (!usuario) return false;

    this._usuarioActual.set(usuario);
    this.save(); // 🔹 persistimos la sesión
    return true;
  }

  cerrarSesion() {
    this._usuarioActual.set(null);
    this.save(); // 🔹 limpiar también persistencia
  }

  obtenerUsuarioActual(): Usuario | null {
    return this._usuarioActual();
  }

  actualizarUsuarioActual(usuario: Usuario) {
    this._usuarios.update(lista => lista.map(u => u.username === usuario.username ? usuario : u));
    this._usuarioActual.set(usuario);
    this.save();
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
