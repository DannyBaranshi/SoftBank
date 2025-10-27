// src/app/features/services/modal-login.service.ts
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ModalLoginService {
  private _showLoginModal = signal(false);
  showLoginModal = this._showLoginModal.asReadonly();

  open() {
    this._showLoginModal.set(true);
  }

  close() {
    this._showLoginModal.set(false);
  }
}
