import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {state} from "@angular/animations";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private _router: Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const authorities = route.data['authorities'];

    //check if user is logged in

    if (this.authService.isLoggedIn()) {
      // authorised so check if user role is inside list of authorities
      if (authorities && authorities.length > 0) {
        if (this.authService.hasAnyAuthority(authorities)) {
          return true;
        }
      }
    }

    // not logged in so redirect to login page with the return url
    this._router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
