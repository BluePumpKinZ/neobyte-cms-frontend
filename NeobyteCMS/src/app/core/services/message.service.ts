import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];

  add(message: Message) {
    this.messages.push(message);
  }
}
export type Message = {
  type: 'success' | 'info' | 'warning' | 'danger',
  title: string,
  description: string
}
