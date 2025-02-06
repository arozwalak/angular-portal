import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";

export const isloggedinGuardFn: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
)=> {
  const user = localStorage.getItem('user');

  if (!user) {
    inject(Router).navigate(['/login']);
  }
  return true;
}
