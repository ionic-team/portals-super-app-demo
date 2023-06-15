CREATE OR REPLACE FUNCTION public.get_customers_by_employee(employee_id uuid)
 RETURNS SETOF customer
 LANGUAGE sql
AS $function$
    select * from customer where salesperson = employee_id;
$function$
;

CREATE OR REPLACE FUNCTION public.get_customers()
 RETURNS SETOF customer
 LANGUAGE sql
AS $function$
    select * from customer;
$function$
;

CREATE TYPE public.pto_request_data AS (
    pto_request pto_requests,
    employee employees
);

CREATE OR REPLACE FUNCTION public.get_pending_pto_approvals_with_data(manager_id uuid)
 RETURNS SETOF pto_request_data
 LANGUAGE sql
AS $function$
  SELECT pto_requests, employees
  FROM pto_requests
  INNER JOIN employees ON pto_requests.requester = employees.id
  WHERE pto_requests.approver = manager_id
  AND pto_requests.approval_status = 0;
$function$
;

CREATE TYPE public.timesheet_approval_data AS (
    time_entry time_entries,
    customer customer,
    employee employees
);

CREATE OR REPLACE FUNCTION public.get_pending_timesheet_approvals_with_data(manager_id uuid)
 RETURNS SETOF timesheet_approval_data
 LANGUAGE sql
AS $function$
  SELECT time_entries, (customer.id, customer.created_at, customer.salesperson, customer.name) as customer, employees
  FROM time_entries
  INNER JOIN employees ON time_entries.contractor = employees.id
  INNER JOIN customer ON time_entries.customer = customer.id
  WHERE time_entries.approver = manager_id
  AND time_entries.approval_status = 0;
$function$
;

CREATE TYPE public.timesheet_request_data AS (
  time_entry time_entries,
  customer customer
);

CREATE OR REPLACE FUNCTION public.get_timesheet_requests_with_data(contractor_id uuid)
 RETURNS SETOF timesheet_request_data
 LANGUAGE sql
AS $function$
  SELECT time_entries, (customer.id, customer.created_at, customer.salesperson, customer.name) as customer
  FROM time_entries
  INNER JOIN customer ON time_entries.customer = customer.id
  WHERE time_entries.contractor = '59ce5d8a-5cad-4658-9ae0-c8d335543201'
$function$
;
