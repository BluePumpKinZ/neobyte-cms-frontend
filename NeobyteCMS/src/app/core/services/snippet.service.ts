import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MessageService} from "./message.service";

@Injectable({
  providedIn: 'root'
})
export class SnippetService {

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getSnippets(): void {
    this.http.get('/api/v1/snippets').subscribe(res => {
      this.messageService.add({type: 'success', title: 'Snippets', description: 'Snippets loaded'});
    });
  }

  getSnippet(): void {
    this.http.get('/api/v1/snippets/1').subscribe(res => {
      this.messageService.add({type: 'success', title: 'Snippet', description: 'Snippet loaded'});
    });
  }

}
