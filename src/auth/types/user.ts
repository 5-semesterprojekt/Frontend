export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  token?: string;
}

export interface UserUpdate {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}
