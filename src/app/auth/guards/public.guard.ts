import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

import { AuthService } from '../services/auth.service';


// to call checkAuthStatus and populate _currentUser in public routes
export const publicGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);

  authService.checkAuthStatus().subscribe();

  return true;
};
