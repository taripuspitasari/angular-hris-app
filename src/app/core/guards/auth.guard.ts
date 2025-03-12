import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const localUser = localStorage.getItem('ACCESS_TOKEN');

  if (localUser) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
