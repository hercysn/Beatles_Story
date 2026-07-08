# Database

This directory documents the content database design. The executable Supabase/PostgreSQL migrations live in `../supabase/migrations`.

## Current Stage

The database layer is in the content-backend verification stage.

The PostgreSQL schema, public/admin policies, seed data, matching shared TypeScript types, Supabase-backed public read boundary, and admin write actions are present. The app falls back to fixtures when Supabase environment variables are not configured. Live Supabase verification still needs migrations and seed data applied to the linked project.

## Initial Schema

The content schema and backend policy migrations are defined in:

```text
supabase/migrations/20260707000000_initial_content_schema.sql
supabase/migrations/20260707010000_content_backend_policies.sql
supabase/migrations/20260707011000_public_content_fields.sql
supabase/migrations/20260707012000_publication_trust_statuses.sql
```

Implemented tables:

- `sources`
- `raw_documents`
- `entities`
- `entity_translations`
- `events`
- `anecdotes`
- `anecdote_translations`
- `claims`
- `claim_sources`
- `connections`

The migration includes enums, primary and foreign keys, uniqueness checks, slug and URL checks, confidence-range checks, review-status fields, JSONB metadata fields, indexes for common review/content queries, and `updated_at` triggers.

It also includes integrity triggers for:

- event locations, which must reference `place` entities;
- connection endpoints, which must reference existing events, anecdotes, people, songs, or places.

## Design Notes

- Canonical records are language-independent.
- Localized reader-facing content is stored in translation tables.
- Claims are separate from stories and events so evidence can be attached precisely.
- Source relationships support evidence, contradiction, contextual mentions, and general references.
- Connections are intentionally polymorphic because the product needs to connect events, anecdotes, people, songs, and places.
- Public visibility uses `publication_status`: anonymous readers can read published content, while draft and hidden content remain private.
- Verification, AI assistance, source coverage, and translation quality are separate trust signals and do not block published content from appearing publicly.
- Admin writes use protected server actions and require `SUPABASE_SERVICE_ROLE_KEY`.
- Production editorial access should set `EDITORIAL_ADMIN_TOKEN`.
- Ingestion and AI integrations are intentionally not included yet.

## Commands

Run Supabase migrations with the Supabase CLI once it is installed and linked to a project:

```bash
supabase db push
```

Seed data for the current six anecdotes lives in:

```text
supabase/seed.sql
```

## Live Supabase Verification

Use this checklist to verify that the content backend is running against Supabase instead of the fixture fallback.

### 1. Create or Select a Supabase Project

Create a project in Supabase, then find the project URL and publishable key in the Supabase dashboard.

Use the publishable key for browser-safe client access. Do not put secret/service-role keys in `NEXT_PUBLIC_` environment variables.

### 2. Configure Environment Variables

Create a local `.env.local` file for the Next.js app:

```text
apps/web/.env.local
```

Add:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
EDITORIAL_ADMIN_TOKEN=choose-a-secret-token
```

The public variables enable read queries. `SUPABASE_SERVICE_ROLE_KEY` enables protected server-side editorial writes. `EDITORIAL_ADMIN_TOKEN` protects the editorial route and write actions.

If these variables only exist in the repo-root `.env.local`, the app may not see them when running `pnpm dev`, because the Next.js app runs from `apps/web`.

### 3. Link and Apply Migrations

Install the Supabase CLI if needed, then link the local repo to the Supabase project:

```bash
supabase login
supabase link --project-ref your-project-ref
```

Apply migrations:

```bash
supabase db push
```

For local Supabase verification, reset the local database so migrations and seed data are replayed together:

```bash
supabase db reset
```

For a remote project, apply migrations with `supabase db push`, then run `supabase/seed.sql` through the SQL editor or `psql`.

### 4. Verify Public Reads Use Supabase

Start the app:

```bash
pnpm dev
```

Open:

```text
http://localhost:3000/en/anecdotes
http://localhost:3000/zh/anecdotes
http://localhost:3000/api/content/anecdotes?locale=en
```

Temporarily edit a published anecdote title in Supabase. Refresh the public page or API route. If the changed title appears, the app is reading live Supabase content. If the fixture title appears, the app is still falling back to local fixtures.

### 5. Verify Publication Visibility

Draft and hidden anecdotes must stay private, while published anecdotes remain visible regardless of trust status.

Run this against Supabase:

```sql
update public.anecdotes
set publication_status = 'draft'
where slug = 'john-paul-meet-1957';
```

Refresh `/en/anecdotes` and `/api/content/anecdotes?locale=en`. The anecdote should disappear.

Restore it and change trust signals:

```sql
update public.anecdotes
set
  publication_status = 'published',
  verification_status = 'unverified',
  ai_assisted = true,
  source_status = 'partially_sourced'
where slug = 'john-paul-meet-1957';
```

The anecdote should reappear with reader-facing badges such as `Unverified`, `AI-assisted`, and `Partially sourced`.

### 6. Verify Locale Fallback

Temporarily remove the Chinese translation for one anecdote:

```sql
delete from public.anecdote_translations
where anecdote_id = (
  select id from public.anecdotes where slug = 'john-paul-meet-1957'
)
and locale = 'zh-CN';
```

Open:

```text
http://localhost:3000/zh/anecdotes/john-paul-meet-1957
```

The page should show English content and the `Showing English fallback` badge.

After the check, restore the deleted translation by rerunning `supabase/seed.sql`.

### 7. Verify Editorial Access and Writes

With `EDITORIAL_ADMIN_TOKEN` set, opening this route without the token should show an access-required state:

```text
http://localhost:3000/en/editorial
```

To test with the token, send the `x-editorial-admin-token` header or set an `editorial_admin_token` cookie with the configured value. Then submit one editorial form and confirm the corresponding Supabase row changed.

Anonymous users must not be able to read draft or hidden content, access `raw_documents`, or call protected server actions successfully.

### 8. Run Final Checks

Run the standard project checks:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

The content-backend verification stage is complete when public reads, RLS visibility, locale fallback, and admin writes all work against Supabase without relying on fixture fallback.

## TypeScript Types

Database record types are defined in:

```text
packages/shared-types/src/database.ts
```

The shared types include:

- enum unions matching the PostgreSQL enums;
- row types for every table;
- insert and update types for every table;
- a Supabase-style `Database` type shape;
- generic helpers: `RowFor<Table>`, `InsertFor<Table>`, and `UpdateFor<Table>`.

Type-level coverage is in:

```text
packages/shared-types/src/database.type-test.ts
```

These tests are compiled by `pnpm typecheck` and verify representative enum, required-field, and claim-parent constraints.
