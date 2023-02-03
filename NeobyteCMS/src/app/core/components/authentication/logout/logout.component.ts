import {Component, Directive, OnInit} from '@angular/core';
import {AuthService} from "../../../services/AuthService";
import {Router} from "@angular/router";

@Directive({
  selector: 'app-logout',
})
export class LogoutComponent implements OnInit {
  constructor(private authService : AuthService, private router: Router) { }
  ngOnInit() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
