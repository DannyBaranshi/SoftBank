import { Component, OnInit, ChangeDetectorRef, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service'; 
import { Usuario } from '../../services/model';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.scss']
})
export class InicioComponent implements OnInit {
  usuarioActual: Signal<Usuario | null> | null = null; 

  imagenes = [
    'assets/publicidad1.jpg',
    'assets/publicidad2.jpg'
  ];

  indiceActual = 0;

  constructor(
    private router: Router,
    private auth: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Cargamos el usuario al inicializar
    this.usuarioActual = this.auth.obtenerUsuarioActual();
    this.cdr.detectChanges();
  }

  cambiarImagen(index: number) {
    this.indiceActual = index;
  }

  siguienteImagen() {
    this.indiceActual = (this.indiceActual + 1) % this.imagenes.length;
  }

  anteriorImagen() {
    this.indiceActual = (this.indiceActual - 1 + this.imagenes.length) % this.imagenes.length;
  }

  irAProducto(producto: string) {
    this.router.navigate(['/productos'], { queryParams: { tipo: producto } });
  }

  irASeccion(ruta: string) {
    this.router.navigate([ruta]);
  }

  cerrarSesion() {
    this.auth.cerrarSesion();
    this.router.navigate(['/inicio']);
    this.cdr.detectChanges();
  }
}
