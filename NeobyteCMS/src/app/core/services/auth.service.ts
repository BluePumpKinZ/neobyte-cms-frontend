import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Account, MUID} from "../models/Account";
import {catchError, map, Observable, of, shareReplay, tap} from "rxjs";
import * as moment from "moment";
import {MessageService} from "./message.service";

@Injectable()
export class AuthService {
  constructor(private http: HttpClient, private messageService: MessageService) {
  }
  login(email:string, password:string, rememberMe:boolean): Observable<any> {
    return this.http.post<MUID>('identity/authentication/login', {email, password, rememberMe}).pipe(
      tap(res => this.setSession(res)),
      catchError((error) => of({ error })),
      shareReplay()
    )
  }
  private setSession(authResult: MUID) {
    this.messageService.add({type: 'success', title: 'Login', description: 'Login successful'});
    const expiresAt = moment().add(authResult.expiresIn,'second');
    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
    return moment().isAfter(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    console.log(expiration);
    if (expiration) {
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
    }
    return null;
  }
}

export interface LoginState {
  muid: MUID;
  loading: boolean;
  error: string;
}
