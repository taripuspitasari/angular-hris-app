import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest, RegisterRequest } from '../../types/request/auth';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Auth } from '../../types/models/auth';
import { User } from '../../types/models/user';
import { BaseApiResponse } from '../../types/api/baseApi';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private userSubject = new BehaviorSubject<User | null>(null);
  // currentUser$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  registerUser(data: RegisterRequest): Observable<BaseApiResponse<Auth>> {
    return this.http.post<BaseApiResponse<Auth>>(
      `${environment.apiUrl}/users`,
      data
    );
  }

  loginUser(data: LoginRequest): Observable<BaseApiResponse<Auth>> {
    return this.http.post<BaseApiResponse<Auth>>(
      `${environment.apiUrl}/users/login`,
      data
    );
  }

  fetchCurrentUser(): Observable<BaseApiResponse<Auth>> {
    return this.http.get<BaseApiResponse<Auth>>(
      `${environment.apiUrl}/users/current`
    );
  }

  logoutUser(): Observable<BaseApiResponse<Auth>> {
    return this.http.delete<BaseApiResponse<Auth>>(
      `${environment.apiUrl}/users/current`
    );
  }

  // setUser(data: Auth | null): void {
  //   const user = data ? { ...data } : null;
  //   if (user) {
  //     delete user.token;
  //     localStorage.setItem('USER', JSON.stringify(user));
  //   }

  //   this.userSubject.next(user);
  // }

  setUser(data: Auth | null): void {
    if (data) {
      const user = { ...data };
      delete user.token;
      localStorage.setItem('USER', JSON.stringify(user));
    } else {
      localStorage.removeItem('USER');
    }
  }

  getUser(): User | null {
    const storedUser = localStorage.getItem('USER');
    if (!storedUser) return null;
    return JSON.parse(storedUser);
  }
}
