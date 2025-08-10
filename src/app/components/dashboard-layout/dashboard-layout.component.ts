import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterModule],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css',
})
export class DashboardLayoutComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private notification = inject(NotificationService);

  logout() {
    this.authService.logoutUser().subscribe({
      next: (response) => {
        this.router.navigate(['/login']);
        this.notification.show(response.message, 'success', 3000);
      },
      error: (err) => {
        this.notification.show(err.error.errors, 'error', 5000);
      },
    });
  }
}
