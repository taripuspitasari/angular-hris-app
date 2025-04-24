import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/security/auth.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { User } from '../../types/models/user';

@Component({
  selector: 'app-default-layout',
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.css',
})
export class DefaultLayoutComponent {
  private authService = inject(AuthService);

  user = signal<User | null>(null);

  ngOnInit() {
    this.authService.currentUser$.subscribe((user) => {
      this.user.set(user);
    });
  }

  onLogout() {
    this.authService.logoutUser().subscribe({
      next: (response) => {
        localStorage.removeItem('ACCESS_TOKEN');
        console.log(response);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
