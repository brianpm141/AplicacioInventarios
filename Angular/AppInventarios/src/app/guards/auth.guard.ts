import { Injectable } from '@angular/core'
import { CanActivateFn, router, urlTree } from '@angular/router';
import { AuthService } from '../services/auth/auth.service'

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn() ? true : router.createUrlTree(['/login']);

};
