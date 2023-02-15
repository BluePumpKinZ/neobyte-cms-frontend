import {Injectable} from '@angular/core';
import {AccountDetails} from "../models/Account";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "./message.service";
import {Site, SiteDetails} from "../models/Site";
import {catchError, Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SiteService {
  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  getAllSites(): Observable<Site[]> {
    return this.http.get<Site[]>('websites/all').pipe(
      tap(_ => this.messageService.add({type: 'success', title: 'Sites', description: 'Sites loaded'})),
      catchError(this.messageService.handleError<Site[]>('Fetch Sites', [])),
    )
  }

  getSite(): Observable<any> {
    return this.http.get<SiteDetails>('/sites/1').pipe(
      tap(res => this.messageService.add({type: 'success', title: 'Site', description: 'Site loaded'})),
    )
  }

  createSite(site: Site): Observable<any> {
    return this.http.post<Site>('websites/create', site).pipe(
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
