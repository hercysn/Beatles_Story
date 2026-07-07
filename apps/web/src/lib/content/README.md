# Public Content Boundary

The public content boundary is the read boundary between public pages/API routes
and editorial content.

When Supabase public environment variables are configured, this boundary reads
published content from PostgreSQL. Without those variables, it falls back to the
typed fixture data in `src/content/anecdotes.ts` so local development and tests
remain deterministic.

Public visibility is based on `publication_status = published`. Trust and
translation fields are returned separately so pages can show compact badges for
human verification, disputed or unverified content, AI assistance, source
coverage, machine translation, and English fallback.

Use `src/lib/content/public.ts` from pages, route handlers, and components. Do
not import public-facing content directly from `src/content/anecdotes.ts` outside
fixture tests.

Current functions:

- `getPublicAnecdoteCollection(locale)` returns localized labels and anecdotes.
- `getPublicAnecdotes(locale)` returns localized anecdotes only.
- `getPublicAnecdote(locale, slug)` returns one localized anecdote or `undefined`.
- `getPublicAnecdoteSlugs()` returns canonical slugs for static route generation.
- `getPublicAnecdoteTags(locale)` returns concrete browse tags.
- `filterPublicAnecdotesByTag(locale, tag)` returns tag-filtered anecdotes.

All functions are asynchronous because they may read from Supabase.

Public HTTP endpoints:

- `GET /api/content/anecdotes?locale=en`
- `GET /api/content/anecdotes/[slug]?locale=zh`

Unsupported locales fall back to the default locale. Unknown anecdote slugs
return `404`.
