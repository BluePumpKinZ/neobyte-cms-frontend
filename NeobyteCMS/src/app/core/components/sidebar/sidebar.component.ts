import {AfterViewInit, Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements AfterViewInit {

  userRole: string = '';

  constructor(public router: Router, private authService: AuthService) {

  }

  ngOnInit() {
    this.authService.userRole.subscribe(role => {
      console.log(role);
      this.userRole = role;
    })
  }

  ngAfterViewInit() {
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
      sidebarToggle.addEventListener('click', event => {
        event.preventDefault();
        document.body.querySelector('#content')!.classList.toggle('sb-sidenav-toggled');
      });
    }
  }
}
