import {Injectable} from '@angular/core';
import {AccountDetails} from "../models/Account";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "./message.service";
import {Site, SiteDetails} from "../models/Site";
import {catchError, Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WebsiteService {
  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  getAllSites(): Observable<Site[]> {
    return this.http.get<Site[]>('websites/all').pipe(
      tap(_ => this.messageService.add({type: 'success', title: 'Sites', description: 'Sites loaded'})),
      catchError(this.messageService.handleError<Site[]>('Fetch Sites', [])),
    )
  }

  getSite(id: string): Observable<SiteDetails> {
    return this.http.get<SiteDetails>(`websites/${id}`).pipe(
      tap(_ => this.messageService.add({type: 'success', title: 'Site', description: 'Site loaded'})),
      catchError(this.messageService.handleError<SiteDetails>('Fetch Site', {} as SiteDetails)),
    )
  }

  createSite(site: Site): Observable<any> {
    return this.http.post<Site>('websites/create', site).pipe(
      tap(res => this.messageService.add({type: 'success', title: 'Site', description: 'Site created'})),
    )
  }

  updateSite(site: SiteDetails): Observable<any> {
    return this.http.put<Site>(`websites/edit`, site).pipe(
      tap(_ => this.messageService.add({type: 'success', title: 'Site', description: 'Site updated'})),
      catchError(this.messageService.handleError<Site>('Update Site', site)),
    )
  }

  deleteSite(site: Site): Observable<any> {
    return this.http.delete<Site>('/sites/1').pipe(
      tap(res => this.messageService.add({type: 'success', title: 'Site', description: 'Site deleted'})),
    )
  }
}
