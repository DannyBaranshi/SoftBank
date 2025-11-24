import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Articulo {
  id: number;
  titulo: string;
  descripcion: string;
  tipo: 'general' | 'legal';
}

@Component({
  selector: 'app-informacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './informacion.html',
  styleUrl: './informacion.scss'
})

export class InformacionComponent {
  isLoggedIn = signal(false);
  articulos: Articulo[] = [
    { id: 1, titulo: 'Historia del Banco', descripcion: 'Resumen histórico y evolución institucional.', tipo: 'general' },
    { id: 2, titulo: 'Noticias Recientes', descripcion: 'Últimos comunicados sobre innovación y servicios.', tipo: 'general' },
    { id: 3, titulo: 'Responsabilidad Social', descripcion: 'Proyectos de sostenibilidad y educación financiera.', tipo: 'general' },
    { id: 4, titulo: 'Política de Privacidad', descripcion: 'Detalles sobre manejo de datos personales.', tipo: 'legal' },
    { id: 5, titulo: 'Términos y Condiciones', descripcion: 'Condiciones generales de uso de los servicios.', tipo: 'legal' },
    { id: 6, titulo: 'Beneficios de Usuario', descripcion: 'Ventajas exclusivas al ser cliente registrado.', tipo: 'general' },
    { id: 7, titulo: 'Reglamentos Financieros', descripcion: 'Documentación de regulación bancaria vigente.', tipo: 'legal' },
    { id: 8, titulo: 'Proyecciones Institucionales', descripcion: 'Visión futura del banco y metas estratégicas.', tipo: 'general' },
    { id: 9, titulo: 'Publicaciones Oficiales', descripcion: 'Enlaces a boletines y comunicados públicos.', tipo: 'general' },
  ];

  articulosGuardados: Articulo[] = [];

  constructor() {
    const saved = localStorage.getItem('articulosGuardados');
    if (saved) {
      this.articulosGuardados = JSON.parse(saved);
    }
  }

  guardarArticulo(articulo: Articulo) {
    if (!this.articulosGuardados.some(a => a.id === articulo.id)) {
      this.articulosGuardados.push(articulo);
      localStorage.setItem('articulosGuardados', JSON.stringify(this.articulosGuardados));
      alert(`"${articulo.titulo}" se ha guardado correctamente.`);
    } else {
      alert('Este artículo ya está guardado.');
    }
  }

  descargarDocumento(articulo: Articulo) {
    const blob = new Blob([`Documento oficial: ${articulo.titulo}\n\n${articulo.descripcion}`], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${articulo.titulo}.txt`;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  iniciarSesionSimulada() {
    this.isLoggedIn.set(true);
  }

  cerrarSesionSimulada() {
    this.isLoggedIn.set(false);
  }

}
