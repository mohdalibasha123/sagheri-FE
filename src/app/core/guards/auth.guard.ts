import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStateService } from '../state/auth-state.service';
import { APP_ROUTES } from '../constants/app-routes';

export const authGuard: CanActivateFn = () => {
  const authState = inject(AuthStateService);
  const router = inject(Router);

  if (authState.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree([APP_ROUTES.LOGIN]);
};

export const guestGuard: CanActivateFn = () => {
  const authState = inject(AuthStateService);
  const router = inject(Router);

  if (!authState.isAuthenticated()) {
    return true;
  }

  return router.createUrlTree([APP_ROUTES.USER_DASHBOARD]);
};

export const adminGuard: CanActivateFn = () => {
  const authState = inject(AuthStateService);
  const router = inject(Router);

  if (authState.isAdmin()) {
    return true;
  }

  if (!authState.isAuthenticated()) {
    return router.createUrlTree([APP_ROUTES.LOGIN]);
  }

  return router.createUrlTree([APP_ROUTES.HOME]);
};
