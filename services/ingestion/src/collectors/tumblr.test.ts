import { describe, expect, it } from "vitest";

import {
  collectTumblrBlog,
  createTumblrRawDocumentInsert,
  createTumblrSourceInsert,
  getTumblrBlogUrl,
  normalizeTumblrBlogIdentifier,
  normalizeTumblrPost,
  parseTumblrPostUrl,
  type TumblrPost,
} from "./tumblr.js";

const fetchedAt = "2026-07-08T12:00:00.000Z";

const samplePost: TumblrPost = {
  id: 123,
  id_string: "123",
  type: "photo",
  blog_name: "beatles-source",
  post_url: "https://beatles-source.tumblr.com/post/123/example",
  post_author: "beatles-source",
  reblogged_root_name: "root-blog",
  reblogged_root_url: "https://root-blog.tumblr.com/post/1/root",
  reblogged_from_name: "middle-blog",
  reblogged_from_url: "https://middle-blog.tumblr.com/post/2/middle",
  source_title: "Original interview",
  source_url: "https://example.com/interview",
  timestamp: 1783526400,
  tags: [" Beatles ", "Paul McCartney", "Beatles"],
  note_count: 42,
  caption: "<p>Paul mentions John &amp; an old memory.</p>",
  photos: [
    {
      caption: "scan",
      original_size: {
        url: "https://64.media.tumblr.com/image.jpg",
        width: 1200,
        height: 800,
      },
    },
  ],
  trail: [
    {
      blog: { name: "root-blog" },
      content_raw: "<p>Root text about the Beatles.</p>",
    },
    {
      blog: { name: "middle-blog" },
      content: "<p>Middle reblog context.</p>",
    },
  ],
};

describe("Tumblr collector", () => {
  it("normalizes Tumblr blog names from names, domains, and post URLs", () => {
    expect(normalizeTumblrBlogIdentifier("beatles-mclennon")).toBe(
      "beatles-mclennon",
    );
    expect(normalizeTumblrBlogIdentifier("beatles-mclennon.tumblr.com")).toBe(
      "beatles-mclennon",
    );
    expect(
      normalizeTumblrBlogIdentifier(
        "https://www.tumblr.com/beatles-mclennon/77371949675/mclennon",
      ),
    ).toBe("beatles-mclennon");
    expect(getTumblrBlogUrl("https://www.tumblr.com/beatles-mclennon/post")).toBe(
      "https://beatles-mclennon.tumblr.com",
    );
  });

  it("parses Tumblr post URLs into a blog identifier and post ID", () => {
    expect(
      parseTumblrPostUrl(
        "https://www.tumblr.com/beatles-mclennon/77371949675/mclennon",
      ),
    ).toEqual({
      blogIdentifier: "beatles-mclennon",
      postId: "77371949675",
    });
    expect(
      parseTumblrPostUrl(
        "https://beatles-mclennon.tumblr.com/post/77371949675/mclennon",
      ),
    ).toEqual({
      blogIdentifier: "beatles-mclennon",
      postId: "77371949675",
    });
  });

  it("normalizes a Tumblr post into raw-document-ready metadata", () => {
    const normalized = normalizeTumblrPost(samplePost, fetchedAt);

    expect(normalized).toMatchObject({
      tumblrPostId: "123",
      blogName: "beatles-source",
      originalPoster: "root-blog",
      postUrl: "https://beatles-source.tumblr.com/post/123/example",
      tags: ["Beatles", "Paul McCartney"],
      notesCount: 42,
      imageMetadata: [
        {
          url: "https://64.media.tumblr.com/image.jpg",
          width: 1200,
          height: 800,
          caption: "scan",
        },
      ],
      sourceLinks: [
        {
          title: "Original interview",
          url: "https://example.com/interview",
        },
        {
          title: "root-blog",
          url: "https://root-blog.tumblr.com/post/1/root",
        },
        {
          title: "middle-blog",
          url: "https://middle-blog.tumblr.com/post/2/middle",
        },
      ],
      reblogChain: ["root-blog", "middle-blog", "beatles-source"],
      addsReblogCommentary: true,
    });
    expect(normalized?.text).toContain("Paul mentions John & an old memory.");
    expect(normalized?.text).not.toContain("<p>");
  });

  it("creates source and raw document insert shapes", () => {
    const normalized = normalizeTumblrPost(samplePost, fetchedAt);

    expect(normalized).not.toBeNull();

    const source = createTumblrSourceInsert(normalized!.blogName);
    const rawDocument = createTumblrRawDocumentInsert(normalized!);

    expect(source).toMatchObject({
      title: "beatles-source Tumblr",
      source_type: "tumblr",
      url: "https://beatles-source.tumblr.com",
      reliability_tier: 4,
    });
    expect(rawDocument).toMatchObject({
      external_id: "123",
      original_url: "https://beatles-source.tumblr.com/post/123/example",
      fetched_at: fetchedAt,
      metadata: {
        provider: "tumblr",
        tumblrPostId: "123",
        addsReblogCommentary: true,
      },
    });
    expect(rawDocument.content_hash).toHaveLength(64);
  });

  it("uses the Tumblr API response to produce documents and checkpoints", async () => {
    const fetcher: typeof fetch = async (input) => {
      const url = new URL(String(input));

      expect(url.toString()).toContain("api.tumblr.com");
      expect(url.searchParams.get("limit")).toBe("1");
      expect(url.searchParams.get("before")).toBe("1783526500");

      return new Response(
        JSON.stringify({
          response: {
            posts: [samplePost],
          },
        }),
        { status: 200 },
      );
    };

    const result = await collectTumblrBlog({
      blogIdentifier: "beatles-source",
      apiKey: "test-key",
      limit: 1,
      before: 1783526500,
      fetcher,
      fetchedAt: new Date(fetchedAt),
    });

    expect(result.documents).toHaveLength(1);
    expect(result.checkpoint).toMatchObject({
      blogIdentifier: "beatles-source",
      returnedCount: 1,
      newestTimestamp: 1783526400,
      oldestTimestamp: 1783526400,
      nextBefore: 1783526400,
    });
  });

  it("can request a single Tumblr post by ID", async () => {
    const fetcher: typeof fetch = async (input) => {
      const url = new URL(String(input));

      expect(url.searchParams.get("id")).toBe("123");
      expect(url.searchParams.get("limit")).toBe("1");

      return new Response(
        JSON.stringify({
          response: {
            posts: [samplePost],
          },
        }),
        { status: 200 },
      );
    };

    const result = await collectTumblrBlog({
      blogIdentifier: "beatles-source",
      apiKey: "test-key",
      limit: 1,
      postId: "123",
      fetcher,
      fetchedAt: new Date(fetchedAt),
    });

    expect(result.documents).toHaveLength(1);
    expect(result.documents[0]?.normalizedPost.tumblrPostId).toBe("123");
  });

  it("skips posts without required public URL or text", () => {
    expect(
      normalizeTumblrPost(
        {
          id_string: "missing-url",
          blog_name: "beatles-source",
          body: "text",
        },
        fetchedAt,
      ),
    ).toBeNull();
  });
});
