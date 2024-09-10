import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authenticationGuard: CanActivateFn = (route, state):
  boolean | UrlTree => {
  const injector = inject(AuthService); // Replace 'AuthService' with the actual service name
  const router = inject(Router); // Replace 'AuthService' with the actual service name

  if (injector.isAuthenticated == true) {
    return true;
  } else {
    // You can also redirect to a login page or some other route if the user is not authenticated
    // For example, you can use the UrlTree to navigate to a different route
    // return this.router.parseUrl('/login');
    // Make sure to import the Router module and inject it into the guard if you decide to use the above approach
    // import { Router } from '@angular/router';

    // For now, returning false if not authenticated
    return router.parseUrl('/login');
  }
};
