import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/security/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/utils/notification.service';
import { User } from '../../types/models/user';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  public showSidebar = true;
  protected notif = inject(NotificationService);

  user = signal<User | null>(null);

  constructor() {}

  ngOnInit() {
    this.user.set(this.authService.getUser());
  }

  openSidebar() {
    this.showSidebar = true;
  }

  closeSidebar() {
    this.showSidebar = false;
  }

  onLogout() {
    this.authService.logoutUser().subscribe({
      next: (response) => {
        this.notif.show(response.message, 'success');
        localStorage.removeItem('ACCESS_TOKEN');
        localStorage.removeItem('USER');
        this.authService.setUser(null);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.notif.show(err.error.errors, 'error');
      },
    });
  }
}
