export interface AuthResponse {
  data?: {
    id: string;
    name: string;
    email: string;
    role: 'APPLICANT' | 'ADMIN' | 'HR' | 'EMPLOYEE';
    token?: string;
  };
  message: string;
}

export interface ErrorResponse {
  errors: string;
}
