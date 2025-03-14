import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/security/auth.service';
import { User } from '../../types/models/user';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  user = signal<User | null>(null);
  role = computed(() => this.user()?.role);

  constructor() {
    this.authService.currentUser$.subscribe((user) => {
      this.user.set(user);
    });
  }

  onLogout() {
    this.authService.logoutUser().subscribe({
      next: (response) => {
        console.log(response.message);
        localStorage.removeItem('ACCESS_TOKEN');
        this.authService.setUser(null);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
