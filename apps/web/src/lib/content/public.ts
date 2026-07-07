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

export type PublicEvidenceStatus = EvidenceStatus;
export type PublicAnecdoteQuote = AnecdoteQuote;
export type PublicAnecdoteSource = AnecdoteSource;
export type PublicAnecdote = AnecdoteFixture;
export type PublicAnecdoteCollection = AnecdoteCollectionFixture;
export type PublicAnecdoteDetailLabels = AnecdoteDetailLabels;

export function getPublicAnecdoteCollection(
  locale: Locale,
): PublicAnecdoteCollection {
  return anecdoteFixtures[locale] ?? anecdoteFixtures.en;
}

export function getPublicAnecdotes(locale: Locale): PublicAnecdote[] {
  return getPublicAnecdoteCollection(locale).items;
}

export function getPublicAnecdoteTags(locale: Locale): string[] {
  const tags = new Set<string>();

  for (const anecdote of getPublicAnecdotes(locale)) {
    for (const tag of getSearchableTags(anecdote)) {
      tags.add(tag);
    }
  }

  return [...tags].sort((a, b) => a.localeCompare(b, locale));
}

export function filterPublicAnecdotesByTag(
  locale: Locale,
  tag: string | undefined,
): PublicAnecdote[] {
  const anecdotes = getPublicAnecdotes(locale);

  if (!tag) {
    return anecdotes;
  }

  const normalizedTag = normalizeTag(tag);

  return anecdotes.filter((anecdote) =>
    getSearchableTags(anecdote).some(
      (searchableTag) => normalizeTag(searchableTag) === normalizedTag,
    ),
  );
}

export function getPublicAnecdote(
  locale: Locale,
  slug: string,
): PublicAnecdote | undefined {
  return getPublicAnecdotes(locale).find((item) => item.slug === slug);
}

export function getPublicAnecdoteSlugs(): string[] {
  return anecdoteFixtures.en.items.map((item) => item.slug);
}

function getSearchableTags(anecdote: PublicAnecdote): string[] {
  return [
    anecdote.evidenceStatus,
    anecdote.place,
    ...anecdote.people,
    ...anecdote.tone,
    ...anecdote.related,
  ];
}

function normalizeTag(tag: string) {
  return tag.trim().toLocaleLowerCase();
}
