# Christian Creator Lab

A React/Vite learning platform with Supabase authentication and persistent creator data.

Production site: https://ccl-delta.vercel.app. Its dedicated Supabase project is `rvnrajnrickhrqlmgeuh`, accessed through the CCL Zayon DEv connection. The database migrations and public frontend connection values are installed. Auth redirect configuration and real confirmation/reset email delivery still need verification before public registration is considered ready.

## Run locally

Use Node 22 or newer. Run `npm ci`, copy `.env.example` to `.env.local`, fill in the two public Supabase values, then run `npm run dev`. `npm run lint` checks TypeScript; `npm run build` produces `dist`.

Registration is disabled when no backend is configured. Users are never automatically signed in and cannot select an administrator role or activate a paid membership themselves.

## Configure the dedicated Supabase backend

1. Use the dedicated CCL project above. For a separate installation, create a dedicated project; do not apply CCL's schema to an unrelated site without intentionally choosing shared authentication.
2. On a new installation, apply the SQL files under `supabase/migrations` in filename order. They create the tables, signup trigger, grants, validated contact RPC and row-level security policies, and restrict API execution of Supabase's internal RLS event-trigger helper. Alternatively link this directory with the Supabase CLI and push its migrations. Both migrations are already applied to the production project.
3. Set the Auth **Site URL** to `https://ccl-delta.vercel.app`. Add `https://ccl-delta.vercel.app` and `https://ccl-delta.vercel.app/?recovery=1` to the permitted redirect URLs. For local testing, add `http://localhost:3000` and `http://localhost:3000/?recovery=1`.
4. Keep email confirmations enabled, use a minimum password length of 8, and configure a production SMTP provider for confirmation and password reset emails. Supabase's built-in development mail service may only deliver to authorized addresses and has rate limits. The app never reports a mail request as successful if the API rejects it.
5. For another deployment, add `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` to Vercel's Preview and Production environments, then rebuild. These values are already saved for CCL's Production, Preview and Development environments. Use a publishable key, never a service-role or secret key. Vite replaces these variables at build time.
6. Register and confirm your own account. Bootstrap the first platform administrator using the SQL below, with the real registered user ID copied from Supabase Auth. Do not accept administrator roles from signup metadata.

```sql
update public.ccl_accounts
set role = 'administrator'
where user_id = 'REPLACE_WITH_YOUR_AUTH_USER_UUID';
```

The administrator can then add courses, manage member roles and membership plans, review projects, and read contact, team and membership requests from CCL Operations. Only platform administrators have those permissions. Mentor and instructor accounts do not gain platform-wide access automatically.

## Data model and behavior

- `ccl_accounts`: protected role and membership access.
- `ccl_profiles`: account-specific identity, preferences, and onboarding.
- `ccl_catalog`: published courses, challenges, resources, prompts, live sessions and opportunities. New installations have an empty catalog rather than fabricated courses or learners. Course rows require a matching `payload.id`; use the administration form to add a free course and YouTube lesson. Other catalog types can be curated in Supabase's dashboard with the shapes in `src/types/index.ts`.
- `ccl_enrollments` / `ccl_lesson_progress`: owned enrollments and per-lesson completion. Unknown lessons and enrollment into inaccessible paid content are rejected by the database.
- `ccl_records`: real projects, challenge submissions, posts, replies, lesson discussion, live chat, assignments, team requests and membership requests. Author identity is derived on the server from the signed-in account. Projects and assignments are private to their owner and platform administrators. Community posts and challenge submissions are shared with signed-in members.
- `ccl_bookmarks` / `ccl_reactions`: durable saved resources and one reaction of each type per account per post.
- `ccl_certificates`: administrator-issued credentials only; demo credentials are never awarded or verified.
- `ccl_inquiries`: contact and church requests. Public visitors can submit through a validated RPC but cannot read submissions. Requests are saved; this integration does not send notifications to the CCL team or accept payments.

Data submissions show success only after the database acknowledges the write. Shared conversations refresh every 30 seconds and when the browser gains focus. The current first-page community load is limited to the most recent 1,000 records; add pagination before scaling beyond that. Team workspaces are requested for administrator provisioning; invitation emails and seat management are not yet implemented.

Google login is hidden until `VITE_GOOGLE_AUTH_ENABLED=true` and the Google provider is configured in Supabase. The Gemini assistant remains a local help engine: do not enable a `VITE_GEMINI_API_KEY`, which would expose that credential in the browser bundle.

## Verification

Run `npm run test:db` for the PostgreSQL-compatible schema and access-control suite. Install Chromium with `npx playwright install chromium`, then run `npm run test:ui` for signup confirmation, invalid-password handling, save/reload persistence, logout and contact failure handling. Browser tests emulate the Supabase HTTP boundary; they do not verify a hosted Supabase project or real email delivery.

Before activating registration, test confirmation email delivery and password recovery at the actual public origin, then test signup, onboarding, logout/login, project submission, saved progress and contact requests. Check that a second account cannot access the first account's private rows and that only administrators can change roles, plans, course publication or review statuses.

The migrations have been exercised with a local PostgreSQL-compatible engine for signup triggers, private-row isolation, forged metadata, enrollment restrictions, lesson validation, signed author identity, anonymous read denial, enquiry validation and administrator management. A rollback-only test also passed on the live database for signup triggers, safe default roles, private-row isolation, privilege protection, signed author identity and inquiry submissions; it leaves no test users or records. The public catalog API is accessible and anonymous profile reads are denied. Live Auth reports email signup enabled with confirmation required. Confirmation and password-reset email delivery still need verification at the public origin.

The security advisors report only the intentionally public `ccl_submit_inquiry` SECURITY DEFINER RPC. It validates inputs, caps repeat requests, and returns no private inquiry data. This is reviewed against https://supabase.com/docs/guides/database/database-linter?lint=0028_anon_security_definer_function_executable; direct anonymous table access remains denied.

## Instructor Studio

Registered members start as students. An administrator assigns the instructor role through Admin Operations → Members and access. Instructors open Instructor Studio from the desktop sidebar or the profile menu on mobile. They can create drafts, edit course descriptions and access tiers, add/remove modules and YouTube lessons, edit notes/transcripts, and publish/unpublish their own courses. Administrators can edit all courses through the same Studio.

The catalog owner_id column is authoritative; profile metadata and payload instructor names do not grant access. Row-level policies prevent students from authoring, instructors from editing other owners' courses or other catalog types, and ownership reassignment by instructors. Course deletion remains admin-only. Existing ownerless courses remain administrator-managed. Instructor Studio currently previews course details; full learner playback uses the normal enrollment flow.

The first administrator must already have a registered, verified account. Assign its protected ccl_accounts.role by the matching auth.users ID, never by user metadata. The requested first-admin email has not yet registered as of this implementation; no account was fabricated or verification bypassed.

Verification: TypeScript and production build; database tests include two instructors, private drafts, owner-only updates, publishing/unpublishing, ownership spoofing, role revocation, students denied authoring, and administrator oversight. Hosted ownership checks ran inside a rolled-back transaction. Browser verification remains blocked by the environment's Chromium startup crash.

Supabase security review also reports disabled leaked-password protection; dashboard guidance: https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection . The intentional contact-RPC security-definer advisories are documented above.
