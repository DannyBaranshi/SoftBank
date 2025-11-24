// src/app/core/models.ts

export interface Cuenta {
  id: string;
  tipo: 'ahorros' | 'corriente';
  saldo: number;
  fechaCreacion: Date;
  productos: string[];
  movimientos?: any[];
}

export interface HistorialTransaccion {
  id: string;
  origen: string;
  destino: string;
  monto: number;
  fecha: Date;
  descripcion: string;
}

export interface Usuario {
  username: string;
  email: string;
  cuentas: Cuenta[];
  historial: HistorialTransaccion[];
}

export interface Movimiento {
  id: string;
  tipo: 'recarga' | 'transferencia' | 'retiro';
  monto: number;
  fecha: Date;
  origen?: string;
  destino?: string;
  descripcion?: string;
}
