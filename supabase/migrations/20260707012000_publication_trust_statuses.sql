create type public.publication_status as enum (
  'draft',
  'published',
  'hidden'
);

create type public.verification_status as enum (
  'human_verified',
  'unverified',
  'disputed'
);

create type public.source_status as enum (
  'fully_sourced',
  'partially_sourced',
  'unsourced'
);

alter type public.translation_status rename to translation_workflow_status;

create type public.translation_status as enum (
  'human_translated',
  'machine_translated',
  'needs_review'
);

alter table public.anecdotes
  add column publication_status public.publication_status not null default 'draft',
  add column verification_status public.verification_status not null default 'unverified',
  add column ai_assisted boolean not null default false,
  add column source_status public.source_status not null default 'unsourced';

alter table public.anecdote_translations
  rename column translation_status to translation_workflow_status;

alter table public.anecdote_translations
  add column translation_status public.translation_status not null default 'needs_review';

update public.anecdotes
set
  publication_status = case
    when review_status = 'approved' then 'published'::public.publication_status
    when review_status = 'rejected' then 'hidden'::public.publication_status
    else 'draft'::public.publication_status
  end,
  verification_status = case
    when evidence_level = 'documented' then 'human_verified'::public.verification_status
    when evidence_level in ('disputed', 'fandom-theory') then 'disputed'::public.verification_status
    else 'unverified'::public.verification_status
  end,
  source_status = case
    when exists (
      select 1
      from public.claims
      join public.claim_sources
        on claim_sources.claim_id = claims.id
      where claims.anecdote_id = anecdotes.id
    ) then 'partially_sourced'::public.source_status
    else 'unsourced'::public.source_status
  end;

update public.anecdote_translations
set translation_status = case
  when translation_workflow_status = 'approved' then 'human_translated'::public.translation_status
  when translation_workflow_status = 'machine-translated' then 'machine_translated'::public.translation_status
  else 'needs_review'::public.translation_status
end;

drop policy if exists events_public_select on public.events;
drop policy if exists anecdotes_public_select on public.anecdotes;
drop policy if exists anecdote_translations_public_select on public.anecdote_translations;
drop policy if exists claims_public_select on public.claims;
drop policy if exists claim_sources_public_select on public.claim_sources;
drop policy if exists connections_public_select on public.connections;

create policy events_public_select
on public.events
for select
using (review_status = 'approved' or public.is_content_admin());

create policy anecdotes_public_select
on public.anecdotes
for select
using (publication_status = 'published' or public.is_content_admin());

create policy anecdote_translations_public_select
on public.anecdote_translations
for select
using (
  exists (
    select 1
    from public.anecdotes
    where anecdotes.id = anecdote_translations.anecdote_id
      and (anecdotes.publication_status = 'published' or public.is_content_admin())
  )
);

create policy claims_public_select
on public.claims
for select
using (
  public.is_content_admin()
  or exists (
    select 1
    from public.anecdotes
    where anecdotes.id = claims.anecdote_id
      and anecdotes.publication_status = 'published'
  )
  or exists (
    select 1
    from public.events
    where events.id = claims.event_id
      and events.review_status = 'approved'
  )
);

create policy claim_sources_public_select
on public.claim_sources
for select
using (
  public.is_content_admin()
  or exists (
    select 1
    from public.claims
    join public.anecdotes
      on anecdotes.id = claims.anecdote_id
    where claims.id = claim_sources.claim_id
      and anecdotes.publication_status = 'published'
  )
);

create policy connections_public_select
on public.connections
for select
using (
  review_status = 'approved'
  and (
    public.is_content_admin()
    or (
      from_type <> 'anecdote'
      and to_type <> 'anecdote'
    )
    or exists (
      select 1
      from public.anecdotes
      where anecdotes.id in (connections.from_id, connections.to_id)
        and anecdotes.publication_status = 'published'
    )
  )
);

create index anecdotes_publication_status_idx
  on public.anecdotes(publication_status);

create index anecdotes_verification_status_idx
  on public.anecdotes(verification_status);

create index anecdotes_source_status_idx
  on public.anecdotes(source_status);

create index anecdote_translations_status_idx
  on public.anecdote_translations(translation_status);
