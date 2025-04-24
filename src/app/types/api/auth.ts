export interface Auth {
  id: string;
  name: string;
  email: string;
  role: 'APPLICANT' | 'ADMIN' | 'HR' | 'EMPLOYEE';
  token?: string;
}
