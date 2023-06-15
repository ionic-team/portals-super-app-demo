create view "public"."perks_full" as
	select 
		perks.amount, 
		e_giver.first_name as giver_first_name, 
		e_giver.last_name as giver_last_name, 
		e_receiver.first_name as receiver_first_name, 
		e_receiver.last_name as receiver_last_name, 
		perks.reason, 
		perks.created_at 
	from perks
		inner join employees as e_giver on perks.giver = e_giver.id
		inner join employees as e_receiver on perks.receiver = e_receiver.id;

CREATE OR REPLACE FUNCTION public.get_full_perks()
 RETURNS SETOF perks_full
 LANGUAGE sql
AS $function$
    select * from perks_full;
$function$
;

create policy "Enable read for authenticated users only"
on "public"."perks"
as permissive
for select
to authenticated
using (true);

CREATE POLICY "Enable insert for authenticated users only" ON "public"."perks"
AS PERMISSIVE FOR INSERT
TO authenticated
WITH CHECK (true);
