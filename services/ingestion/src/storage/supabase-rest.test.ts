import { describe, expect, it } from "vitest";

import { SupabaseRestStorage } from "./supabase-rest.js";

describe("SupabaseRestStorage", () => {
  it("reuses an existing Tumblr source row before inserting", async () => {
    const requests: string[] = [];
    const fetcher: typeof fetch = async (input) => {
      requests.push(String(input));

      return new Response(JSON.stringify([{ id: "source-1" }]), {
        status: 200,
      });
    };
    const storage = new SupabaseRestStorage({
      supabaseUrl: "https://example.supabase.co",
      serviceRoleKey: "service-role",
      fetcher,
    });

    await expect(
      storage.upsertSource({
        title: "beatles-source Tumblr",
        source_type: "tumblr",
        author: "beatles-source",
        publisher: "Tumblr",
        url: "https://beatles-source.tumblr.com",
        publication_date: null,
        original_language: null,
        reliability_tier: 4,
        rights_notes: null,
      }),
    ).resolves.toEqual({ id: "source-1" });
    expect(requests).toHaveLength(1);
    expect(requests[0]).toContain("sources?select=id");
  });

  it("upserts raw documents by source and external ID", async () => {
    const requests: Array<{ url: string; init?: RequestInit }> = [];
    const fetcher: typeof fetch = async (input, init) => {
      requests.push({ url: String(input), init });

      return new Response(
        JSON.stringify([{ id: "raw-1", external_id: "post-1" }]),
        { status: 200 },
      );
    };
    const storage = new SupabaseRestStorage({
      supabaseUrl: "https://example.supabase.co",
      serviceRoleKey: "service-role",
      fetcher,
    });

    await expect(
      storage.upsertRawDocument({
        source_id: "source-1",
        external_id: "post-1",
        raw_text: "raw",
        normalized_text: "raw",
        original_url: "https://example.com/post-1",
        published_at: null,
        fetched_at: "2026-07-08T12:00:00.000Z",
        content_hash: "hash",
        language: null,
        metadata: {},
      }),
    ).resolves.toEqual({ id: "raw-1", external_id: "post-1" });
    expect(requests[0]?.url).toContain(
      "raw_documents?on_conflict=source_id,external_id",
    );
    expect(requests[0]?.init?.method).toBe("POST");
    expect(requests[0]?.init?.headers).toMatchObject({
      Prefer: "resolution=merge-duplicates,return=representation",
    });
  });
});
