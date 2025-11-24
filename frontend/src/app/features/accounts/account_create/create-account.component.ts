// src/app/features/accounts/create-account/create-account.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountsService as LocalAccountsService } from '../../accounts/accounts.service';
import { AccountsService as ApiAccountsService } from '../../accounts/account.service';
import { AccountsStateService } from '../accounts-state.service';

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
  cargando = false;
  // state managed centrally

  constructor(
    private localAccountsService: LocalAccountsService,
    private apiAccountsService: ApiAccountsService,
    private accountsState: AccountsStateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Precarga centralizada: refrescar el estado global de cuentas (usado por AccountsComponent)
    try { this.accountsState.refresh(); } catch (e) { console.error('Error precargando cuentas', e); }
  }

  crearCuenta() {
    // Preferimos llamar al backend. Dejamos disponible el local service si se desea fallback.
    this.mensaje = '';
    this.cargando = true;

    const obs = this.tipo === 'ahorros'
      ? this.apiAccountsService.createAhorros({ saldo: 0 })
      : this.apiAccountsService.createCorriente({ saldo: 0, cupo: 0, cupoSobregiro: 0, sobregiro: false, clave: '', aceptarTYC: true });

    obs.subscribe({
      next: (res) => {
        this.cargando = false;
        // El backend puede devolver la cuenta creada en res
        this.mensaje = 'Cuenta creada exitosamente.';
        // refrescar estado global para que otros componentes (AccountsComponent) actualicen
        this.accountsState.refresh();
        // navegar al listado de cuentas
        setTimeout(() => this.router.navigate(['/cuentas']), 800);
      },
      error: (err) => {
        this.cargando = false;
        console.error('Error crearCuenta', err);
        // manejar respuestas conocidas
        if (err && err.status) {
          if (err.status === 400) this.mensaje = err.error?.message || 'Datos de creación inválidos.';
          else if (err.status === 401 || err.status === 403) this.mensaje = 'No autorizado. Por favor inicie sesión.';
          else if (err.status === 503) this.mensaje = 'Servicio no disponible temporalmente. Intente más tarde.';
          else this.mensaje = err.error?.message || 'Error al crear la cuenta.';
        } else {
          this.mensaje = 'Error de red. Verifique su conexión.';
        }
      }
    });
  }
}
