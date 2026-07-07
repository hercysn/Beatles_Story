import type {
  AnecdoteInsert,
  InsertFor,
  RowFor,
  SourceInsert,
} from "./database";

const sourceInsert: SourceInsert = {
  title: "The Beatles Anthology",
  source_type: "official",
  reliability_tier: 1,
  author: null,
  publisher: null,
  url: null,
  publication_date: null,
  original_language: "en",
  rights_notes: null,
};

const anecdoteInsert: AnecdoteInsert = {
  slug: "john-and-paul-demo",
  evidence_level: "documented",
};

const eventRow: RowFor<"events"> = {
  id: "00000000-0000-0000-0000-000000000000",
  event_type: "recording_session",
  start_date: "1966-04-06",
  end_date: null,
  date_precision: "exact",
  location_id: null,
  confidence: 0.9,
  review_status: "draft",
  metadata: {},
  created_at: "2026-07-07T00:00:00.000Z",
  updated_at: "2026-07-07T00:00:00.000Z",
};

const claimInsert: InsertFor<"claims"> = {
  anecdote_id: "00000000-0000-0000-0000-000000000000",
  claim_type: "fact",
  claim_text: "A documented claim.",
};

const invalidSource: SourceInsert = {
  ...sourceInsert,
  // @ts-expect-error source_type must match the database enum.
  source_type: "podcast",
};

const invalidEvent: RowFor<"events"> = {
  ...eventRow,
  // @ts-expect-error date_precision must match the database enum.
  date_precision: "day",
};

// @ts-expect-error anecdote slug is required for inserts.
const invalidAnecdote: AnecdoteInsert = {
  evidence_level: "documented",
};

// @ts-expect-error claims must attach to exactly one parent.
const invalidClaim: InsertFor<"claims"> = {
  anecdote_id: "00000000-0000-0000-0000-000000000000",
  event_id: "00000000-0000-0000-0000-000000000000",
  claim_type: "fact",
  claim_text: "A claim with two parents.",
};

void sourceInsert;
void anecdoteInsert;
void eventRow;
void claimInsert;
void invalidSource;
void invalidEvent;
void invalidAnecdote;
void invalidClaim;
