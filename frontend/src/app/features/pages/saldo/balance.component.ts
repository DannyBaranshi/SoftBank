// src/app/features/saldo/saldo.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountsService } from '../../accounts/account.service';
import { TransactionsService } from '../../services/transactions.service';
import { Cuenta } from '../../services/model';

@Component({
  selector: 'app-saldo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})

export class BalanceComponent implements OnInit {
  cuentas: Cuenta[] = [];
  cuentaSeleccionada: string = '';
  monto = 0;
  mensaje = '';

  selectedCuentaId: string | null = null;
  cargandoSaldo = false;
  saldo: { saldoDisponible?: number; saldoContable?: number } | null = null;
  saldoError = '';
  lastConsultedId: string | null = null;

  constructor(
    private accountsService: AccountsService,
    private transService: TransactionsService
  ) {}

  ngOnInit() {
    // Cargar cuentas desde backend
    this.loadAccounts();
  }

  recargar() {
    if (!this.cuentaSeleccionada || this.monto <= 0) return;
    try {
      this.transService.recargar(this.cuentaSeleccionada, this.monto);
      this.mensaje = 'Recarga exitosa.';
      this.loadAccounts();
      this.monto = 0;
    } catch (e) {
      this.mensaje = (e as Error).message;
    }
  }

  loadAccounts() {
    this.accountsService.listAccounts().subscribe({
      next: (res: any[]) => {
        this.cuentas = (res || []).map(r => ({
          id: String(r.idCuenta || r.id || r.numeroCuenta),
          tipo: (r.tipoCuenta && r.tipoCuenta.toLowerCase() === 'ahorros') ? 'ahorros' : 'corriente',
          saldo: r.saldo ?? 0,
          fechaCreacion: r.fechaCreacion ? new Date(r.fechaCreacion) : new Date(),
          productos: [],
          movimientos: r.movimientos || []
        }));
        // Initialize selectedCuentaId if not yet set
        if (!this.selectedCuentaId && this.cuentas.length > 0) {
          this.selectedCuentaId = this.cuentas[0].id;
          this.cuentaSeleccionada = this.selectedCuentaId;
        }
      },
      error: (err: any) => {
        this.mensaje = 'No fue posible cargar las cuentas.';
      }
    });
  }

  consultarSaldo() {
    if (!this.selectedCuentaId) {
      if (this.cuentas.length === 0) return;
      this.selectedCuentaId = this.cuentas[0].id;
      this.cuentaSeleccionada = this.selectedCuentaId;
    }

    this.saldoError = '';
    this.saldo = null;
    this.cargandoSaldo = true;
    const idNum = Number(this.selectedCuentaId);
    this.accountsService.getBalance(idNum).subscribe({
      next: (res) => {
        this.cargandoSaldo = false;
        this.saldo = { saldoDisponible: res.saldoDisponible, saldoContable: res.saldoContable };
        this.lastConsultedId = String(idNum);
      },
      error: (err) => {
        this.cargandoSaldo = false;
        if (err && err.status === 503) this.saldoError = 'Servicio no disponible temporalmente. Intente más tarde.';
        else if (err && err.status === 404) this.saldoError = 'Cuenta no encontrada.';
        else if (err && (err.status === 401 || err.status === 403)) this.saldoError = 'No autorizado. Por favor inicie sesión.';
        else this.saldoError = 'Error al consultar el saldo.';
      }
    });
  }

  restablecerCuentas() {
    this.selectedCuentaId = null;
    this.cuentaSeleccionada = '';
    this.saldo = null;
    this.saldoError = '';
    this.lastConsultedId = null;
    this.loadAccounts();
  }
}
