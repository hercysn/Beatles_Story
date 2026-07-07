alter table public.sources enable row level security;
alter table public.raw_documents enable row level security;
alter table public.entities enable row level security;
alter table public.entity_translations enable row level security;
alter table public.events enable row level security;
alter table public.anecdotes enable row level security;
alter table public.anecdote_translations enable row level security;
alter table public.claims enable row level security;
alter table public.claim_sources enable row level security;
alter table public.connections enable row level security;

create or replace function public.is_content_admin()
returns boolean
language sql
stable
as $$
  select coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin'
    or coalesce(auth.jwt() ->> 'role', '') = 'admin'
$$;

create policy sources_public_select
on public.sources
for select
using (true);

create policy entities_public_select
on public.entities
for select
using (true);

create policy entity_translations_public_select
on public.entity_translations
for select
using (true);

create policy events_public_select
on public.events
for select
using (review_status = 'approved' or public.is_content_admin());

create policy anecdotes_public_select
on public.anecdotes
for select
using (review_status = 'approved' or public.is_content_admin());

create policy anecdote_translations_public_select
on public.anecdote_translations
for select
using (
  translation_status = 'approved'
  or public.is_content_admin()
);

create policy claims_public_select
on public.claims
for select
using (review_status = 'approved' or public.is_content_admin());

create policy claim_sources_public_select
on public.claim_sources
for select
using (
  exists (
    select 1
    from public.claims
    where claims.id = claim_sources.claim_id
      and (claims.review_status = 'approved' or public.is_content_admin())
  )
);

create policy connections_public_select
on public.connections
for select
using (review_status = 'approved' or public.is_content_admin());

create policy raw_documents_admin_all
on public.raw_documents
for all
using (public.is_content_admin())
with check (public.is_content_admin());

create policy sources_admin_all
on public.sources
for all
using (public.is_content_admin())
with check (public.is_content_admin());

create policy entities_admin_all
on public.entities
for all
using (public.is_content_admin())
with check (public.is_content_admin());

create policy entity_translations_admin_all
on public.entity_translations
for all
using (public.is_content_admin())
with check (public.is_content_admin());

create policy events_admin_all
on public.events
for all
using (public.is_content_admin())
with check (public.is_content_admin());

create policy anecdotes_admin_all
on public.anecdotes
for all
using (public.is_content_admin())
with check (public.is_content_admin());

create policy anecdote_translations_admin_all
on public.anecdote_translations
for all
using (public.is_content_admin())
with check (public.is_content_admin());

create policy claims_admin_all
on public.claims
for all
using (public.is_content_admin())
with check (public.is_content_admin());

create policy claim_sources_admin_all
on public.claim_sources
for all
using (public.is_content_admin())
with check (public.is_content_admin());

create policy connections_admin_all
on public.connections
for all
using (public.is_content_admin())
with check (public.is_content_admin());

create index anecdote_translations_anecdote_locale_status_idx
  on public.anecdote_translations(anecdote_id, locale, translation_status);

create index claims_anecdote_status_idx
  on public.claims(anecdote_id, review_status);
