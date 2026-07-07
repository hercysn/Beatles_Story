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

export function getPublicAnecdote(
  locale: Locale,
  slug: string,
): PublicAnecdote | undefined {
  return getPublicAnecdotes(locale).find((item) => item.slug === slug);
}

export function getPublicAnecdoteSlugs(): string[] {
  return anecdoteFixtures.en.items.map((item) => item.slug);
}
