import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class LogoutGuard implements CanActivate {
  constructor(private authService : AuthService, private router: Router) {
  }

  canActivate(): UrlTree {
    this.authService.logout();
    return this.router.createUrlTree(['login']);
  }
}
