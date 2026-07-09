# Milestone 4 Plan: Tumblr Ingestion

## Current Status

Milestone 3 is complete. The public site now reads published content from Supabase, keeps draft and hidden content private, and separates publication status from trust status.

Milestone 4 starts the ingestion pipeline. The first implementation target is the Tumblr collector. The collector gathers raw Tumblr posts into the existing `sources` and `raw_documents` tables without creating public anecdotes automatically.

Task 11 is implemented in code. Raw Tumblr imports can be reviewed in the admin-only ingestion queue with `new`, `reviewing`, `approved_for_conversion`, `ignored`, and `converted` statuses. Live Tumblr API verification still requires a real `TUMBLR_API_KEY` and at least one curated source in `services/ingestion/src/config/tumblr-sources.ts`.

## Goal

Build a safe, review-first Tumblr ingestion path:

- collect posts from a small curated list of Tumblr blogs;
- preserve source metadata and reblog context;
- store raw documents in Supabase for editorial review;
- let admins triage raw imports before any drafting work;
- support incremental fetching with checkpoints;
- avoid treating reblogs as independent historical sources unless they add meaningful commentary;
- keep all collected material private until reviewed.

## Non-Goals

Do not add these in this task:

- automatic public publishing;
- AI-written anecdotes;
- automatic conversion from raw Tumblr posts into publishable anecdotes;
- automatic evidence classification;
- translation generation;
- public search over raw documents;
- crawler discovery of arbitrary Tumblr blogs.

Those belong to later processing and drafting tasks.

## Source Inputs

Create a curated source registry for three to five Tumblr blogs.

Each source should include:

- blog identifier, such as `example.tumblr.com`;
- display title;
- source type: `tumblr`;
- reliability tier;
- rights notes;
- enabled/disabled flag;
- optional fetch limit.

The registry should be checked into the repo only if it contains public blog names and no secrets.

Secrets must stay in local or deployment environment variables:

```bash
TUMBLR_API_KEY=...
NEXT_PUBLIC_SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
```

## Data Captured

For each Tumblr post, collect and preserve:

- Tumblr post ID;
- blog name;
- original poster;
- reblog chain;
- post date;
- tags;
- text content;
- image metadata;
- source links;
- notes count, when available;
- fetched timestamp.

Store the canonical raw text and normalized text in `raw_documents`.

Store provider-specific details in `raw_documents.metadata`, for example:

```json
{
  "provider": "tumblr",
  "tumblrPostId": "123",
  "blogName": "example",
  "originalPoster": "example",
  "reblogChain": ["root-blog", "source-blog", "example"],
  "tags": ["beatles", "paul mccartney"],
  "imageMetadata": [],
  "sourceLinks": [],
  "notesCount": 42,
  "addsReblogCommentary": true
}
```

## Database Mapping

Use the existing schema plus the raw-document review workflow migration.

`sources`:

- one source record per Tumblr blog;
- `source_type = 'tumblr'`;
- `url = https://{blog}.tumblr.com`;
- `reliability_tier` should default conservatively.

`raw_documents`:

- `source_id`: Tumblr blog source row;
- `external_id`: Tumblr post ID;
- `raw_text`: collected post text;
- `normalized_text`: stripped and whitespace-normalized text;
- `original_url`: Tumblr post URL;
- `published_at`: Tumblr post date;
- `fetched_at`: collection timestamp;
- `content_hash`: stable hash for exact duplicate detection;
- `metadata`: Tumblr-specific fields.
- `review_status`: private editorial status, defaulting to `new`;
- `review_notes`: private editorial notes for triage.

The collector should upsert by `(source_id, external_id)` and keep `content_hash` stable for exact duplicate detection.

## Editorial Review

Raw Tumblr imports remain private. Admins review them at:

```text
/en/editorial/ingestion
/zh/editorial/ingestion
```

Review statuses mean:

- `new`: imported and not reviewed yet;
- `reviewing`: worth closer editorial review;
- `approved_for_conversion`: worth turning into a draft anecdote later;
- `ignored`: not useful for the project;
- `converted`: already handled by a later draft/anecdote workflow.

The current workflow does not create anecdotes. A later conversion task should create draft anecdotes only, with conservative defaults such as `publication_status = 'draft'`, `verification_status = 'unverified'`, and a source status based on the available evidence.

## Collector Behavior

The collector should support:

- fetching one blog at a time;
- `limit` with a safe maximum;
- `before` or equivalent checkpoint-based incremental fetch;
- dry-run output as JSONL;
- optional Supabase write mode;
- clear error messages for missing API keys or failed Tumblr responses.

Default behavior should be conservative:

- dry run unless write mode is explicitly requested;
- collect raw documents only;
- do not create events, claims, anecdotes, or translations.

## Checkpoints

For each blog, store or output:

- blog identifier;
- fetched timestamp;
- newest Tumblr timestamp seen;
- oldest Tumblr timestamp seen;
- next `before` value;
- returned post count.

Initial implementation can write checkpoints to a JSON file. Later, checkpoints can move to an `ingestion_runs` or `ingestion_checkpoints` table if needed.

## Reblog Rules

Reblog handling should be explicit:

- preserve the full reblog chain in metadata;
- preserve root/source links when Tumblr provides them;
- mark whether the reblog adds commentary;
- do not count a plain reblog as a separate historical source;
- only later processing should decide whether commentary contains a useful claim.

## Tests

Unit tests should cover:

- normalizing a text post;
- stripping simple HTML;
- preserving tags and note count;
- extracting image metadata;
- extracting reblog chain;
- detecting added reblog commentary;
- producing a stable content hash;
- producing a raw document insert shape without exposing public content.

Integration tests should be optional and disabled by default because they require a Tumblr API key and network access.

## Commands

Expected local commands after implementation:

```bash
pnpm --filter @beatles-story/ingestion test
pnpm --filter @beatles-story/ingestion typecheck
pnpm --filter @beatles-story/ingestion collect:tumblr -- --blog example.tumblr.com --limit 10 --out tmp/tumblr.jsonl
```

Expected write-mode command:

```bash
pnpm --filter @beatles-story/ingestion collect:tumblr -- --blog example.tumblr.com --limit 10 --write-supabase
```

## Verification Checklist

Task 11 is complete when:

- the collector can fetch Tumblr posts from a configured blog;
- dry-run JSONL contains the required raw metadata;
- Supabase write mode creates or reuses the Tumblr source row;
- `raw_documents` receives the collected post rows;
- repeated runs do not duplicate the same Tumblr post;
- checkpoints are produced for incremental fetches;
- raw documents remain private under RLS;
- lint, typecheck, and tests pass.

## Follow-Up Tasks

After the collector:

- add source registry management;
- add exact duplicate reports;
- add Tumblr normalization summaries for editors;
- add ingestion logs;
- add relevance classification;
- add event/claim extraction;
- add anecdote draft proposals for human review.
