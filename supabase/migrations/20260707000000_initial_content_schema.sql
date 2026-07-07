create extension if not exists pgcrypto;

create type public.source_type as enum (
  'primary',
  'official',
  'book',
  'interview',
  'article',
  'tumblr',
  'fan-research',
  'other'
);

create type public.date_precision as enum (
  'exact',
  'month',
  'year',
  'approximate',
  'range',
  'disputed'
);

create type public.review_status as enum (
  'draft',
  'review',
  'approved',
  'rejected'
);

create type public.evidence_level as enum (
  'documented',
  'corroborated',
  'single-recollection',
  'disputed',
  'interpretive',
  'fandom-theory'
);

create type public.support_type as enum (
  'supports',
  'contradicts',
  'context',
  'mentions'
);

create type public.claim_type as enum (
  'fact',
  'recollection',
  'interpretation',
  'disputed',
  'theory'
);

create type public.connection_entity_type as enum (
  'event',
  'anecdote',
  'person',
  'song',
  'place'
);

create type public.connection_type as enum (
  'chronological',
  'thematic',
  'quoted-reference',
  'possible-allusion',
  'shared-place',
  'shared-language',
  'interpretive'
);

create type public.content_locale as enum (
  'en',
  'zh-CN'
);

create type public.translation_status as enum (
  'draft',
  'machine-translated',
  'reviewed',
  'approved'
);

create type public.entity_type as enum (
  'person',
  'song',
  'place'
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.validate_event_location()
returns trigger
language plpgsql
as $$
begin
  if new.location_id is not null and not exists (
    select 1
    from public.entities
    where id = new.location_id
      and entity_type = 'place'
  ) then
    raise exception 'events.location_id must reference a place entity';
  end if;

  return new;
end;
$$;

create or replace function public.connection_endpoint_exists(
  endpoint_type public.connection_entity_type,
  endpoint_id uuid
)
returns boolean
language plpgsql
stable
as $$
begin
  case endpoint_type
    when 'event' then
      return exists (
        select 1
        from public.events
        where id = endpoint_id
      );
    when 'anecdote' then
      return exists (
        select 1
        from public.anecdotes
        where id = endpoint_id
      );
    when 'person' then
      return exists (
        select 1
        from public.entities
        where id = endpoint_id
          and entity_type = 'person'
      );
    when 'song' then
      return exists (
        select 1
        from public.entities
        where id = endpoint_id
          and entity_type = 'song'
      );
    when 'place' then
      return exists (
        select 1
        from public.entities
        where id = endpoint_id
          and entity_type = 'place'
      );
  end case;
end;
$$;

create or replace function public.validate_connection_endpoints()
returns trigger
language plpgsql
as $$
begin
  if not public.connection_endpoint_exists(new.from_type, new.from_id) then
    raise exception 'connections.from_id does not reference an existing %', new.from_type;
  end if;

  if not public.connection_endpoint_exists(new.to_type, new.to_id) then
    raise exception 'connections.to_id does not reference an existing %', new.to_type;
  end if;

  return new;
end;
$$;

create table public.sources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  source_type public.source_type not null,
  author text,
  publisher text,
  url text,
  publication_date text,
  original_language text,
  reliability_tier smallint not null,
  rights_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint sources_reliability_tier_check
    check (reliability_tier between 1 and 5),
  constraint sources_url_check
    check (url is null or url ~* '^https?://')
);

create table public.raw_documents (
  id uuid primary key default gen_random_uuid(),
  source_id uuid not null references public.sources(id) on delete cascade,
  external_id text,
  raw_text text not null,
  normalized_text text,
  original_url text not null,
  published_at timestamptz,
  fetched_at timestamptz not null default now(),
  content_hash text not null,
  language text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint raw_documents_original_url_check
    check (original_url ~* '^https?://'),
  constraint raw_documents_metadata_object_check
    check (jsonb_typeof(metadata) = 'object'),
  constraint raw_documents_source_external_id_unique
    unique (source_id, external_id),
  constraint raw_documents_content_hash_unique
    unique (content_hash)
);

create table public.entities (
  id uuid primary key default gen_random_uuid(),
  entity_type public.entity_type not null,
  slug text not null unique,
  canonical_name text not null,
  aliases text[] not null default '{}',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint entities_slug_check
    check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  constraint entities_metadata_object_check
    check (jsonb_typeof(metadata) = 'object')
);

create table public.entity_translations (
  id uuid primary key default gen_random_uuid(),
  entity_id uuid not null references public.entities(id) on delete cascade,
  locale public.content_locale not null,
  display_name text not null,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint entity_translations_entity_locale_unique
    unique (entity_id, locale)
);

create table public.events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,
  start_date date,
  end_date date,
  date_precision public.date_precision not null,
  location_id uuid references public.entities(id) on delete set null,
  confidence numeric(4, 3) not null default 0.500,
  review_status public.review_status not null default 'draft',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint events_confidence_check
    check (confidence >= 0 and confidence <= 1),
  constraint events_date_order_check
    check (end_date is null or start_date is null or end_date >= start_date),
  constraint events_metadata_object_check
    check (jsonb_typeof(metadata) = 'object')
);

create table public.anecdotes (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  primary_event_id uuid references public.events(id) on delete set null,
  evidence_level public.evidence_level not null,
  tone_tags text[] not null default '{}',
  beginner_priority smallint not null default 3,
  confidence numeric(4, 3) not null default 0.500,
  review_status public.review_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint anecdotes_slug_check
    check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  constraint anecdotes_beginner_priority_check
    check (beginner_priority between 1 and 5),
  constraint anecdotes_confidence_check
    check (confidence >= 0 and confidence <= 1)
);

create table public.anecdote_translations (
  id uuid primary key default gen_random_uuid(),
  anecdote_id uuid not null references public.anecdotes(id) on delete cascade,
  locale public.content_locale not null,
  title text not null,
  hook text not null,
  what_happened text not null,
  why_interesting text not null,
  historical_context text,
  documented_section text not null,
  interpretation_section text,
  translation_status public.translation_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint anecdote_translations_anecdote_locale_unique
    unique (anecdote_id, locale)
);

create table public.claims (
  id uuid primary key default gen_random_uuid(),
  anecdote_id uuid references public.anecdotes(id) on delete cascade,
  event_id uuid references public.events(id) on delete cascade,
  claim_type public.claim_type not null,
  claim_text text not null,
  confidence numeric(4, 3) not null default 0.500,
  review_status public.review_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint claims_parent_check
    check (num_nonnulls(anecdote_id, event_id) = 1),
  constraint claims_confidence_check
    check (confidence >= 0 and confidence <= 1)
);

create table public.claim_sources (
  claim_id uuid not null references public.claims(id) on delete cascade,
  source_id uuid not null references public.sources(id) on delete restrict,
  source_excerpt text,
  support_type public.support_type not null,
  created_at timestamptz not null default now(),
  primary key (claim_id, source_id, support_type)
);

create table public.connections (
  id uuid primary key default gen_random_uuid(),
  from_type public.connection_entity_type not null,
  from_id uuid not null,
  to_type public.connection_entity_type not null,
  to_id uuid not null,
  connection_type public.connection_type not null,
  confidence numeric(4, 3) not null default 0.500,
  review_status public.review_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint connections_not_self_check
    check (from_type <> to_type or from_id <> to_id),
  constraint connections_confidence_check
    check (confidence >= 0 and confidence <= 1)
);

create index sources_source_type_idx on public.sources(source_type);
create index sources_reliability_tier_idx on public.sources(reliability_tier);

create index raw_documents_source_id_idx on public.raw_documents(source_id);
create index raw_documents_fetched_at_idx on public.raw_documents(fetched_at);
create index raw_documents_metadata_gin_idx on public.raw_documents using gin(metadata);

create index entities_entity_type_idx on public.entities(entity_type);
create index entities_aliases_gin_idx on public.entities using gin(aliases);

create index events_start_date_idx on public.events(start_date);
create index events_review_status_idx on public.events(review_status);
create index events_location_id_idx on public.events(location_id);
create index events_metadata_gin_idx on public.events using gin(metadata);

create index anecdotes_primary_event_id_idx on public.anecdotes(primary_event_id);
create index anecdotes_review_status_idx on public.anecdotes(review_status);
create index anecdotes_beginner_priority_idx on public.anecdotes(beginner_priority);
create index anecdotes_tone_tags_gin_idx on public.anecdotes using gin(tone_tags);

create index anecdote_translations_locale_idx on public.anecdote_translations(locale);
create index anecdote_translations_translation_status_idx
  on public.anecdote_translations(translation_status);

create index claims_anecdote_id_idx on public.claims(anecdote_id);
create index claims_event_id_idx on public.claims(event_id);
create index claims_claim_type_idx on public.claims(claim_type);
create index claims_review_status_idx on public.claims(review_status);

create index claim_sources_source_id_idx on public.claim_sources(source_id);

create index connections_from_idx on public.connections(from_type, from_id);
create index connections_to_idx on public.connections(to_type, to_id);
create index connections_connection_type_idx on public.connections(connection_type);
create index connections_review_status_idx on public.connections(review_status);

create trigger sources_set_updated_at
before update on public.sources
for each row execute function public.set_updated_at();

create trigger raw_documents_set_updated_at
before update on public.raw_documents
for each row execute function public.set_updated_at();

create trigger entities_set_updated_at
before update on public.entities
for each row execute function public.set_updated_at();

create trigger entity_translations_set_updated_at
before update on public.entity_translations
for each row execute function public.set_updated_at();

create trigger events_set_updated_at
before update on public.events
for each row execute function public.set_updated_at();

create trigger events_validate_location
before insert or update of location_id on public.events
for each row execute function public.validate_event_location();

create trigger anecdotes_set_updated_at
before update on public.anecdotes
for each row execute function public.set_updated_at();

create trigger anecdote_translations_set_updated_at
before update on public.anecdote_translations
for each row execute function public.set_updated_at();

create trigger claims_set_updated_at
before update on public.claims
for each row execute function public.set_updated_at();

create trigger connections_set_updated_at
before update on public.connections
for each row execute function public.set_updated_at();

create trigger connections_validate_endpoints
before insert or update of from_type, from_id, to_type, to_id on public.connections
for each row execute function public.validate_connection_endpoints();
