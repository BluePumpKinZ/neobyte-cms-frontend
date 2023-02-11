import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MessageService} from "./message.service";
import {Observable, tap} from "rxjs";
import {Page} from "../models/Page";

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  getPages(): Observable<any> {
    return this.http.get<Page[]>('/pages').pipe(
      tap(res => this.messageService.add({type: 'success', title: 'Pages', description: 'Pages loaded'})),
    )
  }

  getPage(): Observable<any> {
    return this.http.get<Page>('/pages/1').pipe(
      tap(res => this.messageService.add({type: 'success', title: 'Page', description: 'Page loaded'})),
    )
  }
}
