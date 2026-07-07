import { describe, expect, it } from "vitest";

import {
  anecdoteFixtures,
  getAnecdote,
  getAnecdoteSlugs,
} from "@/content/anecdotes";
import { routing } from "@/i18n/routing";

describe("anecdoteFixtures", () => {
  it("provides anecdote data for every app locale", () => {
    expect(Object.keys(anecdoteFixtures).sort()).toEqual(
      [...routing.locales].sort(),
    );
  });

  it("keeps slugs aligned across locales", () => {
    const expectedSlugs = getAnecdoteSlugs();

    for (const fixture of Object.values(anecdoteFixtures)) {
      expect(fixture.items.map((item) => item.slug)).toEqual(expectedSlugs);
    }
  });

  it("provides the planned detail sections for every anecdote", () => {
    for (const locale of routing.locales) {
      for (const slug of getAnecdoteSlugs()) {
        const anecdote = getAnecdote(locale, slug);

        expect(anecdote?.sections.happened).toBeTruthy();
        expect(anecdote?.sections.whyInteresting).toBeTruthy();
        expect(anecdote?.sections.before).toBeTruthy();
        expect(anecdote?.sections.connection).toBeTruthy();
        expect(anecdote?.sections.documented.length).toBeGreaterThan(0);
        expect(anecdote?.sections.interpretation.length).toBeGreaterThan(0);
        expect(anecdote?.connectionChain.length).toBeGreaterThanOrEqual(3);
        expect(anecdote?.sources.length).toBeGreaterThan(0);
        expect(anecdote?.related.length).toBeGreaterThan(0);
      }
    }
  });
});
