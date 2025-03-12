import { Component, inject } from '@angular/core';

import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/security/auth.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-default-layout',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.css',
})
export class DefaultLayoutComponent {
  private authService = inject(AuthService);

  onLogout() {
    this.authService.logoutUser().subscribe({
      next: (response) => {
        console.log(response.message);
        localStorage.removeItem('ACCESS_TOKEN');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
