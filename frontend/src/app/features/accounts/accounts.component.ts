// src/app/features/accounts/accounts.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountsService as ApiAccountsService } from './account.service';
import { AccountsStateService } from './accounts-state.service';
import { Cuenta } from '../services/model';


@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  cuentas: Cuenta[] = [];
  hasAhorros = false;
  hasCorriente = false;

  constructor(private accountsService: ApiAccountsService, private accountsState: AccountsStateService, private router: Router) {}

  ngOnInit() {
    this.accountsState.refresh();
    this.accountsState.accounts$.subscribe((res: any[]) => {
      const arr = res || [];
      this.cuentas = arr.map(r => ({
        id: String(r.idCuenta || r.id || r.numeroCuenta),
        tipo: (r.tipoCuenta && r.tipoCuenta.toLowerCase() === 'ahorros') ? 'ahorros' : 'corriente',
        saldo: r.saldo ?? 0,
        fechaCreacion: r.fechaCreacion ? new Date(r.fechaCreacion) : new Date(),
        productos: [],
        movimientos: r.movimientos || []
      }));

      this.hasAhorros = this.cuentas.some(c => c.tipo === 'ahorros');
      this.hasCorriente = this.cuentas.some(c => c.tipo === 'corriente');
    });
  }

  selectCuenta(id: string) {
  }

  onTileKeydown(event: KeyboardEvent, id: string) {
    const key = event.key;
    if (key === 'Enter' || key === ' ') {
      event.preventDefault();
      this.selectCuenta(id);
    }
  }

  isSelected(id: string) {
    return false;
  }

  crearNueva() {
    this.router.navigate(['/cuentas/crear']);
  }
}
