import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
    let url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): true | UrlTree {
    console.log("Checking login: " + url)
    if (this.authService.isLoggedIn()) {
      if (url === '/login') {
        return this.router.parseUrl('/sites');
      }
      return true;
    } else {
      if (url === '/login') {
        return true;
      }
    }
    return this.router.parseUrl('/login');
  }
}
