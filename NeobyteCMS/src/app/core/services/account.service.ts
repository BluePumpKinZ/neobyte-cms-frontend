import {Injectable} from '@angular/core';
import {Account, AccountDetails, AccountDetailsRoles} from "../models/Account";
import {catchError, Observable, of, shareReplay, tap, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "./message.service";
import {Site} from "../models/Site";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  addAccountWithPassword(account: AccountDetails, password: string): Observable<any> {
    return this.http.post<AccountDetails>('accounts/list/create/with-password', {...account, password: password}).pipe(
      tap(_ => this.messageService.add({type: 'success', title: 'Account', description: 'Account created'})),
      catchError(this.messageService.handleError<AccountDetails>('Create Account', account)),
    )
  }

  addAccount(account: AccountDetails): Observable<any> {
    return this.http.post<AccountDetails>('accounts/list/create', account).pipe(
      tap(_ => this.messageService.add({type: 'success', title: 'Account', description: 'Account created'})),
      catchError(this.messageService.handleError<AccountDetails>('Create Account', account)),
    )
  }

  addWebsiteToAccount(accountId: string, siteId: string): Observable<any> {
    return this.http.post<AccountDetails>(`websites/${siteId}/users/${accountId}/add`, {}).pipe(
      tap(_ => this.messageService.add({type: 'success', title: 'Account', description: 'Website added to account'})),
      catchError(this.messageService.handleError<AccountDetails>('Add Website to Account', {} as AccountDetails)),
    )
  }

  getAllAvailableWebsitesForAccount(accountId: string): Observable<Site[]> {
    return this.http.get<Site[]>(`accounts/list/${accountId}/unassigned-websites`).pipe(
      catchError(this.messageService.handleError<Site[]>('Fetch Websites', [])),
    )
  }



  getAllAccounts(): Observable<AccountDetails[]> {
    return this.http.get<AccountDetails[]>('accounts/list/all').pipe(
      tap(_ => this.messageService.add({type: 'success', title: 'Accounts', description: 'Accounts loaded'})),
      catchError(this.messageService.handleError<AccountDetails[]>('Fetch Accounts', [])),
    )
  }

  getOwnAccountDetails(): Observable<any> {
    return this.http.get<AccountDetailsRoles>('accounts/me/details').pipe(
      tap(_ => this.messageService.add({type: 'success', title: 'Account', description: 'Account loaded'})),
      catchError(this.messageService.handleError<AccountDetailsRoles>('Fetch Account', {} as AccountDetailsRoles)),
    )
  }

  getAccountDetails(id: string): Observable<any> {
    return this.http.get<AccountDetailsRoles>(`accounts/list/${id}/details`).pipe(
      tap(_ => this.messageService.add({type: 'success', title: 'Account', description: 'Account loaded'})),
      catchError(this.messageService.handleError<AccountDetailsRoles>('Fetch Account', {} as AccountDetailsRoles)),
    )
  }

  updateAccountDetails(account: AccountDetailsRoles): Observable<any> {
    return this.http.put<AccountDetailsRoles>(`accounts/list/${account.id}/edit`, {account}).pipe(
      tap(_ => this.messageService.add({type: 'success', title: 'Account', description: 'Account updated'})),
      catchError(this.messageService.handleError<Account>('Update Account', account)),
    )
  }


  changePassword(oldPassword: string, password: string): Observable<any> {
    return this.http.put<any>('accounts/me/change-password', {
      "oldPassword": oldPassword,
      "newPassword": password,
      "confirmPassword": password
    }).pipe(
      tap(_ => this.messageService.add({type: 'success', title: 'Account', description: 'Password changed'})),
      catchError(this.messageService.handleError<AccountDetails>('Change Password', {} as AccountDetails)),
    )
  }

  updateOwnAccountDetails(account: AccountDetails): Observable<any> {
    return this.http.put<any>(`accounts/me/change-details`, {email: account.email, username: account.username, bio: account.bio}).pipe(
      tap(_ => this.messageService.add({type: 'success', title: 'Account', description: 'Account updated'})),
      catchError(this.messageService.handleError<any>('Update Account', account)),
    )
  }

  deleteAccount(account: Account): Observable<any> {
    return this.http.delete<Account>(`accounts/list/${account.id}/delete`).pipe(
      tap(res => this.messageService.add({type: 'success', title: 'Account', description: 'Account deleted'})),
      catchError(this.messageService.handleError<Account>('Delete Account', account)),
    )
  }

  requestPasswordReset(email: string): Observable<any> {
    return this.http.post('accounts/me/request-password-reset', {email: email}).pipe(
      tap(_ => this.messageService.add({type: 'success', title: 'Password', description: 'Password reset request sent'})),
      catchError(this.messageService.handleError<Account>('Request Password Reset', {} as Account)),
    )
  }

  setPassword(token: string, email: string, password: string, confirmPassword: string): Observable<any> {
    return this.http.put<any>('accounts/me/public/reset-password', {email, token, password, confirmPassword}).pipe(
      tap(_ => this.messageService.add({type: 'success', title: 'Password', description: 'Password set'})),
      catchError(err => {
        for (let error of err.errors) {
          this.messageService.add({type: 'danger', title: 'Password', description: error.message});
        }
        return throwError(err);
      })
    )


    //   .subscribe(
    //   res => {
    //     this.messageService.add({type: 'success', title: 'Password', description: 'Password set'});
    //     return of(res);
    //   },
    //   error => {
    //     this.messageService.add({type: 'danger', title: 'Password', description: 'Password not set'});
    //     return throwError(error);
    //   }
    // );
    //throw errors to be handled by the component


    //   .pipe(
    //   tap(_ => this.messageService.add({type: 'success', title: 'Password', description: 'Password set'})),
    //   catchError(this.messageService.handleError('Set Password', [])),
    // )
  }
}
