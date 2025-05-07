import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/security/auth.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { User } from '../../types/models/user';
import { NotificationService } from '../../services/utils/notification.service';
import { NotificationComponent } from '../notification/notification.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-default-layout',
  imports: [RouterOutlet, SidebarComponent, NotificationComponent, AsyncPipe],
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.css',
})
export class DefaultLayoutComponent {
  private authService = inject(AuthService);
  protected notif = inject(NotificationService);

  user = signal<User | null>(null);

  ngOnInit() {
    this.user.set(this.authService.getUser());
  }

  onLogout() {
    this.authService.logoutUser().subscribe({
      next: (response) => {
        localStorage.removeItem('ACCESS_TOKEN');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
