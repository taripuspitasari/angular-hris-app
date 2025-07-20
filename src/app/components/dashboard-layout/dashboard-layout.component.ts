import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard-layout',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css',
})
export class DashboardLayoutComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  logout() {
    this.authService.logoutUser().subscribe({
      next: (response) => {
        console.log(response.message);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err.error.errros);
      },
    });
  }
}
