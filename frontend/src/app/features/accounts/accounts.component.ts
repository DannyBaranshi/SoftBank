import { Component, OnInit } from '@angular/core';
import { AccountService, Cuenta } from './account.service';
import { Router } from '@angular/router';
import { CommonModule, TitleCasePipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-cuentas',
  standalone: true,
  imports: [CommonModule, TitleCasePipe, DatePipe],
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  cuentas: Cuenta[] = [];

  constructor(private cuentasService: AccountService, private router: Router) {}

  ngOnInit(): void {
    this.cuentas = this.cuentasService.obtenerCuentas();
  }

  crearCuenta(): void {
    this.router.navigate(['/crear-cuenta']);
  }
}
