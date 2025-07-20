import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseApi } from '../interfaces/api/base-api';
import { CreateUser, UpdateUser, User } from '../interfaces/model/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  baseUrl = environment.apiUrl;

  registerUser(data: CreateUser): Observable<BaseApi<User>> {
    return this.http.post<BaseApi<User>>(`${this.baseUrl}/users`, data);
  }

  loginUser(data: any): Observable<BaseApi<User>> {
    return this.http.post<BaseApi<User>>(`${this.baseUrl}/users/login`, data);
  }
  getCurrentUser(): Observable<BaseApi<User>> {
    return this.http.get<BaseApi<User>>(`${this.baseUrl}/users/current`);
  }
  updateCurrentUser(data: UpdateUser): Observable<BaseApi<User>> {
    return this.http.patch<BaseApi<User>>(
      `${this.baseUrl}/users/current`,
      data
    );
  }
  logoutUser(): Observable<any> {
    return this.http.delete(`${this.baseUrl}/users/current`);
  }
}
