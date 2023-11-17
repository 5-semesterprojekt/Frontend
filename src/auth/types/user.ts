export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  orgId?: number[];
  token?: string;
}
