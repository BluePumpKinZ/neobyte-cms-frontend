import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];

  add(message: Message) {
    this.messages.push(message);
    this.setTimeout(message, 3000);
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.add({type: 'danger', title: operation, description: error.message});
      return of(result as T);
    };
  }
  setTimeout(message: Message, timeout: number) {
    setTimeout(() => {
      this.messages = this.messages.filter(m => m !== message);
    }, timeout);
  }

}
export type Message = {
  type: 'success' | 'info' | 'warning' | 'danger',
  title: string,
  description: string
}
