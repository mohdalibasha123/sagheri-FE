import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthStateService } from '../state/auth-state.service';
import { APP_ROUTES } from '../constants/app-routes';
import { ApiError } from '../models/api.model';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authState = inject(AuthStateService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const apiError: ApiError = {
        status: error.status,
        message: error.error?.message ?? 'An unexpected error occurred',
        errors: error.error?.errors,
        code: error.error?.code,
      };

      if (error.status === 401) {
        authState.clearUser();
        router.navigate([APP_ROUTES.LOGIN]);
      }

      if (error.status === 403) {
        router.navigate([APP_ROUTES.HOME]);
      }

      return throwError(() => apiError);
    }),
  );
};
