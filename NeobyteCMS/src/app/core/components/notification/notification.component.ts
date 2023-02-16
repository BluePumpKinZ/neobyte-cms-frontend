import {Component, Input} from '@angular/core';

import { MessageService } from '../../services/message.service';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {

  constructor(public messageService: MessageService) {}

  // @Input() type: types | undefined;
  // @Input() title: string | undefined;
  // @Input() message: string | undefined;

}
