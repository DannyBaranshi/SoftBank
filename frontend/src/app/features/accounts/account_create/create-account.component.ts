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
  }
}
