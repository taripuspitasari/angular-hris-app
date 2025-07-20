import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  login() {
    console.log(this.loginForm.value);
    this.authService.loginUser(this.loginForm.value).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.data?.token ?? '');
        this.router.navigate(['dashboard']);
      },
      error: (err) => {
        console.log(err.error.errors);
      },
    });
  }
}
