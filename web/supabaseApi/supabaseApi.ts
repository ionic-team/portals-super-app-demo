import { createClient } from "@supabase/supabase-js";
import { PTOApproval, TimesheetApproval, TimesheetRequest } from "./types";

export type { Session } from "@supabase/supabase-js";

const supabaseUrl = "http://localhost:54321";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0";
const serviceKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU";
export const supabase = createClient(supabaseUrl, serviceKey!);

export const getCustomersByEmployee = async (employeeId: string) => {
  let { data, error } = await supabase.rpc("get_customers_by_employee", {
    employee_id: employeeId,
  });

  if (error) console.error(error);
  else return data;
};

export const createCustomer = async (
  customerName: string,
  requesterId: string
) => {
  let { data, error } = await supabase.rpc("insert_customer", {
    customer_name: customerName,
    requester_id: requesterId,
  });
  if (error) console.error(error);
  return data;
};

export const getPTORequests = async (requesterId: string) => {
  let { data, error } = await supabase.rpc("get_pto_requests", {
    requester_id: requesterId,
  });
  if (error) console.error(error);
  else return data;
};

export const createPTORequest = async (
  requester_id: string,
  request_start_date: string,
  request_end_date: string,
  request_type: string
) => {
  let { data, error } = await supabase.rpc("insert_pto_request", {
    request_end_date,
    request_start_date,
    request_type,
    requester_id,
  });

  if (error) console.error(error);
  else return data;
};

export const approvePTO = async (ptoId: number) => {
  let { data, error } = await supabase.rpc("approve_pto", {
    pto_id: ptoId,
  });

  if (error) console.error(error);
  else return data;
};

export const rejectPTO = async (ptoId: number) => {
  let { data, error } = await supabase.rpc("reject_pto", {
    pto_id: ptoId,
  });

  if (error) console.error(error);
  else console.log(data);
};

export const getEmployee = async (employeeId: string) => {
  let { data, error } = await supabase.rpc("get_employee", {
    employee_id: employeeId,
  });

  if (error) console.error(error);
  else return data;
};

export const getPendingPTOApprovals = async (managerId: string) => {
  let { data, error } = await supabase.rpc(
    "get_pending_pto_approvals_with_data",
    {
      manager_id: managerId,
    }
  );
  if (error) console.error(error);
  else return data as PTOApproval[];
};

export const getTimesheetRequests = async (contractorId: string) => {
  let { data, error } = await supabase.rpc("get_timesheet_requests_with_data", {
    contractor_id: contractorId,
  });
  if (error) console.error(error);
  else return data as TimesheetRequest[];
};

export const approveTimesheetRequest = async (timesheetId: number) => {
  let { data, error } = await supabase.rpc("approve_timesheet", {
    timesheet_id: timesheetId,
  });

  if (error) console.error(error);
  else return data;
};

export const rejectTimesheetRequest = async (timesheetId: number) => {
  let { data, error } = await supabase.rpc("reject_timesheet", {
    timesheet_id: timesheetId,
  });

  if (error) console.error(error);
  else return data;
};

export const createTimesheetRequests = async (
  customerId: number,
  requesterId: string,
  timesheetDate: string,
  timesheetStartTime: string,
  timesheetEndTime: string
) => {
  let { data, error } = await supabase.rpc("insert_timesheet_request", {
    customer_id: customerId,
    requester_id: requesterId,
    timesheet_date: timesheetDate,
    timesheet_end_time: timesheetEndTime,
    timesheet_start_time: timesheetStartTime,
  });

  if (error) console.error(error);
  else return data;
};

export const getCustomers = async () => {
  let { data, error } = await supabase.rpc("get_customers");

  if (error) console.error(error);
  else return data;
};

export const getPendingTimesheetApprovals = async (managerId: string) => {
  let { data, error } = await supabase.rpc(
    "get_pending_timesheet_approvals_with_data",
    {
      manager_id: managerId,
    }
  );

  if (error) console.error(error);
  else return data as TimesheetApproval[];
};
