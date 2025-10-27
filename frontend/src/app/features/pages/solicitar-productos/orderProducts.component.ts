import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  prioridad?: number;
}

@Component({
  selector: 'app-ordenar-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './orderProducts.component.html',
  styleUrls: ['./orderProducts.component.scss']
})
export class OrderProductsComponent {

  // Lista simulada de productos adquiridos (puede venir de un servicio)
  productos = signal<Producto[]>([
    { id: 1, nombre: 'Cuenta de Ahorros', descripcion: 'Ahorra con seguridad.' },
    { id: 2, nombre: 'Crédito de Consumo', descripcion: 'Financia tus sueños.' },
    { id: 3, nombre: 'Tarjeta de Crédito', descripcion: 'Compra con beneficios.' },
    { id: 4, nombre: 'CDT', descripcion: 'Invierte con rentabilidad fija.' }
  ]);

  productoSeleccionado: Producto | null = null;
  mensajeConfirmacion: string | null = null;

  moverArriba(index: number) {
    if (index > 0) {
      const lista = [...this.productos()];
      [lista[index - 1], lista[index]] = [lista[index], lista[index - 1]];
      this.productos.set(lista);
    }
  }

  moverAbajo(index: number) {
    const lista = [...this.productos()];
    if (index < lista.length - 1) {
      [lista[index + 1], lista[index]] = [lista[index], lista[index + 1]];
      this.productos.set(lista);
    }
  }

  seleccionarProducto(p: Producto) {
    this.productoSeleccionado = p;
  }

  guardarOrden() {
    this.mensajeConfirmacion = 'El orden de tus productos ha sido guardado exitosamente.';
    setTimeout(() => this.mensajeConfirmacion = null, 2500);
  }
}
