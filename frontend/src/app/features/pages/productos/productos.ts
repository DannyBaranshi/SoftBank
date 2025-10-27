import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ModalLoginService } from '../../services/modal-login.service';

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  descripcionLarga: string;
}

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
  resultadoSimulacion: { total: number; cuota: number } | null = null;

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
    // Redirigir a la página de solicitud (ordenarproductos)
    this.router.navigate(['/ordenarproductos'], { queryParams: { id: producto.id } });
    this.cerrarModal();
  }

  // -------------------------------
  // Simulador Financiero
  // -------------------------------
  simularFinanciero() {
    if (this.montoSimulado <= 0 || this.tasaInteres <= 0 || this.plazoMeses <= 0) {
      alert('Completa todos los campos con valores válidos.');
      return;
    }

    const P = this.montoSimulado;
    const r = this.tasaInteres / 100 / 12; // tasa mensual
    const n = this.plazoMeses;
    let total = 0;
    let cuota = 0;

    if (this.tipoCalculo === 'simple') {
      total = P + (P * (this.tasaInteres / 100) * (n / 12));
    } else {
      total = P * Math.pow(1 + r, n);
    }

    if (this.aplicar4x1000) {
      total -= P * 0.004;
    }

    cuota = total / n;
    this.resultadoSimulacion = {
      total: parseFloat(total.toFixed(2)),
      cuota: parseFloat(cuota.toFixed(2))
    };
  }
}
