import { describe, expect, it } from "vitest";

import { getEditorialDashboard } from "@/lib/content/editorial";

describe("getEditorialDashboard", () => {
  it("derives editorial records from public anecdotes", async () => {
    const dashboard = await getEditorialDashboard("en");

    expect(dashboard.anecdotes).toHaveLength(6);
    expect(dashboard.metrics.find((item) => item.label === "Public anecdotes"))
      .toMatchObject({ value: "6" });
  });

  it("flags provisional fandom-theory content for source work", async () => {
    const dashboard = await getEditorialDashboard("en");
    const blueLight = dashboard.anecdotes.find(
      (item) => item.slug === "blue-light-paul-talks-about-john",
    );

    expect(blueLight?.reviewStatus).toBe("provisional");
    expect(blueLight?.sourceWarning).toContain("original interview");
  });

  it("keeps localized editorial labels", async () => {
    expect((await getEditorialDashboard("zh")).labels.title).toBe("编辑后台");
  });
});
