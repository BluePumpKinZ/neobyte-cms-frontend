import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {Account} from "../../models/Account";
import {Site, SiteDetails} from "../../models/Site";
import {HttpClient} from "@angular/common/http";
import {SiteService} from "../site.service";

@Injectable({
  providedIn: 'root'
})
export class SiteResolver implements Resolve<SiteDetails> {
  constructor(
    private _siteService: SiteService,
  ) {}


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SiteDetails> {
    const siteId = route.params['siteId'];
    return this._siteService.getSite(siteId!);
  }
}
