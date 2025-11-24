import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AccountsService as ApiAccountsService } from './account.service';

@Injectable({ providedIn: 'root' })
export class AccountsStateService {
  private accountsSubject = new BehaviorSubject<any[]>([]);
  accounts$ = this.accountsSubject.asObservable();

  constructor(private api: ApiAccountsService) {}

  refresh(): void {
    this.api.listAccounts().subscribe({
      next: (res) => this.accountsSubject.next(res || []),
      error: () => this.accountsSubject.next([])
    });
  }

  getSnapshot(): any[] {
    return this.accountsSubject.getValue();
  }
}
