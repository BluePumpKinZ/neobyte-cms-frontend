import { Injectable } from '@angular/core';
import {Account, AccountDetails} from "../models/Account";
import {shareReplay, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private http: HttpClient) {
  }

  getAccountDetails() {
    return this.http.get<AccountDetails>('/api/v1/accounts/me/details')
  }
}
