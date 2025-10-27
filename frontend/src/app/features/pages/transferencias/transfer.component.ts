// src/app/features/transferencias/transferencias.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountsService } from '../../accounts/accounts.service';
import { TransactionsService } from '../../services/transactions.service';
import { Cuenta} from '../../services/model';

@Component({
  selector: 'app-transferencias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {
  cuentas: Cuenta[] = [];
  origen = '';
  destino = '';
  monto = 0;
  mensaje = '';

  constructor(
    private accountsService: AccountsService,
    private transService: TransactionsService
  ) {}

  ngOnInit() {
    this.cuentas = this.accountsService.listarCuentas();
  }

  transferir() {
    if (!this.origen || !this.destino || this.monto <= 0) return;
    try {
      this.transService.transferir(this.origen, this.destino, this.monto);
      this.mensaje = 'Transferencia realizada correctamente.';
      this.cuentas = this.accountsService.listarCuentas();
      this.monto = 0;
    } catch (e) {
      this.mensaje = (e as Error).message;
    }
  }
}