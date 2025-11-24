// src/app/core/services/accounts/accounts.service.ts
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Cuenta } from '../services/model';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private auth: AuthService) {}

  listarCuentas(): Cuenta[] {
    const usuario = this.auth.obtenerUsuarioActual()();
    return usuario ? usuario.cuentas : [];
  }

  existeCuentaDeTipo(tipo: 'ahorros' | 'corriente'): boolean {
    const usuario = this.auth.obtenerUsuarioActual()();
    if (!usuario) return false;
    return usuario.cuentas.some((c: any) => c.tipo === tipo);
  }

  obtenerCuentas(): Cuenta[] {
    const usuario = this.auth.obtenerUsuarioActual()();
    return usuario?.cuentas || [];
  }

  crearCuenta(tipo: 'ahorros' | 'corriente'): Cuenta {
    const usuario = this.auth.obtenerUsuarioActual()();
    if (!usuario) throw new Error('No hay usuario autenticado.');

    if (this.existeCuentaDeTipo(tipo))
      throw new Error(`Ya existe una cuenta de tipo ${tipo}.`);

    const nueva: Cuenta = {
      id: crypto.randomUUID(),
      tipo,
      saldo: 0,
      fechaCreacion: new Date(),
      productos: []
    };

    usuario.cuentas.push(nueva);
    return nueva;
  }
}