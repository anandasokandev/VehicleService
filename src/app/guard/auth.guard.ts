import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isLogin = localStorage.getItem('isLogin') === 'true';

  if (!isLogin) {
    alert('Login to continue');
    return router.parseUrl('/login');
  }

  return true;
};
