import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Job } from '../../types/api/job';
import { JobRequest } from '../../types/request/job';
import { BaseApiResponse } from '../../types/api/baseApi';
import { PaginatedResponse } from '../../types/api/baseApi';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(private http: HttpClient) {}

  getAllJobs(): Observable<PaginatedResponse<Job>> {
    return this.http.get<PaginatedResponse<Job>>(`${environment.apiUrl}/jobs`);
  }

  getJobById(id: string): Observable<BaseApiResponse<Job>> {
    return this.http.get<BaseApiResponse<Job>>(
      `${environment.apiUrl}/jobs/${id}`
    );
  }

  createJob(data: JobRequest): Observable<BaseApiResponse<Job>> {
    return this.http.post<BaseApiResponse<Job>>(
      `${environment.apiUrl}/jobs`,
      data
    );
  }

  updateJob(id: string, data: JobRequest): Observable<BaseApiResponse<Job>> {
    return this.http.put<BaseApiResponse<Job>>(
      `${environment.apiUrl}/jobs/${id}`,
      data
    );
  }

  deleteJob(id: string) {
    return this.http.delete(`${environment.apiUrl}/jobs/${id}`);
  }
}
