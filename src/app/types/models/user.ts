export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public role: 'APPLICANT' | 'ADMIN' | 'HR' | 'EMPLOYEE',
    public token?: string
  ) {}
}
