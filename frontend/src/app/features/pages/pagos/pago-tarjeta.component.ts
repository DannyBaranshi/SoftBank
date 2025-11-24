import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountsService } from '../../accounts/account.service';
import { Cuenta } from '../../services/model';

@Component({
  selector: 'app-pago-tarjeta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pago-tarjeta.component.html',
  styleUrls: ['./pago-tarjeta.component.scss']
})
export class PagoTarjetaComponent implements OnInit {
  cuentas: Cuenta[] = [];
  tarjetas: any[] = [];
  tarjetaSeleccionada: number | null = null;
  cuentaOrigen: string = '';
  monto = 0;
  loading = false;
  otpRequired = false;
  otpCode = '';
  mensaje = '';
  error = '';
  receipt: any = null;

  constructor(private api: AccountsService) {}

  ngOnInit(): void {
    this.loadUserAccounts();
    this.loadTarjetas();
  }

  loadUserAccounts() {
    this.api.listAccounts().subscribe({
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
      error: () => this.error = 'No fue posible cargar cuentas'
    });
  }

  loadTarjetas() {
    this.api.listCards().subscribe({
      next: (res: any[]) => {
        this.tarjetas = (res || []).map(t => ({
          id: t.idTarjeta || t.id || t.numeroTarjeta,
          numero: t.numeroTarjeta,
          cupoTotal: t.cupoTotal,
          cupoDisponible: t.cupoDisponible,
          cuentaId: t.cuenta?.idCuenta
        }));
      },
      error: () => this.error = 'No fue posible cargar tarjetas'
    });
  }

  iniciarPago() {
    if (!window.confirm('¿Está seguro que desea realizar este pago de tarjeta?')) {
      return;
    }
    this.error = '';
    this.mensaje = '';
    this.receipt = null;
    if (!this.tarjetaSeleccionada || !this.cuentaOrigen || this.monto <= 0) { this.error = 'Complete tarjeta, cuenta y monto.'; return; }

    this.loading = true;
    this.api.payCard({ tarjetaId: this.tarjetaSeleccionada as number, cuentaOrigenId: Number(this.cuentaOrigen), monto: this.monto }).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.receipt = res;
        this.mensaje = 'Pago realizado correctamente.';
        this.otpRequired = false;
        this.otpCode = '';
        this.loadUserAccounts();
        this.loadTarjetas();
      },
      error: (err: any) => {
        this.loading = false;
        if (err && err.status === 428) {
          this.otpRequired = true;
          this.mensaje = 'Se requiere autenticación adicional. Ingrese OTP.';
        } else if (err && err.error && err.error.message) {
          this.error = err.error.message;
        } else {
          this.error = 'Error al procesar el pago.';
        }
      }
    });
  }

  confirmarOtp() {
    if (!this.otpCode) { this.error = 'Ingrese OTP.'; return; }
    this.loading = true;
    this.api.payCard({ tarjetaId: this.tarjetaSeleccionada as number, cuentaOrigenId: Number(this.cuentaOrigen), monto: this.monto, otp: this.otpCode }).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.receipt = res;
        this.mensaje = 'Pago realizado correctamente.';
        this.otpRequired = false;
        this.otpCode = '';
        this.loadUserAccounts();
        this.loadTarjetas();
      },
      error: (err: any) => {
        this.loading = false;
        this.error = (err && err.error && err.error.message) ? err.error.message : 'Error en confirmación.';
      }
    });
  }
}