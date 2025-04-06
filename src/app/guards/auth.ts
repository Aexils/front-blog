import { CanActivateFn, Router } from '@angular/router';
import { authStore } from '../stores/auth.store';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const isLoggedIn = authStore.isLoggedIn();

  if (!isLoggedIn) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
