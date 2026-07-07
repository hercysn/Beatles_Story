import { describe, expect, it } from "vitest";

import {
  filterPublicAnecdotesByTag,
  getPublicAnecdote,
  getPublicAnecdoteCollection,
  getPublicAnecdoteSlugs,
  getPublicAnecdoteTags,
  getPublicAnecdotes,
} from "@/lib/content/public";

describe("public content API", () => {
  it("returns the public anecdote collection for a locale", async () => {
    const collection = await getPublicAnecdoteCollection("en");

    expect(collection.labels.title).toBeTruthy();
    expect(collection.items).toHaveLength(6);
  });

  it("falls back to English for unsupported locales", async () => {
    const unsupportedLocale = "fr" as Parameters<
      typeof getPublicAnecdoteCollection
    >[0];

    expect(
      (await getPublicAnecdoteCollection(unsupportedLocale)).labels.title,
    ).toBe(
      (await getPublicAnecdoteCollection("en")).labels.title,
    );
  });

  it("keeps public slugs stable and locale-aligned", async () => {
    const slugs = await getPublicAnecdoteSlugs();

    expect(slugs).toEqual(
      (await getPublicAnecdotes("en")).map((item) => item.slug),
    );
    expect(slugs).toEqual(
      (await getPublicAnecdotes("zh")).map((item) => item.slug),
    );
  });

  it("returns concrete browse tags from public anecdote metadata", async () => {
    expect(await getPublicAnecdoteTags("en")).toEqual(
      expect.arrayContaining(["Paris", "John Lennon", "affectionate"]),
    );
    expect(await getPublicAnecdoteTags("zh")).toEqual(
      expect.arrayContaining(["巴黎", "约翰·列侬", "亲近"]),
    );
  });

  it("filters public anecdotes by tag", async () => {
    expect(
      (await filterPublicAnecdotesByTag("en", "Paris")).map(
        (item) => item.slug,
      ),
    ).toEqual(expect.arrayContaining(["much-better-place-paris"]));
    expect(
      (await filterPublicAnecdotesByTag("zh", "约翰·列侬")).map(
        (item) => item.slug,
      ),
    ).toEqual(expect.arrayContaining(["john-paul-meet-1957"]));
    expect(await filterPublicAnecdotesByTag("en", undefined)).toHaveLength(
      (await getPublicAnecdotes("en")).length,
    );
  });

  it("normalizes fixture fallback into public publication and trust metadata", async () => {
    const anecdotes = await getPublicAnecdotes("en");
    const documented = anecdotes.find(
      (item) => item.slug === "john-paul-meet-1957",
    );
    const interpretive = anecdotes.find(
      (item) => item.slug === "much-better-place-paris",
    );
    const disputed = anecdotes.find(
      (item) => item.slug === "blue-light-paul-talks-about-john",
    );

    expect(documented).toMatchObject({
      publicationStatus: "published",
      verificationStatus: "human_verified",
      aiAssisted: false,
      translationStatus: "human_translated",
      showingFallbackTranslation: false,
    });
    expect(interpretive?.verificationStatus).toBe("unverified");
    expect(disputed?.verificationStatus).toBe("disputed");
  });

  it("finds a localized anecdote by slug", async () => {
    expect(
      (await getPublicAnecdote("en", "john-paul-meet-1957"))?.title,
    ).toContain(
      "John",
    );
    expect(
      (await getPublicAnecdote("zh", "john-paul-meet-1957"))?.title,
    ).toContain(
      "约翰",
    );
  });

  it("returns undefined for unknown public slugs", async () => {
    expect(await getPublicAnecdote("en", "missing")).toBeUndefined();
  });

  it("allows public anecdotes to omit quotes", async () => {
    for (const anecdote of await getPublicAnecdotes("en")) {
      if (anecdote.quote) {
        expect(anecdote.quote.text).toBeTruthy();
        expect(anecdote.quote.attribution).toBeTruthy();
      }
    }
  });
});
