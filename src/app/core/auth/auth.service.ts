import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { ApiService } from '../services/api.service';
import { AuthStateService } from '../state/auth-state.service';
import { API_ENDPOINTS } from '../constants/api-endpoints';
import { APP_ROUTES } from '../constants/app-routes';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  UserProfile,
} from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly api = inject(ApiService);
  private readonly authState = inject(AuthStateService);
  private readonly router = inject(Router);

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.api.post<LoginResponse>(API_ENDPOINTS.auth.login, request).pipe(
      tap((res) => {
        this.authState.setUser(res.user, this.accessToken(res), res.refreshToken ?? '');
      }),
    );
  }

  register(request: RegisterRequest): Observable<LoginResponse> {
    return this.api.post<LoginResponse>(API_ENDPOINTS.auth.register, request).pipe(
      tap((res) => {
        this.authState.setUser(res.user, this.accessToken(res), res.refreshToken ?? '');
      }),
    );
  }

  logout(): void {
    this.authState.clearUser();
    this.router.navigate([APP_ROUTES.HOME]);
  }

  refreshToken(): Observable<{ accessToken: string }> {
    const refreshToken = this.authState.getRefreshToken();
    return this.api.post<{ accessToken: string }>(API_ENDPOINTS.auth.refresh, { refreshToken });
  }

  getCurrentUser(): Observable<UserProfile> {
    return this.api.get<UserProfile>(API_ENDPOINTS.auth.me).pipe(
      tap((user) => {
        const token = this.authState.getAccessToken() ?? '';
        const refresh = this.authState.getRefreshToken() ?? '';
        this.authState.setUser(user, token, refresh);
      }),
    );
  }

  forgotPassword(request: ForgotPasswordRequest): Observable<void> {
    return this.api.post<void>(API_ENDPOINTS.auth.forgotPassword, request);
  }

  resetPassword(request: ResetPasswordRequest): Observable<void> {
    return this.api.post<void>(API_ENDPOINTS.auth.resetPassword, request);
  }

  private accessToken(response: LoginResponse): string {
    return response.accessToken ?? response.token ?? '';
  }
}
