create type public.raw_document_review_status as enum (
  'new',
  'reviewing',
  'approved_for_conversion',
  'ignored',
  'converted'
);

alter table public.raw_documents
  add column review_status public.raw_document_review_status not null default 'new',
  add column review_notes text;

create index raw_documents_review_status_idx
  on public.raw_documents(review_status);
