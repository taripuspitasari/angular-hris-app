export interface User {
  id: string;
  name: string;
  email: string;
  role: 'APPLICANT' | 'ADMIN' | 'HR' | 'EMPLOYEE';
}
