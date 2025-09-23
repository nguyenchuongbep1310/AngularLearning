import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const loggedIn = true;
  if (!loggedIn) {
    alert('You must login first!');
    router.navigateByUrl('/');
    return false;
  }
  return true;
};
