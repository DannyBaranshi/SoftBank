import { Injectable } from '@angular/core';

export interface Cuenta {
  tipo: 'ahorros' | 'corriente';
  numero: string;
  fechaCreacion: Date;
}

@Injectable({ providedIn: 'root' })
export class AccountService {
  private cuentas: Cuenta[] = [];

  obtenerCuentas(): Cuenta[] {
    return this.cuentas;
  }

  crearCuenta(tipo: 'ahorros' | 'corriente'): Cuenta {
    const nuevaCuenta: Cuenta = {
      tipo,
      numero: Math.floor(1000000000 + Math.random() * 9000000000).toString(),
      fechaCreacion: new Date()
    };
    this.cuentas.push(nuevaCuenta);
    return nuevaCuenta;
  }

  tieneCuenta(tipo: 'ahorros' | 'corriente'): boolean {
    return this.cuentas.some(c => c.tipo === tipo);
  }

  tieneAlgunaCuenta(): boolean {
    return this.cuentas.length > 0;
  }
}
