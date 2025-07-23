import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Notification } from '../interfaces/model/notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSubject = new Subject<Notification[]>();
  public notifications$: Observable<Notification[]> =
    this.notificationSubject.asObservable();

  private notifications: Notification[] = [];
  private nextId = 0;

  constructor() {}

  show(
    message: string,
    type: Notification['type'] = 'success',
    duration: number = 3000
  ) {
    const id = this.nextId++;
    const newNotification: Notification = { id, message, type, duration };
    this.notifications.push(newNotification);
    this.notificationSubject.next([...this.notifications]);

    if (duration > 0) {
      setTimeout(() => {
        this.removeNotification(id);
      }, duration);
    }
  }

  removeNotification(id: number) {
    this.notifications = this.notifications.filter((notif) => notif.id !== id);
    this.notificationSubject.next([...this.notifications]);
  }
}
