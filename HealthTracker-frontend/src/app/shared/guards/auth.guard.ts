import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { catchError, map, of } from "rxjs";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn().pipe(map(isAuthenticated => {
    if (!isAuthenticated) {
      router.navigateByUrl("/login");
      return false;
    }

    return true;
  }), catchError(err => {
    router.navigateByUrl("/login");
    return of(false);
  }));
};
