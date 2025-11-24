import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Cuenta {
  tipo: 'ahorros' | 'corriente';
  numero: string;
  fechaCreacion: Date;
}

export interface CrearCuentaRequest {
  usuarioId?: number;
  saldo?: number;
  cupo?: number;
  cupoSobregiro?: number;
  sobregiro?: boolean;
  clave?: string;
  aceptarTYC?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AccountsService {
  private baseUrl = 'http://localhost:8081';

  constructor(private http: HttpClient) {}

  authHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : ''
    });
  }

  listAccounts(tipo?: string): Observable<any> {
    const headers = this.authHeaders();
    const params: Record<string, string> | undefined = tipo ? { tipo } : undefined;
    return this.http.get(`${this.baseUrl}/cuentas`, { headers, params });
  }

  listAllAccounts(): Observable<any> {
    const headers = this.authHeaders();
    return this.http.get(`${this.baseUrl}/cuentas/todas`, { headers });
  }

  // Tarjetas
  listCards(): Observable<any> {
    const headers = this.authHeaders();
    return this.http.get(`${this.baseUrl}/tarjetas`, { headers });
  }

  payCard(body: { tarjetaId: number; cuentaOrigenId: number; monto: number; otp?: string }): Observable<any> {
    const headers = this.authHeaders();
    return this.http.post(`${this.baseUrl}/tarjetas/pagos`, body, { headers });
  }

  getBalance(cuentaId: number): Observable<any> {
    const headers = this.authHeaders();
    return this.http.get(`${this.baseUrl}/cuentas/${cuentaId}/saldo`, { headers });
  }

  /**
   * Inicia o confirma una transferencia entre cuentas. Si no se envía `otp`, el backend
   * puede responder con 428 (Precondition Required) indicando que se requiere autenticación adicional.
   */
  transfer(body: { origenId: number; destinoId: number; monto: number; otp?: string }): Observable<any> {
    const headers = this.authHeaders();
    console.log({headers});
    return this.http.post(`${this.baseUrl}/cuentas/transferencias`, body, { headers });
  }

  // Crea una cuenta de ahorros. El backend debería extraer el usuario del JWT.
  createAhorros(body: CrearCuentaRequest = {}): Observable<any> {
    const headers = this.authHeaders();
    return this.http.post(`${this.baseUrl}/cuentas/ahorros`, body, { headers });
  }

  // Crea una cuenta corriente. El backend debería extraer el usuario del JWT.
  createCorriente(body: CrearCuentaRequest = {}): Observable<any> {
    const headers = this.authHeaders();
    return this.http.post(`${this.baseUrl}/cuentas/corriente`, body, { headers });
  }
}