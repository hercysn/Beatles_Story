import { describe, expect, it } from "vitest";

import { buildLocalizedPath } from "@/lib/routes";

describe("buildLocalizedPath", () => {
  it("builds locale roots", () => {
    expect(buildLocalizedPath("en", "/")).toBe("/en");
    expect(buildLocalizedPath("zh", "/")).toBe("/zh");
  });

  it("prefixes content paths with the locale", () => {
    expect(buildLocalizedPath("en", "/start")).toBe("/en/start");
    expect(buildLocalizedPath("zh", "john-and-paul")).toBe("/zh/john-and-paul");
  });

  it("preserves nested paths when switching locales", () => {
    expect(buildLocalizedPath("zh", "/anecdotes")).toBe("/zh/anecdotes");
    expect(buildLocalizedPath("en", "/timeline")).toBe("/en/timeline");
  });
});
