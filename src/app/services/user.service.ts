import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi, PaginatedApi } from '../interfaces/api/base-api';
import { UpdateStatusUser, User } from '../interfaces/model/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserById(id: number): Observable<BaseApi<User>> {
    return this.http.get<BaseApi<User>>(`${environment.apiUrl}/hr/users/${id}`);
  }

  getUsers(params: any = {}): Observable<PaginatedApi<User>> {
    let httpParams = new HttpParams();
    if (params.name) httpParams = httpParams.set('name', params.name);
    if (params.role) httpParams = httpParams.set('role', params.role);
    if (params.page) httpParams = httpParams.set('page', params.page);
    return this.http.get<PaginatedApi<User>>(
      `${environment.apiUrl}/hr/users/`,
      { params: httpParams }
    );
  }

  update(data: UpdateStatusUser): Observable<BaseApi<User>> {
    return this.http.put<BaseApi<User>>(
      `${environment.apiUrl}/hr/users/${data.id}`,
      data
    );
  }
}
