import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationContainerComponent } from './components/notification/notification-container/notification-container.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NotificationContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-hris-app';
}
