# Beatles Story

A multilingual storytelling website for newcomers to the Beatles. The product is intentionally not a comprehensive encyclopedia; it is a quick, compelling introduction to the Beatles, John and Paul's partnership, McLennon as an interpretive lens, and memorable anecdotes or hidden historical connections.

## Project Structure

- `apps/web` - Next.js App Router website with English and Simplified Chinese routes.
- `services/api` - Reserved for future API service code.
- `services/ingestion` - Reserved for future content ingestion workflows.
- `services/processing` - Reserved for future processing pipelines.
- `database` - Database design notes and schema documentation.
- `packages/shared-types` - Shared TypeScript types and utilities.
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

See `database/README.md` for the schema design notes and Task 3 implementation summary.

The executable migration is:

```text
supabase/migrations/20260707000000_initial_content_schema.sql
```

## Notes

Application database integration and AI integrations are intentionally not included yet.
