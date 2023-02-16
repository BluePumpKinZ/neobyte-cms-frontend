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
    return this.http.get<Account[]>('accounts/list/all').pipe(
      tap(_ => this.messageService.add({type: 'success', title: 'Accounts', description: 'Accounts loaded'})),
      catchError(this.messageService.handleError<Account[]>('Fetch Accounts', [])),
    )
  }

  getOwnAccountDetails(): Observable<any> {
    return this.http.get<AccountDetails>('accounts/me/details').pipe(
      tap(_ => this.messageService.add({type: 'success', title: 'Account', description: 'Account loaded'})),
      catchError(this.messageService.handleError<AccountDetails>('Fetch Account', {} as AccountDetails)),
    )
  }

  getAccountDetails(id: string): Observable<any> {
    return this.http.get<AccountDetails>(`accounts/list/${id}/details`).pipe(
      tap(_ => this.messageService.add({type: 'success', title: 'Account', description: 'Account loaded'})),
      catchError(this.messageService.handleError<AccountDetails>('Fetch Account', {} as AccountDetails)),
    )
  }

  changePassword(oldPassword:string,password: string): Observable<any> {
    return this.http.post('accounts/me/change-password', {"oldPassword":oldPassword,"newPassword":password,"confirmPassword":password}).pipe(
      tap(_ => this.messageService.add({type: 'success', title: 'Account', description: 'Password changed'})),
      catchError(this.messageService.handleError<AccountDetails>('Change Password', {} as AccountDetails)),
    )
  }

  addAccount(account: AccountDetails): Observable<any> {
    return this.http.post<AccountDetails>('accounts/list/create', account).pipe(
      tap(_ => this.messageService.add({type: 'success', title: 'Account', description: 'Account created'})),
      catchError(this.messageService.handleError<AccountDetails>('Create Account', account)),
    )
  }

  updateOwnAccountDetails(account: AccountDetails): Observable<any> {
    return this.http.put<Account>(`accounts/me/change-details`, {account}).pipe(
      tap(_ => this.messageService.add({type: 'success', title: 'Account', description: 'Account updated'})),
      catchError(this.messageService.handleError<Account>('Update Account', account)),
    )
  }

  updateAccountDetails(account: AccountDetails): Observable<any> {
    return this.http.put<Account>(`accounts/list/${account.id}/change-details`, {account}).pipe(
      tap(_ => this.messageService.add({type: 'success', title: 'Account', description: 'Account updated'})),
      catchError(this.messageService.handleError<Account>('Update Account', account)),
    )
  }

  deleteAccount(account: Account): Observable<any> {
    return this.http.delete<Account>(`accounts/list/${account.id}/delete`).pipe(
      tap(res => this.messageService.add({type: 'success', title: 'Account', description: 'Account deleted'})),
      catchError(this.messageService.handleError<Account>('Delete Account', account)),
    )
  }
}
