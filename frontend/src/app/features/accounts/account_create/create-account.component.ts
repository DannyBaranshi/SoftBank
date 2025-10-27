<<<<<<< HEAD
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './create-account.component.html',
})
export class CrearCuentaComponent {
  tipoSeleccionado: 'ahorros' | 'corriente' | null = null;
  cuentaCreada: any = null;

  constructor(private cuentasService: AccountService, private router: Router) {}

  seleccionarTipo(tipo: 'ahorros' | 'corriente') {
    this.tipoSeleccionado = tipo;
  }

  confirmarCreacion() {
    if (!this.tipoSeleccionado) return;
    this.cuentaCreada = this.cuentasService.crearCuenta(this.tipoSeleccionado);
    alert(`Cuenta ${this.tipoSeleccionado} creada con éxito`);
    this.router.navigate(['/cuentas']);
=======
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
>>>>>>> 7f39322b (Segunda entrega version dos)
  }
}
