import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MessageService} from "./message.service";
import {catchError, Observable, tap} from "rxjs";
import {Page} from "../models/Page";

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  getPages(id: string): Observable<any> {
    return this.http.get<Page[]>(`websites/${id}/pages`).pipe(
      tap(_ => this.messageService.add({type: 'success', title: 'Pages', description: 'Pages loaded'})),
      catchError(this.messageService.handleError<Page[]>('Fetch Pages', [])),
    )
  }

  getSource(pageId: string, siteId: string): Observable<any> {
    return this.http.get<Page>(`websites/${siteId}/pages/${pageId}/source`).pipe(
      tap(res => this.messageService.add({type: 'success', title: 'Page', description: 'Page loaded'})),
      catchError(this.messageService.handleError<string>('Fetch Page', "")),
    )
  }

  publishSource(siteId: string, pageId: string, source: string): Observable<any> {
    return this.http.put<Page>(`websites/${siteId}/pages/${pageId}/publish/source`, {source: source}).pipe(
      tap(_ => this.messageService.add({type: 'success', title: 'Page', description: 'Page loaded'})),
      catchError(this.messageService.handleError<string>('Fetch Page', "")),
    )
  }

  getPage(): Observable<any> {
    return this.http.get<Page>('/pages/1').pipe(
      tap(res => this.messageService.add({type: 'success', title: 'Page', description: 'Page loaded'})),
    )
  }
}
