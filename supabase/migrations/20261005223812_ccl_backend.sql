begin;
create schema if not exists ccl_private;
revoke all on schema ccl_private from public;
grant usage on schema ccl_private to anon, authenticated;

create table public.ccl_accounts (
 user_id uuid primary key references auth.users(id) on delete cascade,
 role text not null default 'student' check(role in ('student','mentor','instructor','organization_admin','administrator','super_admin')),
 membership_tier text not null default 'free' check(membership_tier in ('free','creator','builder','pro','teams')),
 created_at timestamptz not null default now()
);
create table public.ccl_profiles (
 user_id uuid primary key references public.ccl_accounts(user_id) on delete cascade,
 profile jsonb not null default '{}' check(jsonb_typeof(profile)='object' and octet_length(profile::text)<=20000),
 onboarding_completed boolean not null default false,
 updated_at timestamptz not null default now()
);
create table public.ccl_catalog (
 kind text not null check(kind in ('course','challenge','prompt','resource','live','opportunity')),
 id text not null check(length(id) between 1 and 100),
 payload jsonb not null check(jsonb_typeof(payload)='object' and payload ? 'id' and payload->>'id'=id),
 published boolean not null default false,
 created_at timestamptz not null default now(),
 primary key(kind,id)
);
create table public.ccl_enrollments (
 user_id uuid not null references public.ccl_accounts(user_id) on delete cascade,
 course_kind text not null default 'course' check(course_kind='course'),
 course_id text not null,
 created_at timestamptz not null default now(),
 primary key(user_id,course_id),
 foreign key(course_kind,course_id) references public.ccl_catalog(kind,id) on delete cascade
);
create index ccl_enrollments_course_idx on public.ccl_enrollments(course_kind,course_id);
create table public.ccl_lesson_progress (
 user_id uuid not null,
 course_id text not null,
 lesson_id text not null,
 completed boolean not null default false,
 updated_at timestamptz not null default now(),
 primary key(user_id,course_id,lesson_id),
 foreign key(user_id,course_id) references public.ccl_enrollments(user_id,course_id) on delete cascade
);
create table public.ccl_bookmarks (
 user_id uuid not null references public.ccl_accounts(user_id) on delete cascade,
 item_id text not null check(length(item_id) between 1 and 200),
 created_at timestamptz not null default now(),
 primary key(user_id,item_id)
);
create table public.ccl_records (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references public.ccl_accounts(user_id) on delete cascade,
 kind text not null check(kind in ('project','submission','post','comment','lesson_comment','live_chat','assignment','membership_request','team_request')),
 target_id text,
 payload jsonb not null check(jsonb_typeof(payload)='object' and octet_length(payload::text)<=40000),
 status text not null default 'submitted' check(status in ('draft','submitted','needs_revision','approved','featured','under_review','winner','honorable_mention')),
 created_at timestamptz not null default now()
);
create index ccl_records_owner_idx on public.ccl_records(user_id,kind,created_at desc);
create index ccl_records_target_idx on public.ccl_records(kind,target_id,created_at);
create table public.ccl_reactions (
 user_id uuid not null references public.ccl_accounts(user_id) on delete cascade,
 post_id uuid not null references public.ccl_records(id) on delete cascade,
 reaction text not null check(reaction in ('helpful','pray','inspired','celebrate')),
 primary key(user_id,post_id,reaction)
);
create index ccl_reactions_post_idx on public.ccl_reactions(post_id);
create table public.ccl_certificates (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references public.ccl_accounts(user_id) on delete cascade,
 certificate_id text not null unique,
 payload jsonb not null check(jsonb_typeof(payload)='object'),
 created_at timestamptz not null default now()
);
create index ccl_certificates_owner_idx on public.ccl_certificates(user_id);
create table public.ccl_inquiries (
 id uuid primary key default gen_random_uuid(),
 name text not null check(length(name) between 1 and 150),
 email text not null check(length(email)<=254 and email like '%_@_%._%'),
 subject text not null check(length(subject) between 1 and 200),
 message text not null check(length(message) between 1 and 5000),
 created_at timestamptz not null default now()
);
create index ccl_inquiries_email_idx on public.ccl_inquiries(email,created_at);

create function ccl_private.is_admin() returns boolean language sql stable security definer set search_path='' as $$
 select auth.uid() is not null and exists(select 1 from public.ccl_accounts where user_id=auth.uid() and role in ('administrator','super_admin'))
$$;
create function ccl_private.course_allowed(p_id text) returns boolean language sql stable security definer set search_path='' as $$
 select exists(select 1 from public.ccl_catalog c where c.kind='course' and c.id=p_id and c.published and (
  coalesce(c.payload->>'membershipAccess','free')='free' or ccl_private.is_admin() or exists(
   select 1 from public.ccl_accounts a where a.user_id=auth.uid() and
   case a.membership_tier when 'teams' then 4 when 'pro' then 3 when 'builder' then 2 when 'creator' then 1 else 0 end >=
   case c.payload->>'membershipAccess' when 'teams' then 4 when 'pro' then 3 when 'builder' then 2 when 'creator' then 1 else 0 end)))
$$;
create function ccl_private.new_user() returns trigger language plpgsql security definer set search_path='' as $$
begin
 insert into public.ccl_accounts(user_id) values(new.id);
 insert into public.ccl_profiles(user_id,profile) values(new.id,jsonb_build_object(
  'firstName',left(coalesce(new.raw_user_meta_data->>'first_name',''),100),
  'lastName',left(coalesce(new.raw_user_meta_data->>'last_name',''),100)));
 return new;
end $$;
create trigger ccl_auth_user_created after insert on auth.users for each row execute function ccl_private.new_user();

create function ccl_private.validate_record() returns trigger language plpgsql security definer set search_path='' as $$
declare p jsonb; r text;
begin
 if auth.uid() is null or (new.user_id<>auth.uid() and not ccl_private.is_admin()) then raise exception 'Sign in to save activity'; end if;
 if not ccl_private.is_admin() and new.status not in ('draft','submitted') then raise exception 'Only an administrator can approve work'; end if;
 if new.kind in ('comment') and not exists(select 1 from public.ccl_records where id::text=new.target_id and kind='post') then raise exception 'Post not found'; end if;
 if new.kind in ('lesson_comment','assignment') and not exists(
   select 1 from public.ccl_catalog c cross join lateral jsonb_array_elements(coalesce(c.payload->'modules','[]')) m
   cross join lateral jsonb_array_elements(coalesce(m->'lessons','[]')) l
   join public.ccl_enrollments e on e.course_id=c.id and e.user_id=new.user_id
   where c.kind='course' and ccl_private.course_allowed(c.id) and l->>'id'=new.target_id
 ) then raise exception 'Enroll in this course before submitting work'; end if;
 if new.kind='live_chat' and not exists(select 1 from public.ccl_catalog where kind='live' and id=new.target_id and published) then raise exception 'Session not found'; end if;
 if new.kind='submission' and not exists(select 1 from public.ccl_catalog where kind='challenge' and id=new.target_id and published) then raise exception 'Challenge not found'; end if;
 select profile into p from public.ccl_profiles where user_id=new.user_id;
 select role into r from public.ccl_accounts where user_id=new.user_id;
 new.payload = (new.payload - 'author' - 'creator' - 'mentorFeedback' - 'isPinned') || jsonb_build_object('creator',jsonb_build_object(
  'id',new.user_id,'name',trim(coalesce(p->>'firstName','')||' '||coalesce(p->>'lastName','')),
  'avatar',coalesce(p->>'avatar','/avatar.svg'),'headline',coalesce(p->>'headline',''),
  'role',r,'level',coalesce(p->>'learningLevel','Explorer')));
 return new;
end $$;
create trigger ccl_record_validation before insert on public.ccl_records for each row execute function ccl_private.validate_record();
create function ccl_private.validate_progress() returns trigger language plpgsql set search_path='' as $$
begin
 if not ccl_private.course_allowed(new.course_id) or not exists(
  select 1 from public.ccl_catalog c cross join lateral jsonb_array_elements(coalesce(c.payload->'modules','[]')) m
  cross join lateral jsonb_array_elements(coalesce(m->'lessons','[]')) l
  where c.kind='course' and c.id=new.course_id and l->>'id'=new.lesson_id
 ) then raise exception 'Lesson unavailable'; end if;
 new.updated_at=now(); return new;
end $$;
create trigger ccl_progress_validation before insert or update on public.ccl_lesson_progress for each row execute function ccl_private.validate_progress();

alter table public.ccl_accounts enable row level security;
alter table public.ccl_profiles enable row level security;
alter table public.ccl_catalog enable row level security;
alter table public.ccl_enrollments enable row level security;
alter table public.ccl_lesson_progress enable row level security;
alter table public.ccl_bookmarks enable row level security;
alter table public.ccl_records enable row level security;
alter table public.ccl_reactions enable row level security;
alter table public.ccl_certificates enable row level security;
alter table public.ccl_inquiries enable row level security;
create policy accounts_read on public.ccl_accounts for select to authenticated using(user_id=(select auth.uid()) or (select ccl_private.is_admin()));
create policy accounts_admin on public.ccl_accounts for update to authenticated using((select ccl_private.is_admin())) with check((select ccl_private.is_admin()));
create policy profiles_read on public.ccl_profiles for select to authenticated using(user_id=(select auth.uid()) or (select ccl_private.is_admin()));
create policy profiles_update on public.ccl_profiles for update to authenticated using(user_id=(select auth.uid())) with check(user_id=(select auth.uid()));
create policy catalog_read on public.ccl_catalog for select to anon,authenticated using((published and (kind<>'course' or ccl_private.course_allowed(id))) or (select ccl_private.is_admin()));
create policy catalog_admin on public.ccl_catalog for all to authenticated using((select ccl_private.is_admin())) with check((select ccl_private.is_admin()));
create policy enroll_read on public.ccl_enrollments for select to authenticated using(user_id=(select auth.uid()) or (select ccl_private.is_admin()));
create policy enroll_insert on public.ccl_enrollments for insert to authenticated with check(user_id=(select auth.uid()) and ccl_private.course_allowed(course_id));
create policy progress_own on public.ccl_lesson_progress for all to authenticated using(user_id=(select auth.uid())) with check(user_id=(select auth.uid()));
create policy bookmarks_own on public.ccl_bookmarks for all to authenticated using(user_id=(select auth.uid())) with check(user_id=(select auth.uid()));
create policy records_read on public.ccl_records for select to authenticated using(user_id=(select auth.uid()) or (select ccl_private.is_admin()) or kind in ('post','comment','live_chat') or (kind='submission') or (kind='lesson_comment' and exists(
 select 1 from public.ccl_catalog c cross join lateral jsonb_array_elements(coalesce(c.payload->'modules','[]')) m
 cross join lateral jsonb_array_elements(coalesce(m->'lessons','[]')) l join public.ccl_enrollments e on e.course_id=c.id and e.user_id=(select auth.uid())
 where c.kind='course' and ccl_private.course_allowed(c.id) and l->>'id'=target_id)));
create policy records_insert on public.ccl_records for insert to authenticated with check(user_id=(select auth.uid()) and status in ('draft','submitted'));
create policy records_admin_update on public.ccl_records for update to authenticated using((select ccl_private.is_admin())) with check((select ccl_private.is_admin()));
create policy records_delete on public.ccl_records for delete to authenticated using(user_id=(select auth.uid()) or (select ccl_private.is_admin()));
create policy reactions_read on public.ccl_reactions for select to authenticated using(true);
create policy reactions_insert on public.ccl_reactions for insert to authenticated with check(user_id=(select auth.uid()) and exists(select 1 from public.ccl_records where id=post_id and kind='post'));
create policy reactions_delete on public.ccl_reactions for delete to authenticated using(user_id=(select auth.uid()));
create policy certificates_read on public.ccl_certificates for select to authenticated using(user_id=(select auth.uid()) or (select ccl_private.is_admin()));
create policy certificates_admin on public.ccl_certificates for all to authenticated using((select ccl_private.is_admin())) with check((select ccl_private.is_admin()));
create policy inquiries_admin on public.ccl_inquiries for select to authenticated using((select ccl_private.is_admin()));

revoke all on public.ccl_accounts,public.ccl_profiles,public.ccl_catalog,public.ccl_enrollments,public.ccl_lesson_progress,public.ccl_bookmarks,public.ccl_records,public.ccl_reactions,public.ccl_certificates,public.ccl_inquiries from anon,authenticated;
grant select,update on public.ccl_accounts to authenticated;
grant select on public.ccl_profiles to authenticated;
grant update(profile,onboarding_completed,updated_at) on public.ccl_profiles to authenticated;
grant select on public.ccl_catalog to anon,authenticated;
grant insert,update,delete on public.ccl_catalog to authenticated;
grant select,insert on public.ccl_enrollments to authenticated;
grant select,insert,update,delete on public.ccl_lesson_progress,public.ccl_bookmarks,public.ccl_records,public.ccl_certificates to authenticated;
grant select,insert,delete on public.ccl_reactions to authenticated;
grant select on public.ccl_inquiries to authenticated;
revoke execute on all functions in schema ccl_private from public;
grant execute on function ccl_private.is_admin(),ccl_private.course_allowed(text) to anon,authenticated;

-- Only this validated RPC accepts public enquiries. A per-email cap prevents rapid repeats.
create function public.ccl_submit_inquiry(p_name text,p_email text,p_subject text,p_message text)
returns uuid language plpgsql security definer set search_path='' as $$
declare result uuid;
begin
 if length(trim(p_name)) not between 1 and 150 or length(p_email)>254 or p_email not like '%_@_%._%' or
  length(p_subject) not between 1 and 200 or length(trim(p_message)) not between 1 and 5000 then raise exception 'Please check your message details'; end if;
 perform pg_advisory_xact_lock(hashtext(lower(trim(p_email))));
 if (select count(*) from public.ccl_inquiries where lower(email)=lower(trim(p_email)) and created_at>now()-interval '1 hour')>=3 then raise exception 'Please wait before sending another message'; end if;
 insert into public.ccl_inquiries(name,email,subject,message) values(trim(p_name),lower(trim(p_email)),p_subject,trim(p_message)) returning id into result;
 return result;
end $$;
revoke execute on function public.ccl_submit_inquiry(text,text,text,text) from public;
grant execute on function public.ccl_submit_inquiry(text,text,text,text) to anon,authenticated;
commit;
