import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Account} from "../models/Account";
import {shareReplay, tap} from "rxjs";
import * as moment from "moment";

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {
  }
  login(email:string, password:string ) {
    return this.http.post<Account>('/api/login', {email, password}).pipe(
      tap(res => this.setSession(res)),
      shareReplay()
    )
  }
  private setSession(authResult: Account) {
    const expiresAt = moment().add(authResult.expiresIn,'second');
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
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


}
