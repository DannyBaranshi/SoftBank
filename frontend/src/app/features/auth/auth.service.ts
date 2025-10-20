import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private users = new Map<string, string>(); // almacena usuario: contraseña
  private currentUser = signal<string | null>(null);

  register(username: string, password: string): boolean {
    if (this.users.has(username)) return false;
    this.users.set(username, password);
    this.currentUser.set(username);
    return true;
  }

  login(username: string, password: string): boolean {
    const storedPassword = this.users.get(username);
    if (storedPassword && storedPassword === password) {
      this.currentUser.set(username);
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUser.set(null);
  }

  getCurrentUser() {
    return this.currentUser();
  }

  isLoggedIn(): boolean {
    return this.currentUser() !== null;
  }
}
