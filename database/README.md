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

## Connecting Supabase

These are the planned steps for wiring the app to Supabase while keeping live data out of the UI until the content API is ready.

### 1. Create or Select a Supabase Project

Create a project in Supabase, then find the project URL and publishable key in the Supabase dashboard.

Use the publishable key for browser-safe client access. Do not put secret/service-role keys in `NEXT_PUBLIC_` environment variables.

### 2. Add Environment Variables

Create a local `.env.local` file at the repo root:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

These values identify the Supabase project for the Next.js app. They do not create tables, apply migrations, or grant access by themselves.

### 3. Install the Supabase Client

From the repo root:

```bash
pnpm --filter @beatles-story/web add @supabase/supabase-js
```

This should update `apps/web/package.json` and `pnpm-lock.yaml`.

### 4. Add a Typed Client Module

Create:

```text
apps/web/src/lib/supabase/client.ts
```

Expected shape:

```ts
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@beatles-story/shared-types";

export function createSupabaseClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}
```

Keep this module unused by the UI until we deliberately move from static fixture data to live data.

### 5. Link and Apply Migrations

Install the Supabase CLI if needed, then link the local repo to the Supabase project:

```bash
supabase login
supabase link --project-ref your-project-ref
```

Apply migrations:

```bash
supabase db push
```

### 6. Verify

Run:

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

If the client module was added but no UI uses it yet, the app should still build without needing a live database request during rendering.

### Deferred Work

Do not add these during the minimal connection step:

- application data fetching;
- public read policies;
- admin auth;
- row-level security policy design;
- ingestion jobs;
- AI integrations.

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
