# Christian Creator Lab

React/Vite learning platform with Supabase authentication and persistent creator data.

Production: https://ccl-delta.vercel.app. Dedicated Supabase project: `rvnrajnrickhrqlmgeuh`.

## Development

Use Node 22 or newer. Run `npm ci`, copy `.env.example` to `.env.local`, and configure `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`. These are public frontend connection values. Never put service-role keys, SMTP passwords, or other secrets in `VITE_` variables.

- `npm run dev`: development server.
- `npm run lint`: TypeScript checks.
- `npm run build`: production bundle in `dist`.
- `npm run test:ui`: browser authentication and persistence tests.
- `npm run test:db`: schema/RLS tests using a PostgreSQL-compatible engine.
- `node tests/channel-signup.mjs`: popup validation and SMTP handling checks.

Browser tests mock the Supabase HTTP boundary. They do not send real emails. Set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` when using a system Chromium. Install a Playwright browser for normal local runs.

## Authentication

Configure the Supabase Site URL as `https://ccl-delta.vercel.app`, and allow that origin and `https://ccl-delta.vercel.app/?recovery=1` as redirects. Configure a production SMTP provider and keep email confirmation enabled. Use a minimum password length of 8.

Signup requires two matching passwords. Each password field has a visibility toggle. The verification dialog remains open and persists across reloads, accepts the signup OTP, and has a resend cooldown. No dashboard session is created by the app before verification.

**Activate code emails:** replace **Authentication → Emails → Confirm sign up** with `supabase/templates/confirmation.html`, subject **Your verification code | Christian Creator Lab**. The hosted template must include `{{ .Token }}`. Updating the repository file does not update Supabase's hosted template. Existing verification links still establish a verified session; the new template uses code entry.

Recovery calls the JWT-protected `ccl-password-recovery` Supabase Edge Function. Server-provided service credentials perform a single-email lookup and apply persistent email/IP request limits before requesting a recovery link from Supabase Auth. Missing accounts receive a clear message. Successful requests are shown only after Auth accepts the send.

Source: `supabase/functions/ccl-password-recovery/index.ts`. Database setup: `supabase/sql/recovery_account_lookup.sql`. The private rate-limit table has RLS and no visitor/member access. The lookup RPC is callable only by the service role. The project public anonymous gateway JWT in `src/config/recoveryPublic.ts` is a public key, not a service-role credential. Update that public configuration if changing projects.

## Role workspaces

Roles come from protected `ccl_accounts` columns, never editable user metadata. New accounts start as students. `zayoncreatives@gmail.com` is the verified first administrator.

| Role | Default workspace |
|---|---|
| Student | Creator dashboard |
| Mentor | Mentor workspace |
| Instructor | Instructor Studio |
| Organization administrator | Organization workspace |
| Administrator / super administrator | Management dashboard |

Home/workspace navigation uses the same role mapping as sign-in. Administrator management is organized into overview, members and access, courses, project reviews, inquiries, and team requests. Member roles and plans are assigned by platform administrators. Accounts cannot demote themselves through the management UI.

Instructors create drafts, manage descriptions/access tiers, add modules and YouTube lessons, and publish/unpublish their own courses. Catalog `owner_id` is authoritative. Database policies prevent instructors from changing other owners' courses or assigning themselves roles. Administrators can manage all courses. Course deletion remains administrator-only.

Mentor workspaces organize community conversations and learning resources. Organization workspaces show the current user's team requests and learning links. Team invitations, seat provisioning, and shared organization data management are not implemented; the UI does not claim those capabilities.

## Data and access

Apply the SQL files in `supabase/migrations` in order for a new installation, then the recovery SQL setup and Edge Function. Do not install CCL's schema into an unrelated project without intentionally sharing authentication.

- `ccl_accounts` / `ccl_profiles`: protected roles and owned identity/preferences.
- `ccl_catalog`: courses, challenges, resources, prompts, live sessions and opportunities.
- `ccl_enrollments` / `ccl_lesson_progress`: owned enrollment and lesson completion.
- `ccl_records`: projects, assignments, submissions, posts, replies and requests. Author identity is assigned on the server. Private projects and assignments are visible to their owner and administrators; community posts and challenge submissions are shared with signed-in members.
- `ccl_bookmarks` / `ccl_reactions`: saved items and reactions.
- `ccl_certificates`: administrator-issued credentials.
- `ccl_inquiries`: public contact submissions; direct anonymous reads are denied.

Forms confirm success only after a database acknowledgment. Shared discussions refresh every 30 seconds and on browser focus. The community load currently caps at the latest 1,000 records; add pagination for larger communities.

Google sign-in remains hidden unless `VITE_GOOGLE_AUTH_ENABLED=true` and the provider is configured. The assistant uses the local curriculum help engine. Do not put a Gemini API key in frontend variables.

## Popup welcome email

Contact: +234 806 168 8292, cclabsupport@gmail.com.
WhatsApp channel: https://whatsapp.com/channel/0029VbB8jEWEawdyeLVjfb3i.

The popup triggers after 12 seconds of engagement on top-edge exit or 55% page scroll. It pauses while other dialogs or inputs are active, traps focus, supports Escape, and dismisses for the browser session. Submissions save to administrator inquiries and send a welcome email before redirecting. Send failures remain visible with a link to continue manually.

The server endpoint `/api/channel-signup` uses these server-only Production variables:

| Variable | Value |
|---|---|
| `SMTP_HOST` | `smtp-relay.brevo.com` |
| `SMTP_PORT` | `587` |
| `SMTP_USER` | Brevo SMTP login |
| `SMTP_PASSWORD` | Full Brevo SMTP key |
| `SMTP_FROM_EMAIL` | Verified sender, default `zayoncreatives@gmail.com` |
| `SMTP_FROM_NAME` | Christian Creator Lab |

Save passwords as Secrets, then redeploy. The popup uses SMTP rather than the old Brevo API-key connection. Supabase uses its own hosted SMTP configuration for authentication mail. Credentials are never sent to the browser. Earlier popup signups are not automatically emailed again.

The welcome email mentions the AI Bible and other resources in the WhatsApp channel. No PDF is attached by the application.

## Theme and loading

Light and dark themes share readable surfaces, focus states, controls and status colors. Workspace headers and cards adapt to both themes. Logos become white in dark layouts. The shared CCL symbol loader shows during genuine pending actions and has a static reduced-motion alternative.

## Verification limits

TypeScript, production build, 13 browser tests, private recovery permissions, lookup/rate-limit assertions, and the live missing-account recovery response were checked. Hosted signup template activation and positive email delivery require separate verification. Deployment status depends on access to the intended Vercel team; do not treat a Git push alone as proof of a READY deployment.
