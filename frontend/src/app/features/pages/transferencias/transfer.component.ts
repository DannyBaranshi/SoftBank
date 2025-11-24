// src/app/features/transferencias/transferencias.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountsService } from '../../accounts/account.service';
import { TransactionsService } from '../../services/transactions.service';
import { FinancialFacade } from '../../services/financial/financial.facade';
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
  destinos: Cuenta[] = [];
  origen = '';
  destino = '';
  monto = 0;
  mensaje = '';
  error = '';
  loading = false;
  otpRequired = false;
  otpCode = '';
  receipt: any = null;

  constructor(
    private accountsService: AccountsService,
    private transService: TransactionsService,
    private facade: FinancialFacade
  ) {}

  ngOnInit() {
    // usar el facade para centralizar llamadas
    this.facade.listUserAccounts().subscribe({
      next: (res: any[]) => {
        this.cuentas = (res || []).map(r => ({
          id: String(r.idCuenta || r.id || r.numeroCuenta),
          tipo: (r.tipoCuenta && r.tipoCuenta.toLowerCase() === 'ahorros') ? 'ahorros' : 'corriente',
          saldo: r.saldo ?? 0,
          fechaCreacion: r.fechaCreacion ? new Date(r.fechaCreacion) : new Date(),
          productos: [],
          movimientos: r.movimientos || []
        }));
      },
      error: (err: any) => {
        this.error = 'No fue posible cargar las cuentas del usuario.';
      }
    });

    this.facade.listAllAccounts().subscribe({
      next: (res: any[]) => {
        this.destinos = (res || []).map(r => ({
          id: String(r.idCuenta || r.id || r.numeroCuenta),
          tipo: (r.tipoCuenta && r.tipoCuenta.toLowerCase() === 'ahorros') ? 'ahorros' : 'corriente',
          saldo: r.saldo ?? 0,
          fechaCreacion: r.fechaCreacion ? new Date(r.fechaCreacion) : new Date(),
          productos: [],
          movimientos: r.movimientos || []
        }));
      },
      error: (err: any) => {
        console.warn('No fue posible cargar cuentas destino', err);
      }
    });
  }

  transferir() {
    if (!window.confirm('¿Está seguro que desea realizar esta transferencia?')) {
      return;
    }
    this.error = '';
    this.mensaje = '';
    this.receipt = null;
    if (!this.origen || !this.destino || this.monto <= 0) {
      this.error = 'Completa origen, destino y monto válido.';
      return;
    }

    this.loading = true;
    this.facade.transfer({ origenId: Number(this.origen), destinoId: Number(this.destino), monto: this.monto })
      .subscribe({
        next: (res: any) => {
          this.loading = false;
          this.receipt = res;
          this.mensaje = 'Transferencia realizada correctamente.';
          // refrescar cuentas en el estado central
          this.facade.refreshAccountsState();
          this.monto = 0;
          this.otpRequired = false;
          this.otpCode = '';
        },
        error: (err: any) => {
          this.loading = false;
          if (err && err.status === 428) {
            // OTP requerido
            this.otpRequired = true;
            this.mensaje = 'Se requiere autenticación adicional. Ingrese el código OTP.';
          } else if (err && err.error && err.error.message) {
            this.error = err.error.message;
          } else if (err && err.status === 401) {
            this.error = 'Código OTP inválido o no autorizado.';
          } else if (err && err.status === 403) {
            this.error = 'No tiene permiso para operar desde la cuenta origen.';
          } else if (err && err.status === 400) {
            this.error = err.error && err.error.message ? err.error.message : 'Solicitud inválida.';
          } else {
            this.error = 'Error al procesar la transferencia.';
          }
        }
      });
  }

  confirmOtp() {
    if (!this.otpCode) { this.error = 'Ingrese el código OTP.'; return; }
    this.error = '';
    this.loading = true;
    this.facade.transfer({ origenId: Number(this.origen), destinoId: Number(this.destino), monto: this.monto, otp: this.otpCode })
      .subscribe({
        next: (res: any) => {
          this.loading = false;
          this.receipt = res;
          this.mensaje = 'Transferencia realizada correctamente.';
          this.otpRequired = false;
          this.otpCode = '';
          this.facade.refreshAccountsState();
        },
        error: (err: any) => {
          this.loading = false;
          if (err && err.status === 401) {
            this.error = 'OTP inválido.';
          } else {
            this.error = 'Error al procesar la confirmación.';
          }
        }
      });
  }
}