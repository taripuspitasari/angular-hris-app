import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { BaseApi, PaginatedApi } from '../interfaces/api/base-api';
import {
  CreateDepartment,
  Department,
  UpdateDepartment,
} from '../interfaces/model/department';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  constructor(private http: HttpClient) {}

  getById(id: number): Observable<BaseApi<Department>> {
    return this.http.get<BaseApi<Department>>(
      `${environment.apiUrl}/departments/${id}`
    );
  }

  getDepartments(params: any = {}): Observable<PaginatedApi<Department>> {
    let httpParams = new HttpParams();
    if (params.name) httpParams = httpParams.set('name', params.name);
    if (params.page) httpParams = httpParams.set('page', params.page);
    return this.http.get<PaginatedApi<Department>>(
      `${environment.apiUrl}/departments/`,
      { params: httpParams }
    );
  }

  create(data: CreateDepartment): Observable<BaseApi<Department>> {
    return this.http.post<BaseApi<Department>>(
      `${environment.apiUrl}/hr/departments`,
      data
    );
  }

  delete(id: number): Observable<BaseApi<Department>> {
    return this.http.delete<BaseApi<Department>>(
      `${environment.apiUrl}/hr/departments/${id}`
    );
  }

  update(data: UpdateDepartment): Observable<BaseApi<Department>> {
    return this.http.put<BaseApi<Department>>(
      `${environment.apiUrl}/hr/departments/${data.id}`,
      data
    );
  }
}
