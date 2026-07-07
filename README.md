# Beatles Story

A multilingual storytelling website for newcomers to the Beatles. The product is intentionally not a comprehensive encyclopedia; it is a quick, compelling introduction to the Beatles, John and Paul's partnership, McLennon as an interpretive lens, and memorable anecdotes or hidden historical connections.

## Current Stage

Beatles Story is in the fixture-backed MVP prototype stage.

The web app currently uses typed static content fixtures for the public reader experience. This keeps the story structure, localization model, and UI surfaces testable while the database, editorial workflow, ingestion, and AI-assisted drafting pipelines remain under construction.

Implemented public surfaces include:

- localized English and Simplified Chinese routes;
- a content-driven homepage;
- guided "Start with the Beatles" and "Start with John and Paul" hooks;
- an anecdote collection and individual anecdote pages backed by seed fixtures;
- basic timeline and editorial placeholder routes;
- public anecdote API route handlers over the current seed content;
- content fixture tests and route/content boundary tests.

The database schema and shared TypeScript database types are present, but the public UI is not yet reading live Supabase content.

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

The executable migration is:

```text
supabase/migrations/20260707000000_initial_content_schema.sql
```

## Notes

- Application database reads, public read policies, admin auth, ingestion jobs, and AI integrations are intentionally not wired into the public UI yet.
- Several reader-facing quotes in the guided hook drafts are marked for source and wording verification before publication.
- Chinese guided hook pages currently preserve the route and chapter structure; full Chinese long-form translations still need an editorial pass.

## Web App Notes

See `apps/web/README.md` for frontend implementation notes.
