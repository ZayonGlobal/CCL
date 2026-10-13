create schema if not exists ccl_internal;
revoke all on schema ccl_internal from public,anon,authenticated;
grant usage on schema ccl_internal to service_role;
create table if not exists ccl_internal.recovery_requests (
  id bigint generated always as identity primary key,
  email_hash text not null, ip_hash text not null, created_at timestamptz not null default now()
);
alter table ccl_internal.recovery_requests enable row level security;
revoke all on ccl_internal.recovery_requests from public,anon,authenticated;
create index if not exists recovery_requests_ip_time on ccl_internal.recovery_requests(ip_hash,created_at);
create index if not exists recovery_requests_email_time on ccl_internal.recovery_requests(email_hash,created_at);
create or replace function ccl_internal.recovery_lookup(p_email text,p_ip text)
returns boolean language plpgsql security definer set search_path='' as $$
declare e text:=lower(trim(p_email)); eh text:=md5(e); ih text:=md5(p_ip); found boolean;
begin
 if e is null or length(e)>254 or e !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$' or p_ip is null then raise exception 'invalid_request'; end if;
 perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(ih,10));
 perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(eh,20));
 delete from ccl_internal.recovery_requests where created_at<now()-interval '1 day';
 if (select count(*) from ccl_internal.recovery_requests where ip_hash=ih and created_at>now()-interval '1 hour')>=10
 or exists(select 1 from ccl_internal.recovery_requests where email_hash=eh and created_at>now()-interval '1 minute')
 then raise exception 'recovery_rate_limit'; end if;
 insert into ccl_internal.recovery_requests(email_hash,ip_hash) values(eh,ih);
 select exists(select 1 from auth.users where lower(email)=e and deleted_at is null) into found;
 return found;
end $$;
revoke all on function ccl_internal.recovery_lookup(text,text) from public,anon,authenticated;
grant execute on function ccl_internal.recovery_lookup(text,text) to service_role;
create or replace function public.ccl_recovery_lookup(p_email text,p_ip text)
returns boolean language sql security invoker set search_path='' as $$select ccl_internal.recovery_lookup(p_email,p_ip)$$;
revoke all on function public.ccl_recovery_lookup(text,text) from public,anon,authenticated;
grant execute on function public.ccl_recovery_lookup(text,text) to service_role;

