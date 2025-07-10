import { inject } from '@angular/core';
import { CanActivateChildFn, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from './auth.service';

export const AuthGuard: 
CanActivateChildFn = (): Observable<boolean | UrlTree> => {
  const authService = inject(AuthService);
  const router = inject(Router);
    
  return authService.checkAuthStatus().pipe(
    map(isAuthenticated => {
        
      if (isAuthenticated) {
        return true;
      } else {
        return router.createUrlTree(['/login']);
      }
    }),
    catchError(() => 
        of(router.createUrlTree(['/login']))
    )
  );
}