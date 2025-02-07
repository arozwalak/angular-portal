import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";
import {AuthService} from "@app/shared/util-auth/auth.service";

export const isloggedinGuardFn: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
)=> {
  if (!inject(AuthService).currentUser()) {
    inject(Router).navigate(['/login']);
  }
  return true;
}
