# Public Content API

The public content API is the read boundary between the website and the current
seed fixtures.

Use `src/lib/content/public.ts` from pages, route handlers, and components. Do
not import public-facing content directly from `src/content/anecdotes.ts` outside
fixture tests.

Current functions:

- `getPublicAnecdoteCollection(locale)` returns localized labels and anecdotes.
- `getPublicAnecdotes(locale)` returns localized anecdotes only.
- `getPublicAnecdote(locale, slug)` returns one localized anecdote or `undefined`.
- `getPublicAnecdoteSlugs()` returns canonical slugs for static route generation.

Public HTTP endpoints:

- `GET /api/content/anecdotes?locale=en`
- `GET /api/content/anecdotes/[slug]?locale=zh`

Unsupported locales fall back to the default locale. Unknown anecdote slugs
return `404`.
