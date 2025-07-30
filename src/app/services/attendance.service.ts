import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { BaseApi, PaginatedApi } from '../interfaces/api/base-api';
import { Attendance } from '../interfaces/model/attendance';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  constructor(private http: HttpClient) {}
  baseUrl = `${environment.apiUrl}/attendance`;

  getAttendance(): Observable<BaseApi<Attendance>> {
    return this.http.get<BaseApi<Attendance>>(this.baseUrl);
  }

  checkIn(): Observable<BaseApi<Attendance>> {
    return this.http.post<BaseApi<Attendance>>(`${this.baseUrl}/check-in`, {});
  }

  checkOut(): Observable<BaseApi<Attendance>> {
    return this.http.post<BaseApi<Attendance>>(`${this.baseUrl}/check-out`, {});
  }

  getAttendanceHistory(): Observable<PaginatedApi<Attendance>> {
    return this.http.get<PaginatedApi<Attendance>>(`${this.baseUrl}/history`);
  }
}
