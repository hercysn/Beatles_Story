import { describe, expect, it } from "vitest";

import { routing } from "@/i18n/routing";

import { storyFixtures } from "./story-pages";

describe("storyFixtures", () => {
  it("provides guided story pages for every app locale", () => {
    for (const page of Object.values(storyFixtures)) {
      expect(Object.keys(page).sort()).toEqual([...routing.locales].sort());
    }
  });

  it("includes the complete first-draft English hooks", () => {
    expect(storyFixtures.start.en.chapters).toHaveLength(10);
    expect(storyFixtures.johnAndPaul.en.chapters).toHaveLength(12);
  });

  it("keeps every chapter connected to a song and related events", () => {
    for (const page of Object.values(storyFixtures)) {
      for (const fixture of Object.values(page)) {
        for (const chapter of fixture.chapters) {
          expect(chapter.song).toBeTruthy();
          expect(chapter.relatedEvents.length).toBeGreaterThan(0);
        }
      }
    }
  });
});
