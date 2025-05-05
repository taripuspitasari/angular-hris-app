import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/security/auth.service';
import { NotificationComponent } from '../../../components/notification/notification.component';
import { NotificationService } from '../../../services/utils/notification.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, NotificationComponent, AsyncPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  protected notif = inject(NotificationService);

  loginForm: FormGroup;

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    if (this.loginForm.invalid) return;

    const data = this.loginForm.value;
    this.authService.loginUser(data).subscribe({
      next: (response) => {
        localStorage.setItem('ACCESS_TOKEN', response.data?.token || '');

        this.authService.setUser(response.data || null);
        this.notif.show('Welcome!', 'success');
        this.router.navigate(['dashboard']);
      },
      error: (err) => {
        this.notif.show(err.error.errors, 'error');
      },
    });
  }

  isInvalid(controlName: string) {
    const control = this.loginForm.get(controlName);
    return control?.invalid && (control.dirty || control.touched);
  }
}
