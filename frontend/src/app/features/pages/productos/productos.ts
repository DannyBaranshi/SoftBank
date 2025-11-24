import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ModalLoginService } from '../../services/modal-login.service';
import { PagoTarjetaComponent } from "../pagos/pago-tarjeta.component";

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  descripcionLarga: string;
}

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule, PagoTarjetaComponent],
  templateUrl: './productos.html',
  styleUrls: ['./productos.scss']
})
export class ProductosComponent {

  constructor(
    private router: Router,
    private authService: AuthService,
    private modalService: ModalLoginService
  ) {}

  // Estado de sesión real
  isLoggedIn = computed(() => this.authService.usuarioActual() !== null);
  // Productos disponibles
  productos: Producto[] = [
    { id: 1, nombre: 'Cuenta de Ahorros', descripcion: 'Ahorra y gana intereses.', descripcionLarga: 'Nuestra cuenta de ahorros ofrece flexibilidad total y beneficios exclusivos.' },
    { id: 2, nombre: 'Crédito de Consumo', descripcion: 'Financia tus sueños personales.', descripcionLarga: 'Solicita créditos con tasas competitivas y plazos adaptables.' },
    { id: 6, nombre: 'Crédito Hipotecario', descripcion: 'Simula tu crédito para vivienda.', descripcionLarga: 'Simula cuotas y monto total para créditos hipotecarios a tasa fija.' },
    { id: 3, nombre: 'Tarjeta de Crédito', descripcion: 'Compra y paga después.', descripcionLarga: 'Disfruta de beneficios exclusivos y control total de tus compras.' },
    { id: 4, nombre: 'CDT', descripcion: 'Invierte con rentabilidad fija.', descripcionLarga: 'Seguridad y rentabilidad asegurada a corto o mediano plazo.' },
    { id: 5, nombre: 'Cuenta Empresarial', descripcion: 'Gestiona tu negocio fácilmente.', descripcionLarga: 'Soluciones financieras diseñadas para empresas en crecimiento.' }
  ];

  // Productos adquiridos (mock temporal, puede venir del usuario)
  misProductos: Producto[] = [];

  // Estado modal y simulador
  productoSeleccionado: Producto | null = null;
  montoSimulado = 0;
  tasaInteres = 0;
  plazoMeses = 0;
  tipoCalculo: 'simple' | 'compuesto' = 'simple';
  aplicar4x1000 = false;
  // resultado ahora incluye intereses totales para hipoteca
  resultadoSimulacion: { total: number; cuota: number; interesesTotales?: number } | null = null;
  formError: string | null = null;

  // -------------------------------
  // Funciones principales
  // -------------------------------

  verProducto(producto: Producto) {
    if (!this.isLoggedIn()) {
      alert('Debes iniciar sesión para adquirir un producto.');
      this.redirigirLogin();
      return;
    }
    this.productoSeleccionado = producto;
  }

  cerrarModal() {
    this.productoSeleccionado = null;
    this.montoSimulado = 0;
    this.tasaInteres = 0;
    this.plazoMeses = 0;
    this.resultadoSimulacion = null;
  }

  redirigirLogin() {
    this.modalService.open();
  }

  adquirirProducto(producto: Producto) {
    this.router.navigate(['/solicitar-productos'], { queryParams: { id: producto.id } });
    this.cerrarModal();
  }

  // -------------------------------
  // Simulador Financiero
  // -------------------------------
  simularFinanciero() {
    // Validación accesible: mostrar error en la UI en vez de alert
    this.formError = null;
    if (this.montoSimulado <= 0) { this.formError = 'El monto debe ser mayor que 0.'; return; }
    if (this.tasaInteres <= 0) { this.formError = 'La tasa de interés debe ser mayor que 0.'; return; }
    if (this.plazoMeses <= 0) { this.formError = 'El plazo debe ser mayor que 0 meses.'; return; }

    const P = this.montoSimulado;
    const annualRate = this.tasaInteres / 100;
    const r = annualRate / 12; // tasa mensual
    const n = this.plazoMeses;

    let cuota = 0;
    let total = 0;
    let interesesTotales = 0;

    // Si el producto seleccionado es un crédito hipotecario, usar fórmula estándar de crédito (cuota fija)
    if (this.productoSeleccionado && this.productoSeleccionado.nombre.toLowerCase().includes('hipotec')) {
      if (r === 0) {
        cuota = P / n;
      } else {
        const factor = Math.pow(1 + r, n);
        cuota = P * r * factor / (factor - 1);
      }
      total = cuota * n;
      interesesTotales = total - P;
    } else {
      // Uso previo: interés simple o compuesto genérico
      if (this.tipoCalculo === 'simple') {
        total = P + (P * annualRate * (n / 12));
      } else {
        total = P * Math.pow(1 + r, n);
      }
      if (this.aplicar4x1000) {
        total -= P * 0.004;
      }
      cuota = total / n;
      interesesTotales = total - P;
    }

    this.resultadoSimulacion = {
      total: parseFloat(total.toFixed(2)),
      cuota: parseFloat(cuota.toFixed(2)),
      interesesTotales: parseFloat(interesesTotales.toFixed(2))
    };
    // Clear any previous form error after successful calculation
    this.formError = null;
  }
}
