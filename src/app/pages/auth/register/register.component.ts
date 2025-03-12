import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { passwordMismatchValidator } from '../../../core/directives/password-mismatch.directive';
import { AuthService } from '../../../services/security/auth.service';
import { RegisterRequest } from '../../../types/request/auth';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  registerForm: FormGroup;

  constructor() {
    this.registerForm = this.fb.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: passwordMismatchValidator }
    );
  }

  onRegister() {
    if (this.registerForm.invalid) return;

    const data = { ...this.registerForm.value };
    delete data.confirmPassword;
    this.authService.registerUser(data as RegisterRequest).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['login']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  isInvalid(controlName: string) {
    const control = this.registerForm.get(controlName);
    return control?.invalid && (control.dirty || control.touched);
  }
}
