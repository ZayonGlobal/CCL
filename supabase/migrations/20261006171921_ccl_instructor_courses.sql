begin;
-- Ownership is a protected column, never user-editable profile metadata.
alter table public.ccl_catalog add column owner_id uuid references public.ccl_accounts(user_id) on delete set null default auth.uid();
create index ccl_catalog_owner_idx on public.ccl_catalog(owner_id) where kind='course';
create function ccl_private.is_instructor() returns boolean language sql stable security definer set search_path='' as $$
 select auth.uid() is not null and exists(select 1 from public.ccl_accounts where user_id=auth.uid() and role='instructor')
$$;
revoke all on function ccl_private.is_instructor() from public,anon;
grant execute on function ccl_private.is_instructor() to authenticated;
create policy instructor_course_read on public.ccl_catalog for select to authenticated
 using(kind='course' and owner_id=(select auth.uid()) and (select ccl_private.is_instructor()));
create policy instructor_course_insert on public.ccl_catalog for insert to authenticated
 with check(kind='course' and owner_id=(select auth.uid()) and (select ccl_private.is_instructor()));
create policy instructor_course_update on public.ccl_catalog for update to authenticated
 using(kind='course' and owner_id=(select auth.uid()) and (select ccl_private.is_instructor()))
 with check(kind='course' and owner_id=(select auth.uid()) and (select ccl_private.is_instructor()));
-- Instructors archive via unpublish; deletion remains admin-only to preserve enrollments.
commit;
