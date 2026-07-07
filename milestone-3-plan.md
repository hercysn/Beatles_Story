# Milestone 3 Plan: Content Backend

## Current Status

Milestone 3 is implemented in code and ready for live Supabase verification.

Already in place:

- PostgreSQL schema migration for the content model.
- Tables for sources, raw documents, entities, events, anecdotes, translations, claims, claim sources, and connections.
- Shared TypeScript database types.
- Supabase client module.
- Supabase-backed public content boundary with fixture fallback.
- Supabase seed data for the six current anecdotes.
- Public/admin row-level security policies.
- Admin-gated editorial dashboard.
- Server-action editing forms for sources, events, anecdotes, translations, claims, and claim-source attachments.
- Publication, verification, AI-assistance, source-coverage, and translation-quality statuses are modeled separately.

The remaining gap is operational verification against the linked Supabase project: apply migrations, load `supabase/seed.sql`, configure admin credentials, and verify real reads/writes outside the fixture fallback path.

## Goal

Build the content backend foundation:

- move current seed content into PostgreSQL;
- read public content from Supabase through a typed query layer;
- protect editorial routes;
- add admin-only editing forms for sources, claims, events, anecdotes, and translations;
- keep public readers limited to published content while showing trust status separately.

## Phase 1: Seed Current Content Into PostgreSQL

Move the current fixture anecdotes into the database model.

Status: implemented as `supabase/seed.sql`; needs execution against the linked Supabase project.

Required records:

- `sources`
- `events`
- `anecdotes`
- `anecdote_translations`
- `claims`
- `claim_sources`
- `connections`
- relevant `entities` and `entity_translations`

Acceptance criteria:

- Current six anecdote fixtures have equivalent database records.
- English and Simplified Chinese text are stored as translations tied to canonical records.
- Claims are separated from prose sections.
- Sources are attached through `claim_sources`, not only copied into text.
- Seed process is repeatable in local development.

## Phase 2: Add Database Query Layer

Create server-side content query helpers that return public DTOs for the UI.

Status: implemented in `apps/web/src/lib/content/public.ts` with fixture fallback.

Required helpers:

- list published public anecdotes by locale;
- fetch one published public anecdote by slug and locale;
- list public anecdote slugs;
- list public tags;
- filter public anecdotes by tag;
- apply locale fallback where needed.

Acceptance criteria:

- UI-facing types remain stable or are deliberately migrated.
- Query helpers do not expose draft/review-only content to public pages.
- Existing public content tests are adapted to the database-backed query layer.

## Phase 3: Replace Fixture-Backed API Reads

Update public API routes to read from the database query layer.

Status: implemented. API routes now await the public content boundary.

Routes:

- `GET /api/content/anecdotes?locale=en`
- `GET /api/content/anecdotes/[slug]?locale=zh`

Acceptance criteria:

- API responses come from Supabase-backed content.
- Unknown slugs return `404`.
- Unsupported locales fall back to the default locale.
- API tests cover success, fallback, and missing-content behavior.

## Phase 4: Protect Editorial Access

Add admin-only protection before adding write workflows.

Status: implemented with `EDITORIAL_ADMIN_TOKEN` gate. Production should set the token.

Required work:

- choose Supabase Auth or a server-only admin gate;
- protect `/[locale]/editorial`;
- ensure anonymous users cannot access editorial data;
- prevent browser clients from using privileged write access.

Acceptance criteria:

- Public routes remain accessible.
- Editorial routes require admin access.
- Unauthorized access is redirected or rejected.
- No service-role secret is exposed to the browser.

## Phase 5: Build Admin Editing Forms

Turn the editorial dashboard into a functional editor.

Status: initial forms implemented in the editorial route with protected server actions.

Initial forms:

- source create/edit form;
- anecdote create/edit form;
- translation edit form;
- claim create/edit form;
- claim-source attachment form;
- event create/edit form.

Acceptance criteria:

- Editors can create and update an anecdote with translations.
- Editors can attach sources to claims with support type.
- Editors can mark content review status.
- Validation prevents incomplete required records.
- Writes go through protected server-side code.

## Phase 6: Public Approval Rules

Make review status affect what public readers can see.

Status: implemented in RLS policies and public queries for published content.

Required behavior:

- public pages show all published content, including unverified, disputed, AI-assisted, or partially sourced posts;
- editorial dashboard can show draft, review, provisional, and rejected content;
- public API excludes editorial-only records;
- source warnings and evidence levels remain visible where appropriate.

Acceptance criteria:

- Draft content does not appear in public API responses.
- Review/provisional content can be inspected in the editorial dashboard.
- Tests cover public/editorial visibility separation.

## Phase 7: Verification

Required checks:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Additional checks:

- verify Supabase migration applies cleanly;
- verify seed data can be loaded repeatedly in local development;
- verify public pages render from database content;
- verify admin-only write paths cannot be called anonymously.

Operational checks still required against the live/local Supabase instance:

```bash
supabase db push
supabase db reset
```

Then configure:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
EDITORIAL_ADMIN_TOKEN=...
```

## Completion Criteria

Milestone 3 is complete when:

- PostgreSQL is the source of truth for public anecdotes and related evidence;
- public content APIs read from the database;
- sources, claims, events, anecdotes, and translations are represented in live data;
- editorial routes are admin-protected;
- editors can create/update core content records through forms;
- public readers only see published content;
- lint, typecheck, tests, and build pass.
