# Environment Variables Guide — Kaffy Saloon

This directory contains reference documentation and templates for all services powering Kaffy Saloon:

---

## 1. Clerk (Authentication & Portals)
- **Where to find**: Go to [dashboard.clerk.com](https://dashboard.clerk.com/) -> Select your app -> **API Keys**.
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Starts with `pk_test_...`
- `CLERK_SECRET_KEY`: Starts with `sk_test_...` (Click the copy icon to get the full key without dots `...`).

---

## 2. Supabase (Database & Storage)
- **Where to find**: Go to [supabase.com/dashboard](https://supabase.com/dashboard) -> Select your project -> **Project Settings** (gear icon) -> **API**.
- `NEXT_PUBLIC_SUPABASE_URL`: e.g. `https://xyzabcdefg.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Starts with `eyJhbGciOi...`
- `SUPABASE_SERVICE_ROLE_KEY`: Secret service role key (for admin overrides).

---

## 3. Resend (Mailing & Alerts)
- **Where to find**: Go to [resend.com/api-keys](https://resend.com/api-keys) -> Click **Create API Key**.
- `RESEND_API_KEY`: Starts with `re_...`
- `SALON_ADMIN_EMAIL`: Your email (`fitzaramide@gmail.com`) where Kaffy receives new booking alerts.
- `RESEND_FROM_EMAIL`: Sender display name and email.
