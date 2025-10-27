// src/app/features/saldo/saldo.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountsService } from '../../accounts/accounts.service';
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

  constructor(
    private accountsService: AccountsService,
    private transService: TransactionsService
  ) {}

  ngOnInit() {
    this.cuentas = this.accountsService.listarCuentas();
  }

  recargar() {
    if (!this.cuentaSeleccionada || this.monto <= 0) return;
    try {
      this.transService.recargar(this.cuentaSeleccionada, this.monto);
      this.mensaje = 'Recarga exitosa.';
      this.cuentas = this.accountsService.listarCuentas();
      this.monto = 0;
    } catch (e) {
      this.mensaje = (e as Error).message;
    }
  }
}