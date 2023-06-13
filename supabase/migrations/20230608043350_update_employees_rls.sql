create policy "Enable read for authenticated users only"
on "public"."employees"
as permissive
for select
to authenticated
using (true);

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




