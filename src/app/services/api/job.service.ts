import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Job } from '../../types/models/job';
import { Job as JobRequest } from '../../types/request/job';
import { BaseApiResponse } from '../../types/api/baseApi';
import { PaginatedResponse } from '../../types/api/baseApi';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private readonly endpoint = `${environment.apiUrl}/jobs`;

  constructor(private http: HttpClient) {}

  getAllJobs(): Observable<PaginatedResponse<Job>> {
    return this.http.get<PaginatedResponse<Job>>(this.endpoint);
  }

  getJobById(id: string): Observable<BaseApiResponse<Job>> {
    return this.http.get<BaseApiResponse<Job>>(`${this.endpoint}/${id}`);
  }

  createJob(data: JobRequest): Observable<BaseApiResponse<Job>> {
    return this.http.post<BaseApiResponse<Job>>(`${this.endpoint}`, data);
  }

  updateJob(id: number, data: JobRequest): Observable<BaseApiResponse<Job>> {
    return this.http.put<BaseApiResponse<Job>>(`${this.endpoint}/${id}`, data);
  }

  deleteJob(id: number): Observable<BaseApiResponse<null>> {
    return this.http.delete<BaseApiResponse<null>>(
      `${environment.apiUrl}/jobs/${id}`
    );
  }
}
