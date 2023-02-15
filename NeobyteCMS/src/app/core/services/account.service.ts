import { Injectable } from '@angular/core';
import {Account, AccountDetails} from "../models/Account";
import {catchError, Observable, shareReplay, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "./message.service";
import {Site} from "../models/Site";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  getAllAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>('accounts').pipe(
      tap(_ => this.messageService.add({type: 'success', title: 'Accounts', description: 'Accounts loaded'})),
      catchError(this.messageService.handleError<Account[]>('Fetch Accounts', [])),
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
    return this.http.put<Account>(`/api/v1/accounts/${account.id}`, {account}).pipe(
      tap(res => this.messageService.add({type: 'success', title: 'Account', description: 'Account updated'})),
    )
  }

  deleteAccount(account: Account): Observable<any> {
    return this.http.delete<Account>(`/api/v1/accounts/${account.id}`).pipe(
      tap(res => this.messageService.add({type: 'success', title: 'Account', description: 'Account deleted'})),
    )
  }
}
