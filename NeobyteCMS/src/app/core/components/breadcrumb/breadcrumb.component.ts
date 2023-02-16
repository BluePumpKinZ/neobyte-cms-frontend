import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, NavigationEnd, Event } from "@angular/router";
import {distinctUntilChanged, filter, Observable} from "rxjs";
import {BreadcrumbService} from "../../services/breadcrumb.service";

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent {

  breadcrumbs$: Observable<Breadcrumb[]>;

  constructor(private breadcrumbService: BreadcrumbService) {
    this.breadcrumbs$ = breadcrumbService.breadcrumbs$;
  }

}
export interface Breadcrumb {
  label: string;
  url: string;
}
