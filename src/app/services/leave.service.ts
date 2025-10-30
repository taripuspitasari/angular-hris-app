import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CreateLeave, Leave } from '../interfaces/model/leave';
import { Observable } from 'rxjs';
import { BaseApi, PaginatedApi } from '../interfaces/api/base-api';

@Injectable({
  providedIn: 'root',
})
export class LeaveService {
  constructor(private http: HttpClient) {}
  baseUrl = `${environment.apiUrl}/leaves`;

  create(data: CreateLeave): Observable<BaseApi<Leave>> {
    return this.http.post<BaseApi<Leave>>(this.baseUrl, data);
  }

  getLeaves(params: any = {}): Observable<PaginatedApi<Leave>> {
    let httpParams = new HttpParams();
    if (params.status) httpParams = httpParams.set('status', params.status);
    if (params.type) httpParams = httpParams.set('type', params.type);

    return this.http.get<PaginatedApi<Leave>>(this.baseUrl, {
      params: httpParams,
    });
  }
}
