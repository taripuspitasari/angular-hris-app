import { Component, computed, inject, signal } from '@angular/core';
import { AuthService } from '../../services/security/auth.service';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../types/models/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  user = signal<User | null>(null);
  role = computed(() => this.user()?.role);

  constructor() {}

  ngOnInit() {
    this.authService.currentUser$.subscribe((user) => {
      this.user.set(user);
      console.log('dari sidebar', user);
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
