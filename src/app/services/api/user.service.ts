import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { BaseApiResponse } from '../../types/api/baseApi';
import { User as UserInterface } from '../../types/api/user';
import { environment } from '../../../environments/environment';
import { handleError } from '../utils/errorHandler';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<UserInterface[]>([]);
  users$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  getUsers(): void {
    this.http
      .get<BaseApiResponse<UserInterface[]>>(`${environment.apiUrl}/users`)
      .pipe(catchError(handleError))
      .subscribe((response) => {
        this.userSubject.next(response.data || []);
      });
  }

  getUser(): Observable<BaseApiResponse<UserInterface>> {
    return this.http.get<BaseApiResponse<UserInterface>>(
      `${environment.apiUrl}/users/current`
    );
  }
}
