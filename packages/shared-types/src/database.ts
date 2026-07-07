export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Uuid = string;
export type DateString = string;
export type TimestampString = string;

export type SourceType =
  | "primary"
  | "official"
  | "book"
  | "interview"
  | "article"
  | "tumblr"
  | "fan-research"
  | "other";

export type DatePrecision =
  "exact" | "month" | "year" | "approximate" | "range" | "disputed";

export type ReviewStatus = "draft" | "review" | "approved" | "rejected";

export type EvidenceLevel =
  | "documented"
  | "corroborated"
  | "single-recollection"
  | "disputed"
  | "interpretive"
  | "fandom-theory";

export type SupportType = "supports" | "contradicts" | "context" | "mentions";

export type ClaimType =
  "fact" | "recollection" | "interpretation" | "disputed" | "theory";

export type ConnectionEntityType =
  "event" | "anecdote" | "person" | "song" | "place";

export type ConnectionType =
  | "chronological"
  | "thematic"
  | "quoted-reference"
  | "possible-allusion"
  | "shared-place"
  | "shared-language"
  | "interpretive";

export type ContentLocale = "en" | "zh-CN";

export type TranslationStatus =
  "draft" | "machine-translated" | "reviewed" | "approved";

export type EntityType = "person" | "song" | "place";

export type Source = {
  id: Uuid;
  title: string;
  source_type: SourceType;
  author: string | null;
  publisher: string | null;
  url: string | null;
  publication_date: string | null;
  original_language: string | null;
  reliability_tier: number;
  rights_notes: string | null;
  created_at: TimestampString;
  updated_at: TimestampString;
};

export type RawDocument = {
  id: Uuid;
  source_id: Uuid;
  external_id: string | null;
  raw_text: string;
  normalized_text: string | null;
  original_url: string;
  published_at: TimestampString | null;
  fetched_at: TimestampString;
  content_hash: string;
  language: string | null;
  metadata: Json;
  created_at: TimestampString;
  updated_at: TimestampString;
};

export type Entity = {
  id: Uuid;
  entity_type: EntityType;
  slug: string;
  canonical_name: string;
  aliases: string[];
  metadata: Json;
  created_at: TimestampString;
  updated_at: TimestampString;
};

export type EntityTranslation = {
  id: Uuid;
  entity_id: Uuid;
  locale: ContentLocale;
  display_name: string;
  description: string | null;
  created_at: TimestampString;
  updated_at: TimestampString;
};

export type Event = {
  id: Uuid;
  event_type: string;
  start_date: DateString | null;
  end_date: DateString | null;
  date_precision: DatePrecision;
  location_id: Uuid | null;
  confidence: number;
  review_status: ReviewStatus;
  metadata: Json;
  created_at: TimestampString;
  updated_at: TimestampString;
};

export type Anecdote = {
  id: Uuid;
  slug: string;
  primary_event_id: Uuid | null;
  evidence_level: EvidenceLevel;
  tone_tags: string[];
  beginner_priority: number;
  confidence: number;
  review_status: ReviewStatus;
  created_at: TimestampString;
  updated_at: TimestampString;
};

export type AnecdoteTranslation = {
  id: Uuid;
  anecdote_id: Uuid;
  locale: ContentLocale;
  title: string;
  hook: string;
  what_happened: string;
  why_interesting: string;
  historical_context: string | null;
  documented_section: string;
  interpretation_section: string | null;
  translation_status: TranslationStatus;
  created_at: TimestampString;
  updated_at: TimestampString;
};

export type Claim = {
  id: Uuid;
  anecdote_id: Uuid | null;
  event_id: Uuid | null;
  claim_type: ClaimType;
  claim_text: string;
  confidence: number;
  review_status: ReviewStatus;
  created_at: TimestampString;
  updated_at: TimestampString;
};

export type ClaimSource = {
  claim_id: Uuid;
  source_id: Uuid;
  source_excerpt: string | null;
  support_type: SupportType;
  created_at: TimestampString;
};

export type Connection = {
  id: Uuid;
  from_type: ConnectionEntityType;
  from_id: Uuid;
  to_type: ConnectionEntityType;
  to_id: Uuid;
  connection_type: ConnectionType;
  confidence: number;
  review_status: ReviewStatus;
  created_at: TimestampString;
  updated_at: TimestampString;
};

export type TableName =
  | "sources"
  | "raw_documents"
  | "entities"
  | "entity_translations"
  | "events"
  | "anecdotes"
  | "anecdote_translations"
  | "claims"
  | "claim_sources"
  | "connections";

type GeneratedColumns = "id" | "created_at" | "updated_at";

type InsertDefaults =
  | "fetched_at"
  | "metadata"
  | "aliases"
  | "confidence"
  | "review_status"
  | "tone_tags"
  | "beginner_priority"
  | "translation_status";

type InsertShape<Row, Optional extends keyof Row = never> = Omit<
  Row,
  GeneratedColumns | Optional
> &
  Partial<Pick<Row, Extract<GeneratedColumns | Optional, keyof Row>>>;

export type SourceInsert = InsertShape<Source>;
export type RawDocumentInsert = InsertShape<
  RawDocument,
  | "external_id"
  | "normalized_text"
  | "published_at"
  | "fetched_at"
  | "language"
  | "metadata"
>;
export type EntityInsert = InsertShape<Entity, "aliases" | "metadata">;
export type EntityTranslationInsert = InsertShape<
  EntityTranslation,
  "description"
>;
export type EventInsert = InsertShape<
  Event,
  | "start_date"
  | "end_date"
  | "location_id"
  | "confidence"
  | "review_status"
  | "metadata"
>;
export type AnecdoteInsert = InsertShape<
  Anecdote,
  | "primary_event_id"
  | "tone_tags"
  | "beginner_priority"
  | "confidence"
  | "review_status"
>;
export type AnecdoteTranslationInsert = InsertShape<
  AnecdoteTranslation,
  "historical_context" | "interpretation_section" | "translation_status"
>;
export type ClaimInsert = InsertShape<
  Claim,
  "anecdote_id" | "event_id" | "confidence" | "review_status"
>;
export type ClaimSourceInsert = ClaimSource;
export type ConnectionInsert = InsertShape<
  Connection,
  "confidence" | "review_status"
>;

export type SourceUpdate = Partial<SourceInsert>;
export type RawDocumentUpdate = Partial<RawDocumentInsert>;
export type EntityUpdate = Partial<EntityInsert>;
export type EntityTranslationUpdate = Partial<EntityTranslationInsert>;
export type EventUpdate = Partial<EventInsert>;
export type AnecdoteUpdate = Partial<AnecdoteInsert>;
export type AnecdoteTranslationUpdate = Partial<AnecdoteTranslationInsert>;
export type ClaimUpdate = Partial<ClaimInsert>;
export type ClaimSourceUpdate = Partial<ClaimSourceInsert>;
export type ConnectionUpdate = Partial<ConnectionInsert>;

export type Database = {
  public: {
    Tables: {
      sources: {
        Row: Source;
        Insert: SourceInsert;
        Update: SourceUpdate;
      };
      raw_documents: {
        Row: RawDocument;
        Insert: RawDocumentInsert;
        Update: RawDocumentUpdate;
      };
      entities: {
        Row: Entity;
        Insert: EntityInsert;
        Update: EntityUpdate;
      };
      entity_translations: {
        Row: EntityTranslation;
        Insert: EntityTranslationInsert;
        Update: EntityTranslationUpdate;
      };
      events: {
        Row: Event;
        Insert: EventInsert;
        Update: EventUpdate;
      };
      anecdotes: {
        Row: Anecdote;
        Insert: AnecdoteInsert;
        Update: AnecdoteUpdate;
      };
      anecdote_translations: {
        Row: AnecdoteTranslation;
        Insert: AnecdoteTranslationInsert;
        Update: AnecdoteTranslationUpdate;
      };
      claims: {
        Row: Claim;
        Insert: ClaimInsert;
        Update: ClaimUpdate;
      };
      claim_sources: {
        Row: ClaimSource;
        Insert: ClaimSourceInsert;
        Update: ClaimSourceUpdate;
      };
      connections: {
        Row: Connection;
        Insert: ConnectionInsert;
        Update: ConnectionUpdate;
      };
    };
    Enums: {
      source_type: SourceType;
      date_precision: DatePrecision;
      review_status: ReviewStatus;
      evidence_level: EvidenceLevel;
      support_type: SupportType;
      claim_type: ClaimType;
      connection_entity_type: ConnectionEntityType;
      connection_type: ConnectionType;
      content_locale: ContentLocale;
      translation_status: TranslationStatus;
      entity_type: EntityType;
    };
  };
};

export type RowFor<Table extends TableName> =
  Database["public"]["Tables"][Table]["Row"];
export type InsertFor<Table extends TableName> =
  Database["public"]["Tables"][Table]["Insert"];
export type UpdateFor<Table extends TableName> =
  Database["public"]["Tables"][Table]["Update"];
