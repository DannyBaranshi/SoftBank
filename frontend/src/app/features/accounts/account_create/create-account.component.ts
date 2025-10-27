// src/app/features/accounts/create-account/create-account.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountsService } from '../../accounts/accounts.service';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent {
  tipo: 'ahorros' | 'corriente' = 'ahorros';
  mensaje = '';

  constructor(private accountsService: AccountsService, private router: Router) {}

  crearCuenta() {
    try {
      const cuenta = this.accountsService.crearCuenta(this.tipo);
      this.mensaje = `Cuenta ${cuenta.tipo} creada exitosamente.`;
      setTimeout(() => this.router.navigate(['/cuentas']), 1000);
    } catch (err) {
      this.mensaje = (err as Error).message;
    }
  }
}
