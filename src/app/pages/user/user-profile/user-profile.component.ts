import { Component, effect, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { UpdateUser } from '../../../interfaces/model/user';

@Component({
  selector: 'app-user-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {
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
          console.log(response.message);
        },
        error: (err) => {
          console.log(err.error.errros);
        },
      });
  }

  updatePassword() {
    if (
      this.updatePasswordForm.value.newPassword !==
      this.updatePasswordForm.value.confirmNewPassword
    )
      return;

    this.authService
      .updateCurrentUser({
        password: this.updatePasswordForm.value.newPassword,
      } as UpdateUser)
      .subscribe({
        next: (response) => {
          console.log(response.message);
        },
        error: (err) => {
          console.log(err.error.errros);
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
          console.log(err.error.errors);
        },
      });
    });
  }
}
