import {AfterViewInit, Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements AfterViewInit {

  constructor(public router: Router) {

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

