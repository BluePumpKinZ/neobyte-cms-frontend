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

  createEmptyPage(siteId: string, name:string, path: string ): Observable<any> {
    return this.http.post<Page>(`websites/${siteId}/pages/add/empty`, {"name":name,"path":path}).pipe(
      tap(_ => this.messageService.add({type: 'success', title: 'Page', description: 'Page created'})),
      catchError(this.messageService.handleError<string>('Fetch Page', "")),
    )
  }
  createPage(siteId: string, name:string, path: string ): Observable<any> {
    return this.http.post<Page>(`websites/${siteId}/pages/add/existing`, {"name":name,"path":path}).pipe(
      tap(_ => this.messageService.add({type: 'success', title: 'Page', description: 'Page created'})),
      catchError(this.messageService.handleError<string>('Fetch Page', "")),
    )
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

  updatePage(siteId:string, pageId: string, name:string, path: string): Observable<any> {
    return this.http.put<Page>(`websites/${siteId}/pages/${pageId}/edit`, {"name":name,"path":path}).pipe(
      tap(_ => this.messageService.add({type: 'success', title: 'Page', description: 'Page updated'})),
      catchError(this.messageService.handleError<string>('Fetch Page', "")),
    )
  }

  publishPage(siteId:string, pageId:string, innerHTML: string): Observable<any> {
    return this.http.put<Page>(`websites/${siteId}/pages/${pageId}/publish/render`, {source: innerHTML}).pipe(
      tap(_ => this.messageService.add({type: 'success', title: 'Page', description: 'Page updated'})),
      catchError(this.messageService.handleError<string>('Fetch Page', "")),
    )
  }


  updateSource(siteId: string, pageId: string, source: string): Observable<any> {
    return this.http.put<Page>(`websites/${siteId}/pages/${pageId}/publish/source`, {source: source}).pipe(
      tap(_ => this.messageService.add({type: 'success', title: 'Page', description: 'Page loaded'})),
      catchError(this.messageService.handleError<string>('Fetch Page', "")),
    )
  }

  deletePage(siteId: string, pageId: string): Observable<any> {
    return this.http.delete<Page>(`websites/${siteId}/pages/${pageId}/delete`).pipe(
      tap(_ => this.messageService.add({type: 'success', title: 'Page', description: 'Page deleted'})),
      catchError(this.messageService.handleError<string>('Fetch Page', "")),
    )
  }
}
