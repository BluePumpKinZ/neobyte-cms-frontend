import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {Account, AccountDetails} from "../../models/Account";
import {WebsiteService} from "../website.service";
import {AccountService} from "../account.service";

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<AccountDetails> {

  constructor(
    private _userService: AccountService,
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AccountDetails> {
    return this._userService.getOwnAccountDetails();
  }
}
