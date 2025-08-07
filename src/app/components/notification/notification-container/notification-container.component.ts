import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification } from '../../../interfaces/model/notification';
import { NotificationService } from '../../../services/notification.service';
import { NotificationItemComponent } from '../notification-item/notification-item.component';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification-container',
  imports: [NotificationItemComponent, AsyncPipe, CommonModule],
  templateUrl: './notification-container.component.html',
  styleUrl: './notification-container.component.css',
})
export class NotificationContainerComponent implements OnInit {
  notifications$: Observable<Notification[]>;

  constructor(private notificationService: NotificationService) {
    this.notifications$ = this.notificationService.notifications$;
  }

  ngOnInit(): void {}

  removeNotification(id: number) {
    this.notificationService.removeNotification(id);
  }

  trackById(index: number, notification: Notification): number {
    return notification.id;
  }

  noop() {}
}
