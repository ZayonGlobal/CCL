# Christian Creator Lab

A React/Vite learning platform with Supabase authentication and persistent creator data.

## Run locally

Use Node 22 or newer. Run `npm ci`, copy `.env.example` to `.env.local`, fill in the two public Supabase values, then run `npm run dev`. `npm run lint` checks TypeScript; `npm run build` produces `dist`.

Registration is disabled when no backend is configured. Users are never automatically signed in and cannot select an administrator role or activate a paid membership themselves.

## Configure the dedicated Supabase backend

1. Create a dedicated project named CCL. The connected organization currently has two active free projects, so a free slot must be available before a new project can be created. Do not apply CCL's schema to an unrelated site without intentionally choosing shared authentication.
2. Run `supabase/migrations/20261005223812_ccl_backend.sql` in that project's SQL editor. It creates the tables, signup trigger, grants, validated contact RPC and row-level security policies. Alternatively link this directory with the Supabase CLI and push its migration.
3. Set the Auth **Site URL** to the exact deployed CCL origin. Add the same origin and `https://YOUR-CCL-HOST/?recovery=1` to the permitted redirect URLs. For local testing, add `http://localhost:3000` and `http://localhost:3000/?recovery=1`.
4. Keep email confirmations enabled, use a minimum password length of 8, and configure a production SMTP provider for confirmation and password reset emails. Supabase's built-in development mail service may only deliver to authorized addresses and has rate limits. The app never reports a mail request as successful if the API rejects it.
5. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` to Vercel's Preview and Production environments, then rebuild. Use a publishable key, never a service-role or secret key. Vite replaces these variables at build time.
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

The migration has been exercised with a local PostgreSQL-compatible engine for signup triggers, private-row isolation, forged metadata, enrollment restrictions, lesson validation, signed author identity, anonymous read denial, enquiry validation and administrator management. Production build and TypeScript checks are also required. Live Supabase authentication and email delivery remain dependent on provisioning a dedicated project and configuring its public origin.
