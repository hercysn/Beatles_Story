# Beatles Story

A multilingual storytelling website for newcomers to the Beatles. The product is intentionally not a comprehensive encyclopedia; it is a quick, compelling introduction to the Beatles, John and Paul's partnership, McLennon as an interpretive lens, and memorable anecdotes or hidden historical connections.

## Current Stage

Beatles Story is in the content-backend verification stage.

The static prototype is complete. The app now has a Supabase-capable content backend: public content reads use the database when Supabase environment variables are configured and fall back to typed fixtures for local development and tests. The editorial dashboard is protected by an admin gate and includes server-action forms for core content records.

Public visibility is separate from trust. Published content is visible even when it is unverified, disputed, AI-assisted, or partially sourced; those trust states are shown as compact reader-facing badges.

Implemented public surfaces include:

- localized English and Simplified Chinese routes;
- a content-driven homepage;
- guided "Start with the Beatles" and "Start with John and Paul" hooks;
- an anecdote collection and individual anecdote pages backed by the public content boundary;
- basic timeline and editorial routes;
- public anecdote API route handlers over database-backed content with fixture fallback;
- content fixture tests and route/content boundary tests.

The remaining content-backend work is mainly production hardening: apply migrations and seed data to the linked Supabase project, configure admin credentials, and verify real database reads/writes outside the fixture fallback path.

## Project Structure

- `apps/web` - Next.js App Router website with English and Simplified Chinese routes.
- `services/api` - Reserved for future API service code.
- `services/ingestion` - Reserved for future content ingestion workflows.
- `services/processing` - Reserved for future processing pipelines.
- `database` - Database design notes and schema documentation.
- `packages/shared-types` - Shared TypeScript types, including database row/insert/update types.
- `packages/content-schemas` - Content validation schemas.
- `packages/prompts` - Prompt assets for future AI-assisted workflows.
- `packages/terminology` - Shared terminology and translation guidance.
- `supabase/migrations` - Supabase/PostgreSQL schema migrations.

## Local Development

Use a project-local Conda environment so Node.js and pnpm do not need to be installed globally. The environment lives in `.conda/`, which is ignored by git.

Create and activate the environment:

```bash
conda env create -p ./.conda -f environment.yml
conda activate ./.conda
```

Install pnpm inside the active project environment:

```bash
npm install -g pnpm@9.15.9
```

Confirm the local tools:

```bash
node --version
pnpm --version
```

Install dependencies from the lockfile. The pnpm package store is configured in `.npmrc` to stay local to this repo at `.pnpm-store/`.

```bash
pnpm install
```

Run the web app:

```bash
pnpm dev
```

The app will be available at `http://localhost:3000/en` and `http://localhost:3000/zh`.

## Quality Checks

Run these from the activated project environment:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm format:check
pnpm build
```

## Database Schema

See `database/README.md` for schema design notes, migration details, and the current database integration stage.

The executable migrations are:

```text
supabase/migrations/20260707000000_initial_content_schema.sql
supabase/migrations/20260707010000_content_backend_policies.sql
supabase/migrations/20260707011000_public_content_fields.sql
supabase/migrations/20260707012000_publication_trust_statuses.sql
```

## Notes

- Ingestion jobs and AI integrations are intentionally not wired into the public UI yet.
- Supabase-backed reads require `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
- Editorial writes require `SUPABASE_SERVICE_ROLE_KEY`; production editorial access should also set `EDITORIAL_ADMIN_TOKEN`.
- Several reader-facing quotes in the guided hook drafts are marked for source and wording verification before publication.
- English and Chinese guided hook pages now have first-draft long-form content; both still need a later editorial/source-verification pass.

## Web App Notes

See `apps/web/README.md` for frontend implementation notes.
