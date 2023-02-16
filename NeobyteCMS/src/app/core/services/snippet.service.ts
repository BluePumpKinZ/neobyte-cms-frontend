import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MessageService} from "./message.service";
import {Snippet} from "../models/Snippet";
import {catchError, Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SnippetService {

  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  addSnippet(websiteId: string, snippet: Snippet): Observable<any> {
    return this.http.post(`websites/${websiteId}/snippets/add`, snippet).pipe(
      tap(_ => this.messageService.add({type: 'success', title: 'Snippet', description: 'Snippet created'})),
      catchError(this.messageService.handleError<Snippet>('Create Snippet', snippet)),
    );
  }

  updateSnippet(websiteId: string, snippet: Snippet): Observable<any> {
    return this.http.put(`websites/${websiteId}/snippets/${snippet.id}/edit`, snippet).pipe(
      tap(_ => this.messageService.add({type: 'success', title: 'Snippet', description: 'Snippet updated'})),
      catchError(this.messageService.handleError<Snippet>('Update Snippet', snippet)),
    );
  }

  deleteSnippet(websiteId: string, snippet: Snippet): Observable<any> {
    return this.http.delete(`websites/${websiteId}/snippets/${snippet.id}/delete`).pipe(
      tap(_ => this.messageService.add({type: 'success', title: 'Snippet', description: 'Snippet deleted'})),
      catchError(this.messageService.handleError<Snippet>('Delete Snippet', snippet)),
    );
  }

  getSnippets(websiteId: string): Observable<any> {
    return this.http.get(`websites/${websiteId}/snippets`).pipe(
      tap(_ => this.messageService.add({type: 'success', title: 'Snippets', description: 'Snippets loaded'})),
      catchError(this.messageService.handleError<Snippet[]>('Fetch Snippets', [])),
    )
  }

  getSnippet(websiteId: string, snippetId: string): Observable<any> {
    return this.http.get(`websites/${websiteId}/snippets/${snippetId}`).pipe(
      tap(_ => this.messageService.add({type: 'success', title: 'Snippet', description: 'Snippet loaded'})),
      catchError(this.messageService.handleError<Snippet>('Fetch Snippet', {} as Snippet)),
    )
  }

}
