import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // para ngModel
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  // Estado de sesión (simulado con signals)
  private _isLoggedIn = signal(false); // Reemplazar luego con servicio real
  isLoggedIn = this._isLoggedIn.asReadonly();

  // Productos disponibles
  productos: Producto[] = [
    { id: 1, nombre: 'Cuenta de Ahorros', descripcion: 'Ahorra y gana intereses.', descripcionLarga: 'Nuestra cuenta de ahorros ofrece flexibilidad total y beneficios exclusivos.' },
    { id: 2, nombre: 'Crédito de Consumo', descripcion: 'Financia tus sueños personales.', descripcionLarga: 'Solicita créditos con tasas competitivas y plazos adaptables.' },
    { id: 3, nombre: 'Tarjeta de Crédito', descripcion: 'Compra y paga después.', descripcionLarga: 'Disfruta de beneficios exclusivos y control total de tus compras.' },
    { id: 4, nombre: 'CDT', descripcion: 'Invierte con rentabilidad fija.', descripcionLarga: 'Seguridad y rentabilidad asegurada a corto o mediano plazo.' },
    { id: 5, nombre: 'Cuenta Empresarial', descripcion: 'Gestiona tu negocio fácilmente.', descripcionLarga: 'Soluciones financieras diseñadas para empresas en crecimiento.' }
  ];

  // Productos adquiridos
  misProductos: Producto[] = [];

  // Estado de modal y simulador
  productoSeleccionado: Producto | null = null;
  montoSimulado = 0;
  tasaInteres = 0;
  plazoMeses = 0;
  resultadoSimulacion: number | null = null;

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
    // Redirección simulada (ajustar al router real)
    alert('Redirigiendo a inicio de sesión...');
    this.router.navigate(['/inicio']);
  }

  adquirirProducto(producto: Producto) {
    if (!this.misProductos.includes(producto)) {
      this.misProductos.push(producto);
      alert(`Has adquirido: ${producto.nombre}`);
    } else {
      alert('Ya tienes este producto adquirido.');
    }
    this.cerrarModal();
  }

  simularFinanciero() {
    if (this.montoSimulado <= 0 || this.tasaInteres <= 0 || this.plazoMeses <= 0) {
      alert('Completa todos los campos con valores válidos.');
      return;
    }
    const tasaMensual = this.tasaInteres / 100 / 12;
    const cuota = (this.montoSimulado * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -this.plazoMeses));
    this.resultadoSimulacion = parseFloat(cuota.toFixed(2));
  }
}
