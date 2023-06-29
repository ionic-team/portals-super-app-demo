export type User = {
  id: string;
  first_name: string;
  last_name: string;
  user_name: string;
  user_type: string;
  manager: string;
};

export type Customer = {
  id: number;
  created_at: string;
  salesperson: string;
  name: string;
};

export type PTORequest = {
  id: number;
  requested_at: string;
  requester: string;
  approver: string;
  start_date: string;
  end_date: string;
  type: string;
  approval_status: number;
};

export type Employee = {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  manager: string;
  role: string;
};

export type PTOApproval = {
  pto_request: PTORequest;
  employee: Employee;
};

export type TimeEntry = {
  id: number;
  created_at: string;
  contractor: string;
  customer: number;
  date: string;
  start_time: string;
  end_time: string;
  approval_status: number;
  approver: string;
};

export type TimesheetRequest = {
  time_entry: TimeEntry;
  customer: Customer;
};

export type TimesheetApproval = {
  time_entry: TimeEntry;
  customer: Customer;
  employee: Employee;
};
