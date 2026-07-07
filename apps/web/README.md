# Web App

Next.js App Router application for the multilingual Beatles storytelling site.

## Current Stage

The web app is in the content-backend verification stage.

Reader-facing pages use the public content boundary. That boundary reads published Supabase content when database environment variables are configured and falls back to typed fixtures in local development and tests.

Public reads are based on `publication_status = published`. Verification, source coverage, AI assistance, and translation quality are separate trust signals and render as compact badges on anecdote cards and detail pages.

## Implemented Surfaces

- `src/app/[locale]/page.tsx` renders the localized homepage from `src/content/home.ts`.
- `src/app/[locale]/start/page.tsx` renders the "Start with the Beatles" guided hook from `src/content/story-pages.ts`.
- `src/app/[locale]/john-and-paul/page.tsx` renders the "Start with John and Paul" guided hook from `src/content/story-pages.ts`.
- `src/app/[locale]/anecdotes/page.tsx` and `src/app/[locale]/anecdotes/[slug]/page.tsx` render anecdote content through the public content boundary.
- `src/app/[locale]/timeline/page.tsx` is present as an early placeholder route.
- `src/app/[locale]/editorial/page.tsx` is an admin-gated editorial dashboard with server-action forms.
- `src/app/api/content/anecdotes/route.ts` and `src/app/api/content/anecdotes/[slug]/route.ts` expose public anecdote content over HTTP.

## Content Fixtures

Homepage fixture data lives in:

```text
src/content/home.ts
```

Guided story page fixture data lives in:

```text
src/content/story-pages.ts
```

Anecdote fixture fallback content lives in:

```text
src/content/anecdotes.ts
```

Public-facing components and route handlers should use the boundary in:

```text
src/lib/content/public.ts
```

Do not import anecdote fixtures directly from pages or API handlers outside fixture tests.

## Backend Configuration

Public database reads require:

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
```

Editorial writes require:

```bash
SUPABASE_SERVICE_ROLE_KEY=...
EDITORIAL_ADMIN_TOKEN=...
```

If `EDITORIAL_ADMIN_TOKEN` is set, `/[locale]/editorial` requires an `editorial_admin_token` cookie or `x-editorial-admin-token` header with the matching value. If the token is not set, editorial access stays open for local development.

## Localization

The app supports English and Simplified Chinese routes through `next-intl` routing:

```text
/en
/zh
```

The homepage, navigation, and guided hook pages have localized English and Simplified Chinese content. The guided hooks are still first drafts and need a later editorial/source-verification pass.

## Evidence Model

The story pages are designed to keep narrative flow and evidence boundaries visible at the same time.

For public anecdotes, the current backend tracks:

- `publication_status`: `draft`, `published`, `hidden`;
- `verification_status`: `human_verified`, `unverified`, `disputed`;
- `ai_assisted`;
- `source_status`: `fully_sourced`, `partially_sourced`, `unsourced`;
- translation status: `human_translated`, `machine_translated`, `needs_review`.

If a requested locale is missing, the public boundary falls back to English and marks the result as an untranslated fallback.

The "Start with John and Paul" page supports chapter-level evidence groups for:

- documented claims;
- reasonable inferences;
- debated interpretations.

Some quotations in the current guided drafts are intentionally marked for wording/source verification before publication.

## Tests

Current frontend tests cover:

- homepage fixture coverage;
- guided story page fixture coverage;
- anecdote fixture behavior;
- public content boundary behavior;
- database-backed content fallback behavior;
- route helpers.

Relevant test files include:

```text
src/content/home.test.ts
src/content/story-pages.test.ts
src/content/anecdotes.test.ts
src/lib/content/public.test.ts
src/lib/routes.test.ts
```

## Commands

From the repo root, using the project environment described in the root README:

```bash
pnpm test
pnpm typecheck
pnpm lint
pnpm format:check
pnpm build
```
