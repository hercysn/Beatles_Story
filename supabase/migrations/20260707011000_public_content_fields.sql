alter table public.anecdotes
  add column date_label text,
  add column people_tags text[] not null default '{}',
  add column place_label text,
  add column related_tags text[] not null default '{}',
  add column metadata jsonb not null default '{}'::jsonb,
  add constraint anecdotes_metadata_object_check
    check (jsonb_typeof(metadata) = 'object');

alter table public.anecdote_translations
  add column summary text not null default '',
  add column before_section text,
  add column connection_section text,
  add column quote_text text,
  add column quote_attribution text;

create index anecdotes_people_tags_gin_idx
  on public.anecdotes using gin(people_tags);

create index anecdotes_related_tags_gin_idx
  on public.anecdotes using gin(related_tags);

create index anecdotes_metadata_gin_idx
  on public.anecdotes using gin(metadata);
