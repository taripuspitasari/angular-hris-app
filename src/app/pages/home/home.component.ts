import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/security/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit() {
    if (this.authService.getUser()) {
      this.router.navigate(['dashboard']);
    }
  }
}
