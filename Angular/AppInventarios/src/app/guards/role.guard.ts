import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

export const roleGuard = (rolesPermitidos: number[]): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const user = authService.getUser();

    return user && rolesPermitidos.includes(user.role)
      ? true
      : router.createUrlTree(['/unauthorized']);
  };
};
