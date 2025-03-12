import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest, RegisterRequest } from '../../types/request/auth';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { AuthResponse } from '../../types/api/auth';
import { User } from '../../types/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  registerUser(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/users`, data);
  }

  loginUser(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${environment.apiUrl}/users/login`,
      data
    );
  }

  logoutUser(): Observable<AuthResponse> {
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (!token) {
      console.warn('Token is missing! User might be already logged out.');
      return throwError(() => new Error('Token is missing'));
    }

    return this.http.delete<AuthResponse>(
      `${environment.apiUrl}/users/current`,
      {
        headers: { 'X-API-TOKEN': token },
      }
    );
  }

  setUser(user: User | null) {
    this.userSubject.next(user);
  }

  getUser(): Observable<User | null> {
    return of(this.userSubject.value);
  }
}
