import { describe, expect, it } from "vitest";

import { homeFixtures } from "@/content/home";
import { routing } from "@/i18n/routing";

describe("homeFixtures", () => {
  it("provides homepage data for every app locale", () => {
    expect(Object.keys(homeFixtures).sort()).toEqual(
      [...routing.locales].sort(),
    );
  });

  it("keeps primary actions on locale-aware site routes", () => {
    for (const fixture of Object.values(homeFixtures)) {
      expect(fixture.hero.primaryLinks).toHaveLength(3);
      expect(fixture.hero.primaryLinks.map((link) => link.href)).toEqual([
        "/start",
        "/john-and-paul",
        "/anecdotes",
      ]);
    }
  });

  it("includes all planned homepage sections", () => {
    for (const fixture of Object.values(homeFixtures)) {
      expect(fixture.startingPoints.items).toHaveLength(3);
      expect(fixture.featuredMoment.item.title).toBeTruthy();
      expect(fixture.turningPoints.items.length).toBeGreaterThanOrEqual(5);
      expect(fixture.johnPaul.points).toHaveLength(3);
      expect(fixture.explore.items.length).toBeGreaterThanOrEqual(5);
      expect(fixture.recentDiscoveries.items).toHaveLength(3);
      expect(fixture.evidence.labels.length).toBeGreaterThanOrEqual(5);
    }
  });
});
