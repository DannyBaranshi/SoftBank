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
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  cuentas: Cuenta[] = [];

  constructor(private accountsService: AccountsService, private router: Router) {}

  ngOnInit() {
    this.cuentas = this.accountsService.listarCuentas();
  }

  crearNueva() {
    this.router.navigate(['/cuentas/crear']);
  }
}
