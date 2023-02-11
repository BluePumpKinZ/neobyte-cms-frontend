import { Injectable } from '@angular/core';
import {Account, AccountDetails} from "../models/Account";
import {Observable, shareReplay, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "./message.service";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  getAccounts(): Observable<any> {
    return this.http.get<AccountDetails>('/api/v1/accounts/me/details').pipe(
      tap(res => this.messageService.add({type: 'success', title: 'Accounts', description: 'Accounts loaded'})),
    )
  }

  getAccountDetails(): Observable<any> {
    return this.http.get<AccountDetails>('/api/v1/accounts/me/details').pipe(
      tap(res => this.messageService.add({type: 'success', title: 'Account', description: 'Account loaded'})),
    )
  }

  addAccount(account: Account): Observable<any> {
    return this.http.post<Account>('/api/v1/accounts', {account}).pipe(
      tap(res => this.messageService.add({type: 'success', title: 'Account', description: 'Account created'})),
    )
  }

  updateAccount(account: Account): Observable<any> {
    return this.http.put<Account>(`/api/v1/accounts/${account.accountId}`, {account}).pipe(
      tap(res => this.messageService.add({type: 'success', title: 'Account', description: 'Account updated'})),
    )
  }

  deleteAccount(account: Account): Observable<any> {
    return this.http.delete<Account>(`/api/v1/accounts/${account.accountId}`).pipe(
      tap(res => this.messageService.add({type: 'success', title: 'Account', description: 'Account deleted'})),
    )
  }
}
