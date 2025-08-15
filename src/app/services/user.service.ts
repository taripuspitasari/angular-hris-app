import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, PaginatedApi } from '../interfaces/api/base-api';
import { User } from '../interfaces/model/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserById(id: number): Observable<BaseApi<User>> {
    return this.http.get<BaseApi<User>>(`${environment.apiUrl}/hr/users/${id}`);
  }

  getUsers(params?: any): Observable<PaginatedApi<User>> {
    return this.http.get<PaginatedApi<User>>(
      `${environment.apiUrl}/hr/users/`,
      { params }
    );
  }
}
