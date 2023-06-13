export interface SessionObj {
  user: User;
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  user_name: string;
  user_type: string;
  manager: string;
}

export interface Customer {
  id?: number;
  created_at: string;
  salesperson: string;
  name: string;
}

export interface PTORequest {
  id?: number;
  requested_at: string;
  requester: string;
  approver: string;
  start_date: string;
  end_date: string;
  type: string;
  approval_status: number;
}

export interface UserRequest {
  user: User;
  request: PTORequest;
}
