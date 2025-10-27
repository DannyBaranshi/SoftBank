<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { AccountService, Cuenta } from './account.service';
import { Router } from '@angular/router';
import { CommonModule, TitleCasePipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-cuentas',
  standalone: true,
  imports: [CommonModule, TitleCasePipe, DatePipe],
=======
// src/app/features/accounts/accounts.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AccountsService } from '../accounts/accounts.service';
import { Cuenta } from '../services/model';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule],
>>>>>>> 7f39322b (Segunda entrega version dos)
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  cuentas: Cuenta[] = [];

<<<<<<< HEAD
  constructor(private cuentasService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.cuentas = this.cuentasService.obtenerCuentas();
  }

  crearCuenta(): void {
    this.router.navigate(['/crear-cuenta']);
=======
  constructor(private accountsService: AccountsService, private router: Router) {}

  ngOnInit() {
    this.cuentas = this.accountsService.listarCuentas();
  }

  crearNueva() {
    this.router.navigate(['/cuentas/crear']);
>>>>>>> 7f39322b (Segunda entrega version dos)
  }
}
