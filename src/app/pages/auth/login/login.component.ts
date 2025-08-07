import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { NotificationService } from '../../../services/notification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private notification = inject(NotificationService);
  showPassword: boolean = false;
  emailError: string = '';
  passwordError: string = '';

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  login() {
    this.authService.loginUser(this.loginForm.value).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.data?.token ?? '');
        this.notification.show(response.message, 'success', 3000);
        this.router.navigate(['dashboard']);
      },
      error: (err) => {
        this.emailError = '';
        this.passwordError = '';

        const validationErrors = err.error.errors;
        if (Array.isArray(validationErrors)) {
          validationErrors.forEach((errorItem: any) => {
            console.log(errorItem);
            if (errorItem.path?.[0] === 'email') {
              this.emailError = errorItem.message;
            }
            if (errorItem.path?.[0] === 'password') {
              this.passwordError = errorItem.message.split(':')[1].trim();
            }
          });
        }
        if (typeof validationErrors === 'string') {
          this.notification.show(validationErrors, 'error', 5000);
        }
      },
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
