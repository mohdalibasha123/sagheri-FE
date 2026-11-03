import { Injectable, signal, computed } from '@angular/core';
import { UserProfile } from '../models/auth.model';
import { UserRole } from '../enums';

const TOKEN_KEY = 'sagheri_access_token';
const REFRESH_KEY = 'sagheri_refresh_token';
const USER_KEY = 'sagheri_current_user';

@Injectable({ providedIn: 'root' })
export class AuthStateService {
  readonly currentUser = signal<UserProfile | null>(this.readStoredUser());
  readonly isAuthenticated = computed(() => this.currentUser() !== null);
  readonly isAdmin = computed(() =>
    this.currentUser()?.roles.includes(UserRole.ADMIN) ?? false,
  );

  setUser(user: UserProfile, accessToken: string, refreshToken: string): void {
    this.currentUser.set(user);
    localStorage.setItem(TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_KEY, refreshToken);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  clearUser(): void {
    this.currentUser.set(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(USER_KEY);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_KEY);
  }

  hasRole(role: UserRole): boolean {
    return this.currentUser()?.roles.includes(role) ?? false;
  }

  hasPermission(permission: string): boolean {
    return this.currentUser()?.permissions.includes(permission) ?? false;
  }

  private readStoredUser(): UserProfile | null {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? (JSON.parse(raw) as UserProfile) : null;
    } catch {
      localStorage.removeItem(USER_KEY);
      return null;
    }
  }
}
