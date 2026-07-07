# Database

This directory documents the content database design. The executable Supabase/PostgreSQL migrations live in `../supabase/migrations`.

## Initial Schema

The initial content schema is defined in:

```text
supabase/migrations/20260707000000_initial_content_schema.sql
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
- Application database clients, auth, row-level security, ingestion, and AI integrations are intentionally not included yet.

## Commands

Run Supabase migrations with the Supabase CLI once it is installed and linked to a project:

```bash
supabase db push
```

Local SQL execution has not been wired into this repo yet.

## Task 3 Summary

Implementation:

- Added the initial PostgreSQL schema migration for the content backend.
- Modeled canonical language-independent records separately from localized translations.
- Added evidence, review, claim, source, event, anecdote, entity, and connection structures.
- Did not add application database clients, auth, row-level security, ingestion, or AI integrations.

Tests and verification:

- `pnpm format:check`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`

Changed files:

- `database/README.md`
- `supabase/migrations/20260707000000_initial_content_schema.sql`
- `README.md`
