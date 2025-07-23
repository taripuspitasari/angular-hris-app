import { Component, effect, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { UpdateUser } from '../../../interfaces/model/user';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-user-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {
  private notification = inject(NotificationService);

  updateProfileForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('', Validators.email),
  });

  updatePasswordForm = new FormGroup({
    newPassword: new FormControl('', [
      Validators.required,
      Validators.max(191),
      Validators.min(8),
    ]),
    confirmNewPassword: new FormControl('', [
      Validators.required,
      Validators.max(191),
      Validators.min(8),
    ]),
  });

  private authService = inject(AuthService);

  updateProfile() {
    this.authService
      .updateCurrentUser(this.updateProfileForm.value as UpdateUser)
      .subscribe({
        next: (response) => {
          this.notification.show(response.message, 'success', 3000);
        },
        error: (err) => {
          this.notification.show(err.error.errors, 'error', 5000);
        },
      });
  }

  updatePassword() {
    if (
      this.updatePasswordForm.value.newPassword !==
      this.updatePasswordForm.value.confirmNewPassword
    ) {
      this.notification.show('Passwords do not match.', 'error', 5000);
      return;
    }

    this.authService
      .updateCurrentUser({
        password: this.updatePasswordForm.value.newPassword,
      } as UpdateUser)
      .subscribe({
        next: (response) => {
          this.notification.show(response.message, 'success', 3000);
        },
        error: (err) => {
          this.notification.show(err.error.errors, 'error', 5000);
        },
      });
  }

  constructor() {
    effect(() => {
      this.authService.getCurrentUser().subscribe({
        next: (response) => {
          this.updateProfileForm.patchValue({
            name: response.data?.name,
            email: response.data?.email,
          });
        },
        error: (err) => {
          this.notification.show(err.error.errors, 'error', 5000);
        },
      });
    });
  }
}
