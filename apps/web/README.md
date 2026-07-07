# Web App

Next.js App Router application for the multilingual Beatles storytelling site.

## Homepage Fixture Data

Task 5 builds the homepage from static fixture data instead of hardcoded JSX copy.

Fixture data lives in:

```text
apps/web/src/content/home.ts
```

The localized homepage route consumes that fixture here:

```text
apps/web/src/app/[locale]/page.tsx
```

The fixture currently provides English and Simplified Chinese content for:

- hero copy and primary actions;
- choosing a starting point;
- a featured overlooked moment;
- timeline turning points;
- John and Paul framing;
- song/place/relationship exploration;
- recently added discoveries;
- fact-versus-interpretation labels.

## Tests

Fixture coverage lives in:

```text
apps/web/src/content/home.test.ts
```

The tests verify:

- every configured app locale has homepage fixture data;
- primary homepage actions stay on expected site routes;
- all planned homepage sections have representative fixture content.

## Commands

From the repo root:

```bash
pnpm test
pnpm typecheck
pnpm lint
pnpm format:check
pnpm build
```

## Task 5 Summary

Implementation:

- Added typed static homepage fixture data.
- Rebuilt the localized homepage to render from that fixture.
- Kept locale-specific English and Simplified Chinese content.
- Added homepage sections from the product notes.

Changed files:

- `apps/web/src/content/home.ts`
- `apps/web/src/content/home.test.ts`
- `apps/web/src/app/[locale]/page.tsx`
- `apps/web/README.md`
- `README.md`
