import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest, RegisterRequest } from '../../types/request/auth';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import { Auth } from '../../types/api/auth';
import { User } from '../../types/models/user';
import { handleError } from '../utils/errorHandler';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  registerUser(data: RegisterRequest): Observable<Auth> {
    return this.http
      .post<Auth>(`${environment.apiUrl}/users`, data)
      .pipe(catchError(handleError));
  }

  loginUser(data: LoginRequest): Observable<Auth> {
    return this.http
      .post<Auth>(`${environment.apiUrl}/users/login`, data)
      .pipe(catchError(handleError));
  }

  logoutUser(): Observable<Auth> {
    return this.http.delete<Auth>(`${environment.apiUrl}/users/current`);
  }

  setUser(user: User | null) {
    this.userSubject.next(user);
  }

  getUser(): Observable<User | null> {
    return of(this.userSubject.value);
  }
}
