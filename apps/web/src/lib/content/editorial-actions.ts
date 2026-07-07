"use server";

import type {
  ClaimType,
  ContentLocale,
  DatePrecision,
  EvidenceLevel,
  PublicationStatus,
  ReviewStatus,
  SourceStatus,
  SourceType,
  SupportType,
  TranslationStatus,
  VerificationStatus,
} from "@beatles-story/shared-types";
import { revalidatePath } from "next/cache";

import { assertEditorialAdmin } from "@/lib/content/admin";
import {
  createSupabaseAdminClient,
  hasSupabaseAdminConfig,
} from "@/lib/supabase/client";

export async function createSourceAction(
  formData: FormData,
): Promise<void> {
  await assertWritableBackend();
  const supabase = createSupabaseAdminClient();
  const title = getRequiredString(formData, "title");
  const sourceType = getEnumValue<SourceType>(formData, "sourceType", [
    "primary",
    "official",
    "book",
    "interview",
    "article",
    "tumblr",
    "fan-research",
    "other",
  ]);
  const reliabilityTier = Number(getOptionalString(formData, "reliabilityTier") ?? 3);

  const { error } = await supabase.from("sources").insert({
    title,
    source_type: sourceType,
    author: getOptionalString(formData, "author"),
    publisher: getOptionalString(formData, "publisher"),
    url: getOptionalString(formData, "url"),
    publication_date: getOptionalString(formData, "publicationDate"),
    original_language: getOptionalString(formData, "originalLanguage"),
    reliability_tier: reliabilityTier,
    rights_notes: getOptionalString(formData, "rightsNotes"),
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidateEditorial();
}

export async function createEventAction(
  formData: FormData,
): Promise<void> {
  await assertWritableBackend();
  const supabase = createSupabaseAdminClient();
  const datePrecision = getEnumValue<DatePrecision>(formData, "datePrecision", [
    "exact",
    "month",
    "year",
    "approximate",
    "range",
    "disputed",
  ]);

  const { error } = await supabase.from("events").insert({
    event_type: getRequiredString(formData, "eventType"),
    start_date: getOptionalString(formData, "startDate"),
    end_date: getOptionalString(formData, "endDate"),
    date_precision: datePrecision,
    review_status: getReviewStatus(formData),
    confidence: Number(getOptionalString(formData, "confidence") ?? 0.8),
    metadata: {},
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidateEditorial();
}

export async function upsertAnecdoteAction(
  formData: FormData,
): Promise<void> {
  await assertWritableBackend();
  const supabase = createSupabaseAdminClient();
  const slug = getRequiredString(formData, "slug");
  const evidenceLevel = getEnumValue<EvidenceLevel>(formData, "evidenceLevel", [
    "documented",
    "corroborated",
    "single-recollection",
    "disputed",
    "interpretive",
    "fandom-theory",
  ]);

  const { error } = await supabase.from("anecdotes").upsert(
    {
      slug,
      evidence_level: evidenceLevel,
      date_label: getOptionalString(formData, "dateLabel"),
      people_tags: getList(formData, "peopleTags"),
      place_label: getOptionalString(formData, "placeLabel"),
      tone_tags: getList(formData, "toneTags"),
      related_tags: getList(formData, "relatedTags"),
      publication_status: getEnumValue<PublicationStatus>(
        formData,
        "publicationStatus",
        ["draft", "published", "hidden"],
      ),
      verification_status: getEnumValue<VerificationStatus>(
        formData,
        "verificationStatus",
        ["human_verified", "unverified", "disputed"],
      ),
      ai_assisted: getBoolean(formData, "aiAssisted"),
      source_status: getEnumValue<SourceStatus>(formData, "sourceStatus", [
        "fully_sourced",
        "partially_sourced",
        "unsourced",
      ]),
      beginner_priority: Number(getOptionalString(formData, "beginnerPriority") ?? 3),
      confidence: Number(getOptionalString(formData, "confidence") ?? 0.8),
      review_status: getReviewStatus(formData),
      metadata: {
        connectionChain: getList(formData, "connectionChain"),
      },
    },
    { onConflict: "slug" },
  );

  if (error) {
    throw new Error(error.message);
  }

  revalidateEditorial();
}

export async function upsertAnecdoteTranslationAction(
  formData: FormData,
): Promise<void> {
  await assertWritableBackend();
  const supabase = createSupabaseAdminClient();
  const slug = getRequiredString(formData, "slug");
  const locale = getEnumValue<ContentLocale>(formData, "locale", ["en", "zh-CN"]);
  const translationStatus = getEnumValue<TranslationStatus>(
    formData,
    "translationStatus",
    ["human_translated", "machine_translated", "needs_review"],
  );
  const anecdoteId = await getAnecdoteIdBySlug(slug);

  const { error } = await supabase.from("anecdote_translations").upsert(
    {
      anecdote_id: anecdoteId,
      locale,
      title: getRequiredString(formData, "title"),
      hook: getRequiredString(formData, "hook"),
      summary: getRequiredString(formData, "summary"),
      what_happened: getRequiredString(formData, "whatHappened"),
      why_interesting: getRequiredString(formData, "whyInteresting"),
      historical_context: getOptionalString(formData, "historicalContext"),
      before_section: getOptionalString(formData, "beforeSection"),
      connection_section: getOptionalString(formData, "connectionSection"),
      documented_section: getRequiredString(formData, "documentedSection"),
      interpretation_section: getOptionalString(formData, "interpretationSection"),
      quote_text: getOptionalString(formData, "quoteText"),
      quote_attribution: getOptionalString(formData, "quoteAttribution"),
      translation_status: translationStatus,
    },
    { onConflict: "anecdote_id,locale" },
  );

  if (error) {
    throw new Error(error.message);
  }

  revalidateEditorial();
}

export async function createClaimAction(
  formData: FormData,
): Promise<void> {
  await assertWritableBackend();
  const supabase = createSupabaseAdminClient();
  const claimType = getEnumValue<ClaimType>(formData, "claimType", [
    "fact",
    "recollection",
    "interpretation",
    "disputed",
    "theory",
  ]);
  const slug = getOptionalString(formData, "slug");
  const eventId = getOptionalString(formData, "eventId");
  const anecdoteId = slug ? await getAnecdoteIdBySlug(slug) : null;

  if (!anecdoteId && !eventId) {
    throw new Error("Claim requires an anecdote slug or event ID.");
  }

  const baseClaim = {
    claim_type: claimType,
    claim_text: getRequiredString(formData, "claimText"),
    confidence: Number(getOptionalString(formData, "confidence") ?? 0.8),
    review_status: getReviewStatus(formData),
  };
  const { error } = await supabase.from("claims").insert(
    anecdoteId
      ? {
          ...baseClaim,
          anecdote_id: anecdoteId,
          event_id: null,
        }
      : {
          ...baseClaim,
          anecdote_id: null,
          event_id: eventId as string,
        },
  );

  if (error) {
    throw new Error(error.message);
  }

  revalidateEditorial();
}

export async function attachClaimSourceAction(
  formData: FormData,
): Promise<void> {
  await assertWritableBackend();
  const supabase = createSupabaseAdminClient();
  const supportType = getEnumValue<SupportType>(formData, "supportType", [
    "supports",
    "contradicts",
    "context",
    "mentions",
  ]);

  const { error } = await supabase.from("claim_sources").upsert({
    claim_id: getRequiredString(formData, "claimId"),
    source_id: getRequiredString(formData, "sourceId"),
    source_excerpt: getOptionalString(formData, "sourceExcerpt"),
    support_type: supportType,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidateEditorial();
}

async function assertWritableBackend() {
  await assertEditorialAdmin();

  if (!hasSupabaseAdminConfig()) {
    throw new Error("Supabase admin configuration is required for writes.");
  }
}

async function getAnecdoteIdBySlug(slug: string) {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("anecdotes")
    .select("id")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    throw new Error(`Anecdote not found for slug: ${slug}`);
  }

  return data.id;
}

function getReviewStatus(formData: FormData): ReviewStatus {
  return getEnumValue<ReviewStatus>(formData, "reviewStatus", [
    "draft",
    "review",
    "approved",
    "rejected",
  ]);
}

function getRequiredString(formData: FormData, key: string) {
  const value = getOptionalString(formData, key);

  if (!value) {
    throw new Error(`${key} is required.`);
  }

  return value;
}

function getOptionalString(formData: FormData, key: string) {
  const value = formData.get(key);

  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function getList(formData: FormData, key: string) {
  return (getOptionalString(formData, key) ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function getBoolean(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

function getEnumValue<T extends string>(
  formData: FormData,
  key: string,
  allowedValues: readonly T[],
): T {
  const value = getRequiredString(formData, key);

  if (!allowedValues.includes(value as T)) {
    throw new Error(`${key} has an unsupported value.`);
  }

  return value as T;
}

function revalidateEditorial() {
  revalidatePath("/en/editorial");
  revalidatePath("/zh/editorial");
  revalidatePath("/en/anecdotes");
  revalidatePath("/zh/anecdotes");
}
