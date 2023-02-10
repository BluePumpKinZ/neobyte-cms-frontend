import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Account} from "../models/Account";
import {shareReplay, tap} from "rxjs";
import * as moment from "moment";

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {
  }
  login(email:string, password:string, rememberMe:boolean) {
    return this.http.post<Account>('identity/authentication/login', {email, password, rememberMe}).pipe(
      tap(res => this.setSession(res)),
      shareReplay()
    )
  }
  private setSession(authResult: Account) {
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
