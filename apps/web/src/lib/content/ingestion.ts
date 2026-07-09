import type {
  Json,
  RawDocument,
  RawDocumentReviewStatus,
  Source,
} from "@beatles-story/shared-types";

import {
  createSupabaseAdminClient,
  hasSupabaseAdminConfig,
} from "@/lib/supabase/client";

export type IngestionDocument = {
  id: string;
  externalId: string | null;
  originalUrl: string;
  rawTextPreview: string;
  publishedAt: string | null;
  fetchedAt: string;
  contentHash: string;
  reviewStatus: RawDocumentReviewStatus;
  reviewNotes: string | null;
  sourceTitle: string;
  sourceUrl: string | null;
  provider: string | null;
  blogName: string | null;
  tumblrPostId: string | null;
  originalPoster: string | null;
  tags: string[];
  sourceLinks: Array<{ title: string | null; url: string }>;
  imageCount: number;
  notesCount: number | null;
  addsReblogCommentary: boolean | null;
};

export async function getIngestionDocuments(
  limit = 50,
): Promise<IngestionDocument[]> {
  if (!hasSupabaseAdminConfig()) {
    return [];
  }

  const supabase = createSupabaseAdminClient();
  const { data: rawDocuments, error } = await supabase
    .from("raw_documents")
    .select("*")
    .order("fetched_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(error.message);
  }

  const sourceIds = [
    ...new Set((rawDocuments ?? []).map((document) => document.source_id)),
  ];
  const sourceById = await getSourcesById(sourceIds);

  return (rawDocuments ?? []).map((document) =>
    toIngestionDocument(document, sourceById.get(document.source_id)),
  );
}

async function getSourcesById(sourceIds: string[]) {
  if (sourceIds.length === 0) {
    return new Map<string, Source>();
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("sources")
    .select("*")
    .in("id", sourceIds);

  if (error) {
    throw new Error(error.message);
  }

  return new Map((data ?? []).map((source) => [source.id, source]));
}

function toIngestionDocument(
  document: RawDocument,
  source: Source | undefined,
): IngestionDocument {
  const metadata = getObject(document.metadata);

  return {
    id: document.id,
    externalId: document.external_id,
    originalUrl: document.original_url,
    rawTextPreview: createPreview(document.normalized_text ?? document.raw_text),
    publishedAt: document.published_at,
    fetchedAt: document.fetched_at,
    contentHash: document.content_hash,
    reviewStatus: document.review_status,
    reviewNotes: document.review_notes,
    sourceTitle: source?.title ?? "Unknown source",
    sourceUrl: source?.url ?? null,
    provider: getString(metadata.provider),
    blogName: getString(metadata.blogName),
    tumblrPostId: getString(metadata.tumblrPostId),
    originalPoster: getString(metadata.originalPoster),
    tags: getStringArray(metadata.tags),
    sourceLinks: getSourceLinks(metadata.sourceLinks),
    imageCount: getArray(metadata.imageMetadata).length,
    notesCount: getNumber(metadata.notesCount),
    addsReblogCommentary: getBoolean(metadata.addsReblogCommentary),
  };
}

function createPreview(text: string) {
  return text.length > 420 ? `${text.slice(0, 420).trim()}...` : text;
}

function getObject(value: Json): Record<string, Json | undefined> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? value
    : {};
}

function getArray(value: Json | undefined): Json[] {
  return Array.isArray(value) ? value : [];
}

function getString(value: Json | undefined) {
  return typeof value === "string" ? value : null;
}

function getNumber(value: Json | undefined) {
  return typeof value === "number" ? value : null;
}

function getBoolean(value: Json | undefined) {
  return typeof value === "boolean" ? value : null;
}

function getStringArray(value: Json | undefined) {
  return getArray(value).filter((item): item is string => typeof item === "string");
}

function getSourceLinks(value: Json | undefined) {
  return getArray(value).flatMap((item) => {
    const sourceLink = getObject(item);
    const url = getString(sourceLink.url);

    if (!url) {
      return [];
    }

    return [
      {
        title: getString(sourceLink.title),
        url,
      },
    ];
  });
}
