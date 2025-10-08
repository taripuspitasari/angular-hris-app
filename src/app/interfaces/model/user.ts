export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  is_active: boolean;
  token?: string;
}

export interface CreateUser {
  email: string;
  name: string;
  password: string;
}

export interface UpdateUser {
  email?: string;
  name?: string;
  password?: string;
}

export interface UpdateStatusUser {
  id: number;
  is_active: boolean;
}
