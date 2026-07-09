# Ingestion Service

The ingestion service collects private raw material for editorial review. It does not publish content.

## Tumblr Collector

Task 11 starts with a Tumblr collector that maps posts into the existing `sources` and `raw_documents` tables.

Required environment variables:

```bash
TUMBLR_API_KEY=...
NEXT_PUBLIC_SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
```

The CLI automatically loads these from `services/ingestion/.env.local` when run through the package script. Shell environment variables still take precedence.

Dry-run JSONL output:

```bash
pnpm --filter @beatles-story/ingestion collect:tumblr -- --blog beatles-mclennon --limit 10 --out tmp/tumblr.jsonl --checkpoint-out tmp/tumblr-checkpoint.json
```

Single-post dry run:

```bash
pnpm --filter @beatles-story/ingestion collect:tumblr -- --post-url https://www.tumblr.com/beatles-mclennon/77371949675/mclennon --out tmp/tumblr.jsonl --checkpoint-out tmp/tumblr-checkpoint.json
```

Write to Supabase:

```bash
pnpm --filter @beatles-story/ingestion collect:tumblr -- --blog beatles-mclennon --limit 10 --write-supabase

pnpm --filter @beatles-story/ingestion collect:tumblr -- --post-url https://www.tumblr.com/beatles-mclennon/77371949675/mclennon --write-supabase
```

`--blog` accepts a plain blog name, a `{blog}.tumblr.com` domain, or a `tumblr.com/{blog}/...` post URL. These forms normalize to the same blog feed. Use `--post-url` when you want exactly one post.

The collector stores:

- Tumblr post ID;
- blog name;
- original poster;
- reblog chain;
- post date;
- tags;
- normalized text;
- image metadata;
- source links;
- note count;
- fetched timestamp.

Reblog metadata is preserved, but reblogs are not treated as independent historical sources unless later review finds meaningful commentary.

Collected raw documents can be reviewed in the admin-only website queue:

```text
/en/editorial/ingestion
/zh/editorial/ingestion
```

The queue supports private editorial triage statuses: `new`, `reviewing`, `approved_for_conversion`, `ignored`, and `converted`. It does not convert raw Tumblr posts into public anecdotes.

Curated blog configuration starts in:

```text
src/config/tumblr-sources.ts
```

Keep API keys and Supabase service-role credentials in environment variables, not in this registry.
