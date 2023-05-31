drop function if exists "public"."get_events"(p_id text);

alter table "public"."pto_requests" add column "approval_status" smallint not null default '0'::smallint;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.approve_pto(pto_id bigint)
 RETURNS pto_requests
 LANGUAGE sql
AS $function$
    update pto_requests set approval_status = 1 where id = pto_id returning *;
$function$
;

CREATE OR REPLACE FUNCTION public.approve_timesheet(timesheet_id bigint)
 RETURNS time_entries
 LANGUAGE sql
AS $function$
    update time_entries set approval_status = 1 where id = timesheet_id returning *;
$function$
;

CREATE OR REPLACE FUNCTION public.create_pto_approval_event()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
manager RECORD;
contractor RECORD;
BEGIN
  SELECT * INTO STRICT manager FROM employees WHERE employees.id = NEW.approver;
  SELECT * INTO STRICT contractor FROM employees WHERE employees.id = NEW.requester;
  
  INSERT INTO events (fk, type, description, user_id)
  VALUES (NEW.id, 'hr', 'PTO requested by ' || contractor.first_name, manager.id);
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.create_pto_decision_event()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
manager RECORD;
contractor RECORD;
status TEXT;
BEGIN
  SELECT * INTO STRICT manager FROM employees WHERE employees.id = NEW.approver;
  SELECT * INTO STRICT contractor FROM employees WHERE employees.id = NEW.requester;

  IF NEW.approval_status = 0 THEN
    RETURN NEW;
  ELSIF NEW.approval_status = 1 then
    status := 'approved';
  ELSE
    status := 'rejected';
  END IF;

  INSERT INTO events (fk, type, description, user_id)
  VALUES (NEW.id, 'hr', 'PTO ' || status ||  ' by ' || manager.first_name || ' ' || manager.last_name, contractor.id);
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.create_timesheet_approval_event()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
manager RECORD;
contractor RECORD;
BEGIN
  SELECT * INTO STRICT manager FROM employees WHERE employees.id = NEW.approver;
  SELECT * INTO STRICT contractor FROM employees WHERE employees.id = NEW.contractor;

  INSERT INTO events (fk, type, description, user_id)
  VALUES (NEW.id, 'time', 'Timesheet approval requested by ' || contractor.first_name, manager.id);
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.create_timesheet_decision_event()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
manager RECORD;
contractor RECORD;
status TEXT;
BEGIN
  SELECT * INTO STRICT manager FROM employees WHERE employees.id = NEW.approver;
  SELECT * INTO STRICT contractor FROM employees WHERE employees.id = NEW.contractor;

  IF NEW.approval_status = 0 THEN
    RETURN NEW;
  ELSIF NEW.approval_status = 1 then
    status := 'approved';
  ELSE
    status := 'rejected';
  END IF;

  INSERT INTO events (fk, type, description, user_id)
  VALUES (NEW.id, 'time', 'Timesheet ' || status ||  ' by ' || manager.first_name, contractor.id);
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_events(employee_id uuid)
 RETURNS SETOF events
 LANGUAGE sql
AS $function$
    select * from events where user_id = employee_id AND NOT read;
$function$
;

CREATE OR REPLACE FUNCTION public.get_pending_pto_approvals(manager_id uuid)
 RETURNS SETOF pto_requests
 LANGUAGE sql
AS $function$
    select * from pto_requests where approver = manager_id AND approval_status = 0;
$function$
;

CREATE OR REPLACE FUNCTION public.get_pending_timesheet_approvals(manager_id uuid)
 RETURNS SETOF time_entries
 LANGUAGE sql
AS $function$
    select * from time_entries where approver = manager_id AND approval_status = 0;
$function$
;

CREATE OR REPLACE FUNCTION public.get_pto_requests(requester_id uuid)
 RETURNS SETOF pto_requests
 LANGUAGE sql
AS $function$
    select * from pto_requests where requester = requester_id;
$function$
;

CREATE OR REPLACE FUNCTION public.get_timesheet_requests(requester_id uuid)
 RETURNS SETOF time_entries
 LANGUAGE sql
AS $function$
    select * from time_entries where contractor = requester_id;
$function$
;

CREATE OR REPLACE FUNCTION public.reject_pto(pto_id bigint)
 RETURNS pto_requests
 LANGUAGE sql
AS $function$
    update pto_requests set approval_status = 2 where id = pto_id returning *;
$function$
;

CREATE OR REPLACE FUNCTION public.reject_timesheet(timesheet_id bigint)
 RETURNS time_entries
 LANGUAGE sql
AS $function$
    update time_entries set approval_status = 2 where id = timesheet_id returning *;
$function$
;

create policy "Enable all for authenticated users only"
on "public"."customer"
as permissive
for all
to authenticated
using (true)
with check (true);


create policy "Enable all for authenticated users only"
on "public"."time_entries"
as permissive
for all
to authenticated
using (true)
with check (true);


CREATE TRIGGER pto_approval_trigger AFTER INSERT ON public.pto_requests FOR EACH ROW EXECUTE FUNCTION create_pto_approval_event();

CREATE TRIGGER pto_decision_trigger AFTER UPDATE OF approval_status ON public.pto_requests FOR EACH ROW EXECUTE FUNCTION create_pto_decision_event();

CREATE TRIGGER timesheet_approval_trigger AFTER INSERT ON public.time_entries FOR EACH ROW EXECUTE FUNCTION create_timesheet_approval_event();

CREATE TRIGGER timesheet_decision_trigger AFTER UPDATE OF approval_status ON public.time_entries FOR EACH ROW EXECUTE FUNCTION create_timesheet_decision_event();



