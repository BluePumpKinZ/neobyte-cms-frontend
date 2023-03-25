import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Account, MUID} from "../models/Account";
import {BehaviorSubject, catchError, map, Observable, of, shareReplay, tap} from "rxjs";
import * as moment from "moment";
import {MessageService} from "./message.service";

@Injectable()
export class AuthService {
  // private currentUserSubject: BehaviorSubject<MUID>;
  // public currentUser: Observable<MUID>;
  constructor(private http: HttpClient, private messageService: MessageService) {
    // this.currentUserSubject = new BehaviorSubject<MUID>(JSON.parse(localStorage.getItem('currentUser')!));
    // this.currentUser = this.currentUserSubject.asObservable();
  }

  login(email: string, password: string, rememberMe: boolean): Observable<any> {
    return this.http.post<MUID>('identity/authentication/login', {email, password, rememberMe}).pipe(
      map(res => {
        this.messageService.add({type: 'success', title: 'Login', description: 'Login successful'});
        const expiresAt = moment().add(res.expiresIn, 'second');
        localStorage.setItem('id_token', res.token);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
      }),
      catchError(this.messageService.handleError<MUID>('Login', {} as MUID)),
    )
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
    if (!this.getExpiration()) {
      return false;
    }
    if (localStorage.getItem("expires_at"))
      return true;
    if (this.getExpiration() && moment().isBefore(this.getExpiration())) {
      this.logout()
      return moment().isBefore(this.getExpiration());
    }
    return false;
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    if (expiration) {
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
    }
    return null;
  }

  hasAnyAuthority(authorities: any) {
    if (!this.isLoggedIn()) {
      return false;
    }
    return authorities.includes(this.getRole().toUpperCase());
  }

  private getRole() {
    const token = localStorage.getItem('id_token');
    if (!token) {
      return null;
    }
    const decoded = this.decodeToken(token);
    return decoded.role;
  }

  private decodeToken(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    console.log(JSON.parse(window.atob(base64)));
    return JSON.parse(window.atob(base64));
  }
}

export interface LoginState {
  muid: MUID;
  loading: boolean;
  error: string;
}
