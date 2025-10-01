import { Department } from './department';
import { User } from './user';

export interface Employee {
  id: number;
  position: string;
  join_date: string;
  status: string;
  user: Omit<User, 'token'>;
  department: Department;
}

export interface CreateEmployee {
  position: string;
  join_date: string;
  status: string;
  user_id: number;
  department_id: number;
}

export interface UpdateEmployee {
  id: number;
  position?: string;
  join_date?: string;
  status?: string;
  department_id?: number;
}
