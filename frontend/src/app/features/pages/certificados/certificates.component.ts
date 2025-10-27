import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Certificado {
  id: string;
  producto: string;
  fechaEmision: string;
  descripcion: string;
  url?: string;
}

@Component({
  selector: 'app-certificates',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certificates.component.html',
  styleUrls: ['./certificates.component.scss']
})
export class CertificatesComponent {

  certificados = signal<Certificado[]>([
    {
      id: 'C-001',
      producto: 'Cuenta de Ahorros',
      fechaEmision: '2025-03-10',
      descripcion: 'Certificado de titularidad y saldo a la fecha de corte.',
    },
    {
      id: 'C-002',
      producto: 'CDT',
      fechaEmision: '2025-04-22',
      descripcion: 'Constancia de inversión y tasa aplicada.',
    }
  ]);

  descargarCertificado(c: Certificado) {
    alert(`Descargando certificado ${c.id} (${c.producto})`);
    // Aquí luego podrías implementar la descarga real (PDF o API)
  }
}
