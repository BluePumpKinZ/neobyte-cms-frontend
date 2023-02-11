import {Injectable} from '@angular/core';
import {AccountDetails} from "../models/Account";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "./message.service";
import {Site, SiteDetails} from "../models/Site";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SiteService {
  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  getAllSites(): Observable<any> {
    return this.http.get<Site[]>('/sites').pipe(
      tap(res => this.messageService.add({type: 'success', title: 'Sites', description: 'Sites loaded'})),
    )
  }

  getSite(): Observable<any> {
    return this.http.get<SiteDetails>('/sites/1').pipe(
      tap(res => this.messageService.add({type: 'success', title: 'Site', description: 'Site loaded'})),
    )
  }

  createSite(site: Site): Observable<any> {
    return this.http.post<Site>('/sites', {site}).pipe(
      tap(res => this.messageService.add({type: 'success', title: 'Site', description: 'Site created'})),
    )
  }

  updateSite(site: Site): Observable<any> {
    return this.http.put<Site>('/sites/1', {site}).pipe(
      tap(res => this.messageService.add({type: 'success', title: 'Site', description: 'Site updated'})),
    )
  }

  deleteSite(site: Site): Observable<any> {
    return this.http.delete<Site>('/sites/1').pipe(
      tap(res => this.messageService.add({type: 'success', title: 'Site', description: 'Site deleted'})),
    )
  }
}
