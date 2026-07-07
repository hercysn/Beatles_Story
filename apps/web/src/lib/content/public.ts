import type {
  Anecdote,
  AnecdoteTranslation,
  Claim,
  ClaimSource,
  ContentLocale,
  EvidenceLevel,
  PublicationStatus,
  Source,
  SourceStatus,
  TranslationStatus,
  VerificationStatus,
} from "@beatles-story/shared-types";

import {
  anecdoteFixtures,
  type AnecdoteCollectionFixture,
  type AnecdoteDetailLabels,
  type AnecdoteFixture,
  type AnecdoteQuote,
  type AnecdoteSource,
  type EvidenceStatus,
} from "@/content/anecdotes";
import type { Locale } from "@/i18n/routing";
import {
  createSupabaseClient,
  hasSupabasePublicConfig,
} from "@/lib/supabase/client";

export type PublicEvidenceStatus = EvidenceStatus;
export type PublicAnecdoteQuote = AnecdoteQuote;
export type PublicAnecdoteSource = AnecdoteSource;
export type PublicTranslationStatus = TranslationStatus | "untranslated";
export type PublicAnecdote = AnecdoteFixture & {
  publicationStatus: PublicationStatus;
  verificationStatus: VerificationStatus;
  aiAssisted: boolean;
  sourceStatus: SourceStatus;
  translationStatus: PublicTranslationStatus;
  showingFallbackTranslation: boolean;
};
export type PublicAnecdoteCollection = Omit<
  AnecdoteCollectionFixture,
  "items"
> & {
  items: PublicAnecdote[];
};
export type PublicAnecdoteDetailLabels = AnecdoteDetailLabels;

type ClaimSourceWithSource = ClaimSource & {
  sources: Pick<Source, "title" | "url" | "publisher" | "source_type"> | null;
};

const defaultLocale: Locale = "en";

export async function getPublicAnecdoteCollection(
  locale: Locale,
): Promise<PublicAnecdoteCollection> {
  const labels = getFixtureCollection(locale).labels;
  const items = await getPublicAnecdotes(locale);

  return { labels, items };
}

export async function getPublicAnecdotes(
  locale: Locale,
): Promise<PublicAnecdote[]> {
  if (!hasSupabasePublicConfig()) {
    return getFixtureAnecdotes(locale);
  }

  try {
    const anecdotes = await readDatabaseAnecdotes(locale);

    return anecdotes.length > 0 ? anecdotes : getFixtureAnecdotes(locale);
  } catch {
    return getFixtureAnecdotes(locale);
  }
}

export async function getPublicAnecdoteTags(locale: Locale): Promise<string[]> {
  const tags = new Set<string>();

  for (const anecdote of await getPublicAnecdotes(locale)) {
    for (const tag of getSearchableTags(locale, anecdote)) {
      tags.add(tag);
    }
  }

  return [...tags].sort((a, b) => a.localeCompare(b, locale));
}

export async function filterPublicAnecdotesByTag(
  locale: Locale,
  tag: string | undefined,
): Promise<PublicAnecdote[]> {
  const anecdotes = await getPublicAnecdotes(locale);

  if (!tag) {
    return anecdotes;
  }

  const normalizedTag = normalizeTag(tag);

  return anecdotes.filter((anecdote) =>
    getSearchableTags(locale, anecdote).some(
      (searchableTag) => normalizeTag(searchableTag) === normalizedTag,
    ),
  );
}

export async function getPublicAnecdote(
  locale: Locale,
  slug: string,
): Promise<PublicAnecdote | undefined> {
  return (await getPublicAnecdotes(locale)).find((item) => item.slug === slug);
}

export async function getPublicAnecdoteSlugs(): Promise<string[]> {
  if (!hasSupabasePublicConfig()) {
    return getFixtureAnecdotes(defaultLocale).map((item) => item.slug);
  }

  try {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
      .from("anecdotes")
      .select("slug")
      .eq("publication_status", "published")
      .order("beginner_priority", { ascending: true });

    if (error || !data || data.length === 0) {
      return getFixtureAnecdotes(defaultLocale).map((item) => item.slug);
    }

    return data.map((item) => item.slug);
  } catch {
    return getFixtureAnecdotes(defaultLocale).map((item) => item.slug);
  }
}

function getFixtureCollection(locale: Locale): AnecdoteCollectionFixture {
  return anecdoteFixtures[locale] ?? anecdoteFixtures[defaultLocale];
}

function getFixtureAnecdotes(locale: Locale): PublicAnecdote[] {
  return getFixtureCollection(locale).items.map((anecdote) =>
    withFixtureTrust(anecdote),
  );
}

async function readDatabaseAnecdotes(locale: Locale): Promise<PublicAnecdote[]> {
  const supabase = createSupabaseClient();
  const { data: anecdoteRows, error: anecdoteError } = await supabase
    .from("anecdotes")
    .select("*")
    .eq("publication_status", "published")
    .order("beginner_priority", { ascending: true });

  if (anecdoteError) {
    throw anecdoteError;
  }

  if (!anecdoteRows || anecdoteRows.length === 0) {
    return [];
  }

  const anecdoteIds = anecdoteRows.map((anecdote) => anecdote.id);
  const [translations, claims, claimSources] = await Promise.all([
    readAnecdoteTranslations(anecdoteIds, locale),
    readClaims(anecdoteIds),
    readClaimSources(anecdoteIds),
  ]);

  return anecdoteRows.flatMap((anecdote) => {
    const translation =
      translations.get(getTranslationKey(anecdote.id, toContentLocale(locale))) ??
      translations.get(getTranslationKey(anecdote.id, "en"));

    if (!translation) {
      return [];
    }

    return [
      toPublicAnecdote(
        locale,
        anecdote,
        translation,
        translation.locale !== toContentLocale(locale),
        claims.get(anecdote.id) ?? [],
        claimSources.get(anecdote.id) ?? [],
      ),
    ];
  });
}

async function readAnecdoteTranslations(
  anecdoteIds: string[],
  locale: Locale,
) {
  const supabase = createSupabaseClient();
  const locales: ContentLocale[] = Array.from(
    new Set([toContentLocale(locale), "en"]),
  );
  const { data, error } = await supabase
    .from("anecdote_translations")
    .select("*")
    .in("anecdote_id", anecdoteIds)
    .in("locale", locales);

  if (error) {
    throw error;
  }

  const translations = new Map<string, AnecdoteTranslation>();

  for (const translation of data ?? []) {
    translations.set(
      getTranslationKey(translation.anecdote_id, translation.locale),
      translation,
    );
  }

  return translations;
}

async function readClaims(anecdoteIds: string[]) {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("claims")
    .select("*")
    .in("anecdote_id", anecdoteIds);

  if (error) {
    throw error;
  }

  const claimsByAnecdote = new Map<string, Claim[]>();

  for (const claim of data ?? []) {
    if (!claim.anecdote_id) {
      continue;
    }

    const claims = claimsByAnecdote.get(claim.anecdote_id) ?? [];
    claims.push(claim);
    claimsByAnecdote.set(claim.anecdote_id, claims);
  }

  return claimsByAnecdote;
}

async function readClaimSources(anecdoteIds: string[]) {
  const claimsByAnecdote = await readClaims(anecdoteIds);
  const claimIds = [...claimsByAnecdote.values()].flat().map((claim) => claim.id);

  if (claimIds.length === 0) {
    return new Map<string, ClaimSourceWithSource[]>();
  }

  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("claim_sources")
    .select("claim_id, source_id, source_excerpt, support_type, created_at, sources(title, url, publisher, source_type)")
    .in("claim_id", claimIds);

  if (error) {
    throw error;
  }

  const anecdoteIdByClaim = new Map<string, string>();

  for (const [anecdoteId, claims] of claimsByAnecdote) {
    for (const claim of claims) {
      anecdoteIdByClaim.set(claim.id, anecdoteId);
    }
  }

  const sourcesByAnecdote = new Map<string, ClaimSourceWithSource[]>();

  for (const source of (data ?? []) as ClaimSourceWithSource[]) {
    const anecdoteId = anecdoteIdByClaim.get(source.claim_id);

    if (!anecdoteId) {
      continue;
    }

    const sources = sourcesByAnecdote.get(anecdoteId) ?? [];
    sources.push(source);
    sourcesByAnecdote.set(anecdoteId, sources);
  }

  return sourcesByAnecdote;
}

function toPublicAnecdote(
  locale: Locale,
  anecdote: Anecdote,
  translation: AnecdoteTranslation,
  showingFallbackTranslation: boolean,
  claims: Claim[],
  claimSources: ClaimSourceWithSource[],
): PublicAnecdote {
  const documentedClaims = claims
    .filter((claim) => ["fact", "recollection"].includes(claim.claim_type))
    .map((claim) => claim.claim_text);
  const interpretationClaims = claims
    .filter((claim) =>
      ["interpretation", "disputed", "theory"].includes(claim.claim_type),
    )
    .map((claim) => claim.claim_text);

  return {
    slug: anecdote.slug,
    title: translation.title,
    hook: translation.hook,
    summary: translation.summary,
    quote:
      translation.quote_text && translation.quote_attribution
        ? {
            text: translation.quote_text,
            attribution: translation.quote_attribution,
          }
        : undefined,
    dateLabel: anecdote.date_label ?? "",
    people: localizeTags(locale, anecdote.people_tags),
    place: localizeTag(locale, anecdote.place_label ?? ""),
    tone: localizeTags(locale, anecdote.tone_tags),
    evidenceStatus: toPublicEvidenceStatus(anecdote.evidence_level),
    publicationStatus: anecdote.publication_status,
    verificationStatus: anecdote.verification_status,
    aiAssisted: anecdote.ai_assisted,
    sourceStatus: anecdote.source_status,
    translationStatus: showingFallbackTranslation
      ? "untranslated"
      : translation.translation_status,
    showingFallbackTranslation,
    beginnerRelevance: getBeginnerRelevance(locale, anecdote.beginner_priority),
    sections: {
      happened: translation.what_happened,
      whyInteresting: translation.why_interesting,
      before: translation.before_section ?? translation.historical_context ?? "",
      connection: translation.connection_section ?? "",
      documented: documentedClaims.length
        ? documentedClaims
        : splitSection(translation.documented_section),
      interpretation: interpretationClaims.length
        ? interpretationClaims
        : splitSection(translation.interpretation_section ?? ""),
    },
    connectionChain: getStringArrayMetadata(anecdote, "connectionChain"),
    sources: toPublicSources(claimSources),
    related: localizeTags(locale, anecdote.related_tags),
  };
}

function withFixtureTrust(anecdote: AnecdoteFixture): PublicAnecdote {
  return {
    ...anecdote,
    publicationStatus: "published",
    verificationStatus: getFixtureVerificationStatus(anecdote),
    aiAssisted: false,
    sourceStatus:
      anecdote.sources.length >= 2 ? "partially_sourced" : "unsourced",
    translationStatus: "human_translated",
    showingFallbackTranslation: false,
  };
}

function getFixtureVerificationStatus(
  anecdote: AnecdoteFixture,
): VerificationStatus {
  if (anecdote.evidenceStatus === "Documented context") {
    return "human_verified";
  }

  if (
    anecdote.evidenceStatus === "Disputed recollection" ||
    anecdote.evidenceStatus === "Fandom theory"
  ) {
    return "disputed";
  }

  return "unverified";
}

function toPublicSources(
  claimSources: ClaimSourceWithSource[],
): PublicAnecdoteSource[] {
  const sourceByTitle = new Map<string, PublicAnecdoteSource>();

  for (const claimSource of claimSources) {
    if (!claimSource.sources) {
      continue;
    }

    sourceByTitle.set(claimSource.sources.title, {
      title: claimSource.sources.title,
      detail:
        claimSource.source_excerpt ??
        claimSource.sources.publisher ??
        claimSource.support_type,
      url: claimSource.sources.url ?? undefined,
    });
  }

  return [...sourceByTitle.values()];
}

function toPublicEvidenceStatus(evidenceLevel: EvidenceLevel): EvidenceStatus {
  const statusByLevel: Record<EvidenceLevel, EvidenceStatus> = {
    documented: "Documented context",
    corroborated: "Corroborated recollection",
    "single-recollection": "Corroborated recollection",
    disputed: "Disputed recollection",
    interpretive: "Interpretive connection",
    "fandom-theory": "Fandom theory",
  };

  return statusByLevel[evidenceLevel];
}

function getBeginnerRelevance(locale: Locale, priority: number) {
  if (priority <= 1) {
    return locale === "zh" ? "最基本的起点" : "Essential starting point";
  }

  if (priority <= 3) {
    return locale === "zh" ? "适合新读者" : "Good first anecdote";
  }

  return locale === "zh" ? "进阶阅读" : "Deeper cut";
}

function splitSection(section: string): string[] {
  return section
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function getStringArrayMetadata(anecdote: Anecdote, key: string): string[] {
  if (
    typeof anecdote.metadata === "object" &&
    anecdote.metadata !== null &&
    !Array.isArray(anecdote.metadata)
  ) {
    const value = anecdote.metadata[key];

    if (Array.isArray(value)) {
      return value.filter((item): item is string => typeof item === "string");
    }
  }

  return [];
}

function getTranslationKey(anecdoteId: string, locale: ContentLocale) {
  return `${anecdoteId}:${locale}`;
}

function toContentLocale(locale: Locale): ContentLocale {
  return locale === "zh" ? "zh-CN" : "en";
}

function getSearchableTags(locale: Locale, anecdote: PublicAnecdote): string[] {
  return [
    localizeTag(locale, anecdote.evidenceStatus),
    anecdote.place,
    ...anecdote.people,
    ...anecdote.tone,
    ...anecdote.related,
  ].filter(Boolean);
}

function normalizeTag(tag: string) {
  return tag.trim().toLocaleLowerCase();
}

function localizeTags(locale: Locale, tags: string[]): string[] {
  return tags.map((tag) => localizeTag(locale, tag));
}

function localizeTag(locale: Locale, tag: string): string {
  if (locale !== "zh") {
    return tag;
  }

  return chineseTagByEnglish[tag] ?? tag;
}

const chineseTagByEnglish: Record<string, string> = {
  "1980": "1980 年",
  "Anthology-era interview footage": "Anthology 时期访谈影像",
  "Aunt Mimi": "Mimi 姨妈",
  "Beatles image": "披头士形象",
  "Coming Up": "Coming Up",
  "Corroborated recollection": "有旁证的回忆",
  "Disputed recollection": "有争议的回忆",
  "Documented context": "有记录的背景",
  "Double Fantasy": "Double Fantasy",
  "Easily overlooked": "容易被忽略",
  "Fandom theory": "歌迷理论",
  "George Harrison": "乔治·哈里森",
  "Hitchhiking": "搭便车",
  "Interpretive connection": "解释性连接",
  "Ivan Vaughan": "Ivan Vaughan",
  "John Lennon": "约翰·列侬",
  "John and Paul": "约翰与保罗",
  "John’s presence": "约翰的在场",
  "Jürgen Vollmer": "Jürgen Vollmer",
  "Lennon-McCartney": "Lennon-McCartney",
  "Memory": "记忆",
  "New York and England": "纽约与英格兰",
  "Olivia Harrison": "奥利维亚·哈里森",
  "Paris": "巴黎",
  "Paul McCartney": "保罗·麦卡特尼",
  "Paul and George": "保罗与乔治",
  "Pre-fame": "成名前",
  "Songs as conversation": "歌曲作为对话",
  "Symbolic moments": "象征性瞬间",
  "The End of the End": "The End of the End",
  "The Quarry Men": "The Quarry Men",
  "Wales, Devon, and southwest England": "威尔士与英格兰南部",
  "Woolton": "Woolton",
  "Woolton, Liverpool": "利物浦 Woolton",
  "Yoko Ono": "小野洋子",
  affectionate: "亲近",
  bittersweet: "苦甜",
  competitive: "竞争",
  disputed: "有争议",
  documented: "有记录",
  "easily overlooked": "容易被忽略",
  formative: "形成期",
  funny: "好笑",
  revealing: "揭示性",
  symbolic: "象征性",
};
