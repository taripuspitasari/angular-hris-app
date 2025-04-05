import { Component, inject } from '@angular/core';
import { NotificationComponent } from '../../components/notification/notification.component';
import { NotificationService } from '../../services/utils/notification.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [NotificationComponent, AsyncPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  protected notif = inject(NotificationService);
}
