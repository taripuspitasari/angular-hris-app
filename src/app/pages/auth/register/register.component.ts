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

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private notification = inject(NotificationService);

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
      this.notification.show('Passwords do not match.', 'error', 5000);
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
        this.notification.show(err.error.errors, 'error', 5000);
      },
    });
  }
}
