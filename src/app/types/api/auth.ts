import { BaseApiResponse } from './baseApi';

// export interface Auth {}

export interface Auth extends BaseApiResponse<Auth> {
  id: string;
  name: string;
  email: string;
  role: 'APPLICANT' | 'ADMIN' | 'HR' | 'EMPLOYEE';
  token?: string;
}
