import { describe, expect, it } from "vitest";

import {
  getPublicAnecdote,
  getPublicAnecdoteCollection,
  getPublicAnecdoteSlugs,
  getPublicAnecdotes,
} from "@/lib/content/public";

describe("public content API", () => {
  it("returns the public anecdote collection for a locale", () => {
    const collection = getPublicAnecdoteCollection("en");

    expect(collection.labels.title).toBeTruthy();
    expect(collection.items).toHaveLength(6);
  });

  it("falls back to English for unsupported locales", () => {
    const unsupportedLocale = "fr" as Parameters<
      typeof getPublicAnecdoteCollection
    >[0];

    expect(getPublicAnecdoteCollection(unsupportedLocale).labels.title).toBe(
      getPublicAnecdoteCollection("en").labels.title,
    );
  });

  it("keeps public slugs stable and locale-aligned", () => {
    const slugs = getPublicAnecdoteSlugs();

    expect(slugs).toEqual(getPublicAnecdotes("en").map((item) => item.slug));
    expect(slugs).toEqual(getPublicAnecdotes("zh").map((item) => item.slug));
  });

  it("finds a localized anecdote by slug", () => {
    expect(getPublicAnecdote("en", "john-paul-meet-1957")?.title).toContain(
      "John",
    );
    expect(getPublicAnecdote("zh", "john-paul-meet-1957")?.title).toContain(
      "约翰",
    );
  });

  it("returns undefined for unknown public slugs", () => {
    expect(getPublicAnecdote("en", "missing")).toBeUndefined();
  });

  it("allows public anecdotes to omit quotes", () => {
    for (const anecdote of getPublicAnecdotes("en")) {
      if (anecdote.quote) {
        expect(anecdote.quote.text).toBeTruthy();
        expect(anecdote.quote.attribution).toBeTruthy();
      }
    }
  });
});
