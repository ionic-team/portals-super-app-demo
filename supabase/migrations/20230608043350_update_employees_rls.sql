create policy "Enable read for authenticated users only"
on "public"."employees"
as permissive
for select
to authenticated
using (true);




