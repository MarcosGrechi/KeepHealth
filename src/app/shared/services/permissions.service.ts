import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChildFn, Router } from '@angular/router';

export const DietDetailGuard: CanActivateChildFn = (childRoute: ActivatedRouteSnapshot, state) => {

  const router = inject(Router);
  const id = childRoute.params['id'];
  const isLogged = !!localStorage.getItem('loggedUser');

  if (!isLogged) {
    router.navigate(['/login']);
    return false;
  }

  if (isNaN(parseInt(id, 10))) {
    return router.createUrlTree(['/diet']);
  }
  
  return true;
};