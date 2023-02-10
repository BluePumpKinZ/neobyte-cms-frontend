import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {

  @Input() type: types | undefined;
  @Input() title: string | undefined;
  @Input() message: string | undefined;

}

type types = 'success' | 'info' | 'warning' | 'danger';
