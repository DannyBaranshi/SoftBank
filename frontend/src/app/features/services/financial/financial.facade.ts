import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountsService } from '../../accounts/account.service';
import { TransactionsService } from '../../services/transactions.service';
import { AccountsStateService } from '../../accounts/accounts-state.service';

@Injectable({ providedIn: 'root' })
export class FinancialFacade {
  constructor(
    private api: AccountsService,
    private txService: TransactionsService,
    private accountsState: AccountsStateService
  ) {}

  // User accounts (from backend)
  listUserAccounts(): Observable<any> {
    return this.api.listAccounts();
  }

  // All accounts (for destination selection)
  listAllAccounts(): Observable<any> {
    return this.api.listAllAccounts();
  }

  // Cards for the authenticated user
  listCards(): Observable<any> {
    return this.api.listCards();
  }

  // Transfer (backend)
  transfer(payload: { origenId: number; destinoId: number; monto: number; otp?: string }): Observable<any> {
    return this.api.transfer(payload);
  }

  // Pay card (backend)
  payCard(payload: { tarjetaId: number; cuentaOrigenId: number; monto: number; otp?: string }): Observable<any> {
    return this.api.payCard(payload);
  }

  // Client-only recarga (keeps existing logic) and then refresh state
  recargarLocal(cuentaId: string, monto: number) {
    this.txService.recargar(cuentaId, monto);
    // update global state snapshot (accountsState uses backend) - try to refresh
    this.accountsState.refresh();
  }

  // Helper to refresh central accounts state
  refreshAccountsState() {
    this.accountsState.refresh();
  }
}
