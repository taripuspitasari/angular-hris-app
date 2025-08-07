import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { CreateUser } from '../../../interfaces/model/user';
import { NotificationService } from '../../../services/notification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private notification = inject(NotificationService);
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  nameError: string = '';
  emailError: string = '';
  passwordError: string = '';
  confirmPasswordError: string = '';

  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  });

  register() {
    if (
      this.registerForm.value.password !==
      this.registerForm.value.confirmPassword
    ) {
      this.confirmPasswordError = 'Passwords do not match.';
      return;
    }

    const data = { ...this.registerForm.value };
    delete data.confirmPassword;

    this.authService.registerUser(data as CreateUser).subscribe({
      next: (response) => {
        this.router.navigate(['/login']);
        this.notification.show(response.message, 'success', 3000);
      },
      error: (err) => {
        this.nameError = '';
        this.emailError = '';
        this.passwordError = '';
        this.confirmPasswordError = '';

        const validationErrors = err.error.errors;
        if (Array.isArray(validationErrors)) {
          validationErrors.forEach((errorItem: any) => {
            if (errorItem.path?.[0] === 'name') {
              this.nameError = errorItem.message.split(':')[1].trim();
            }
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

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
