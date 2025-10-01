import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { BaseApi, PaginatedApi } from '../interfaces/api/base-api';
import {
  CreateEmployee,
  Employee,
  UpdateEmployee,
} from '../interfaces/model/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}
  baseUrl = `${environment.apiUrl}/hr/employees`;

  getById(id: number): Observable<BaseApi<Employee>> {
    return this.http.get<BaseApi<Employee>>(`${this.baseUrl}/${id}`);
  }

  getEmployees(params?: any): Observable<PaginatedApi<Employee>> {
    return this.http.get<PaginatedApi<Employee>>(this.baseUrl, { params });
  }

  create(data: CreateEmployee): Observable<BaseApi<Employee>> {
    return this.http.post<BaseApi<Employee>>(this.baseUrl, data);
  }

  update(data: UpdateEmployee): Observable<BaseApi<Employee>> {
    return this.http.put<BaseApi<Employee>>(`${this.baseUrl}/${data.id}`, data);
  }
}
