# Web App

Next.js App Router application for the multilingual Beatles storytelling site.

## Current Stage

The web app is in the fixture-backed MVP prototype stage.

Reader-facing pages are rendered from typed static fixtures and seed content. This lets the site prove the story structure, localization boundaries, and evidence-label approach before the UI moves to live Supabase reads.

## Implemented Surfaces

- `src/app/[locale]/page.tsx` renders the localized homepage from `src/content/home.ts`.
- `src/app/[locale]/start/page.tsx` renders the "Start with the Beatles" guided hook from `src/content/story-pages.ts`.
- `src/app/[locale]/john-and-paul/page.tsx` renders the "Start with John and Paul" guided hook from `src/content/story-pages.ts`.
- `src/app/[locale]/anecdotes/page.tsx` and `src/app/[locale]/anecdotes/[slug]/page.tsx` render seed anecdote content through the public content boundary.
- `src/app/[locale]/timeline/page.tsx` and `src/app/[locale]/editorial/page.tsx` are present as early placeholder routes.
- `src/app/api/content/anecdotes/route.ts` and `src/app/api/content/anecdotes/[slug]/route.ts` expose the current public anecdote seed content over HTTP.

## Content Fixtures

Homepage fixture data lives in:

```text
src/content/home.ts
```

Guided story page fixture data lives in:

```text
src/content/story-pages.ts
```

Anecdote seed content lives in:

```text
src/content/anecdotes.ts
```

Public-facing components and route handlers should use the boundary in:

```text
src/lib/content/public.ts
```

Do not import anecdote fixtures directly from pages or API handlers outside fixture tests.

## Localization

The app supports English and Simplified Chinese routes through `next-intl` routing:

```text
/en
/zh
```

The homepage and navigation have localized content. The guided hook pages have full English draft content and Chinese structural placeholders pending a full translation pass.

## Evidence Model

The story pages are designed to keep narrative flow and evidence boundaries visible at the same time.

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
