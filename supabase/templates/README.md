# CCL authentication emails

These files are prepared templates. Committing or deploying the website does not update hosted Supabase email templates.

Open https://supabase.com/dashboard/project/rvnrajnrickhrqlmgeuh/auth/templates

Under Authentication → Emails, choose each template, replace its subject and HTML source, and save.

| Supabase template | Subject | HTML file |
| --- | --- | --- |
| Confirm sign up | Confirm your email &#124; Christian Creator Lab | confirmation.html |
| Reset password | Reset your password &#124; Christian Creator Lab | recovery.html |

Keep every `{{ .ConfirmationURL }}` placeholder intact. Supabase generates the correct verification URL and redirect for each message. The same placeholder supports signup confirmation and password recovery.

Preview each email in the dashboard. Then test a new registration and a password reset through the live CCL site. Never paste actual confirmation links into public screenshots or commit them. Existing delivered emails do not change when a template is updated.

These use inline styles, system fonts, presentation tables, and a text wordmark without external images. They change branding, not email delivery or sender authentication.
