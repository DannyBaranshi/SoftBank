// src/app/core/services/transactions/transactions.service.ts

import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Cuenta, Movimiento } from './model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { firstValueFrom } from 'rxjs';
import { AccountsService } from '../accounts/account.service';

@Injectable({ providedIn: 'root' })
export class TransactionsService {
  private http = inject(HttpClient);
  private account = inject(AccountsService);

  constructor(private auth: AuthService) {}

  /** Agrega saldo a una cuenta */
  async recargar(cuentaId: string, monto: number) {
    const usuario = this.auth.obtenerUsuarioActual()();
    if (!usuario) throw new Error('No hay usuario autenticado.');


    await firstValueFrom(this.http.patch(environment.apiBaseUrl + `/cuentas/${cuentaId}/saldo`, { monto }, {headers: this.account.authHeaders()}));

    this.auth.userResource.reload();
  }


  /** Transfiere fondos entre cuentas del sistema */
  transferir(origenId: string, destinoId: string, monto: number) {
    const usuario = this.auth.obtenerUsuarioActual()();
    if (!usuario) throw new Error('No hay usuario autenticado.');

    const origen = usuario.cuentas.find((c: Cuenta) => c.id === origenId);
    if (!origen) throw new Error('Cuenta origen no encontrada.');
    if (origen.saldo < monto) throw new Error('Saldo insuficiente.');

    // buscar destino (propio u otro usuario)
    const destinoUsuario = this.auth.buscarCuentaGlobal(destinoId);
    if (!destinoUsuario) throw new Error('Cuenta destino no existe.');

    origen.saldo -= monto;
    destinoUsuario.cuenta.saldo += monto;

    const fecha = new Date();

    const movOrigen: Movimiento = {
      id: crypto.randomUUID(),
      tipo: 'transferencia',
      monto,
      fecha,
      destino: destinoId,
      descripcion: `Transferencia hacia ${destinoId}`
    };
    const movDestino: Movimiento = {
      id: crypto.randomUUID(),
      tipo: 'transferencia',
      monto,
      fecha,
      origen: origenId,
      descripcion: `Transferencia desde ${origenId}`
    };

    origen.movimientos = origen.movimientos || [];
    destinoUsuario.cuenta.movimientos = destinoUsuario.cuenta.movimientos || [];
    origen.movimientos.push(movOrigen);
    destinoUsuario.cuenta.movimientos.push(movDestino);

    this.auth.actualizarUsuario(destinoUsuario.usuario);
  }
}
