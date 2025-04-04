import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification',
  imports: [],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
export class NotificationComponent {
  @Input() message: string = '';
  @Input() type: 'success' | 'error' = 'success';
}
