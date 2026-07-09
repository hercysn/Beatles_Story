import { createHash } from "node:crypto";

import type {
  RawDocumentInsert,
  SourceInsert,
} from "@beatles-story/shared-types";

export type TumblrPostTrailItem = {
  blog?: {
    name?: string;
    url?: string;
  };
  post?: {
    id?: string | number;
  };
  content?: string;
  content_raw?: string;
};

export type TumblrPhoto = {
  caption?: string;
  original_size?: {
    url?: string;
    width?: number;
    height?: number;
  };
  alt_sizes?: Array<{
    url?: string;
    width?: number;
    height?: number;
  }>;
};

export type TumblrPost = {
  id?: number;
  id_string?: string;
  type?: string;
  blog_name?: string;
  post_url?: string;
  post_author?: string;
  reblogged_from_name?: string;
  reblogged_from_url?: string;
  reblogged_root_name?: string;
  reblogged_root_url?: string;
  source_title?: string;
  source_url?: string;
  date?: string;
  timestamp?: number;
  tags?: string[];
  note_count?: number;
  title?: string;
  summary?: string;
  body?: string;
  text?: string;
  caption?: string;
  answer?: string;
  question?: string;
  photos?: TumblrPhoto[];
  trail?: TumblrPostTrailItem[];
  [key: string]: unknown;
};

export type TumblrFetchCheckpoint = {
  blogIdentifier: string;
  fetchedAt: string;
  newestTimestamp: number | null;
  oldestTimestamp: number | null;
  nextBefore: number | null;
  returnedCount: number;
};

export type TumblrCollectOptions = {
  blogIdentifier: string;
  apiKey: string;
  limit?: number;
  before?: number;
  offset?: number;
  postId?: string;
  fetcher?: typeof fetch;
  fetchedAt?: Date;
};

export type TumblrPostReference = {
  blogIdentifier: string;
  postId: string;
};

export type NormalizedTumblrPost = {
  tumblrPostId: string;
  blogName: string;
  originalPoster: string | null;
  reblogChain: string[];
  postUrl: string;
  postDate: string | null;
  tags: string[];
  text: string;
  imageMetadata: Array<{
    url: string;
    width: number | null;
    height: number | null;
    caption: string | null;
  }>;
  sourceLinks: Array<{
    title: string | null;
    url: string;
  }>;
  notesCount: number | null;
  fetchedAt: string;
  type: string | null;
  addsReblogCommentary: boolean;
};

export type CollectedTumblrDocument = {
  source: SourceInsert;
  rawDocument: Omit<RawDocumentInsert, "source_id">;
  normalizedPost: NormalizedTumblrPost;
};

type TumblrApiResponse = {
  response?: {
    posts?: TumblrPost[];
  };
  meta?: {
    status?: number;
    msg?: string;
  };
};

export async function collectTumblrBlog({
  blogIdentifier,
  apiKey,
  limit = 20,
  before,
  offset,
  postId,
  fetcher = fetch,
  fetchedAt = new Date(),
}: TumblrCollectOptions): Promise<TumblrCollectionResult> {
  validateLimit(limit);
  const url = buildTumblrPostsUrl({
    blogIdentifier,
    apiKey,
    limit,
    before,
    offset,
    postId,
  });
  const response = await fetcher(url);

  if (!response.ok) {
    throw new Error(`Tumblr request failed with status ${response.status}.`);
  }

  const payload = (await response.json()) as TumblrApiResponse;
  const posts = payload.response?.posts ?? [];
  const fetchedAtIso = fetchedAt.toISOString();
  const documents = posts
    .map((post) => normalizeTumblrPost(post, fetchedAtIso))
    .filter((post): post is NormalizedTumblrPost => Boolean(post))
    .map((post) => ({
      source: createTumblrSourceInsert(post.blogName),
      rawDocument: createTumblrRawDocumentInsert(post),
      normalizedPost: post,
    }));

  return {
    documents,
    checkpoint: createCheckpoint(blogIdentifier, fetchedAtIso, posts),
  };
}

export type TumblrCollectionResult = {
  documents: CollectedTumblrDocument[];
  checkpoint: TumblrFetchCheckpoint;
};

export function normalizeTumblrPost(
  post: TumblrPost,
  fetchedAt: string,
): NormalizedTumblrPost | null {
  const tumblrPostId = String(post.id_string ?? post.id ?? "").trim();
  const blogName = String(post.blog_name ?? "").trim();
  const postUrl = String(post.post_url ?? "").trim();
  const text = normalizeText(extractTextParts(post).join("\n\n"));

  if (!tumblrPostId || !blogName || !postUrl || !text) {
    return null;
  }

  const reblogChain = getReblogChain(post);
  const sourceLinks = getSourceLinks(post);

  return {
    tumblrPostId,
    blogName,
    originalPoster:
      cleanString(post.reblogged_root_name) ??
      cleanString(post.post_author) ??
      blogName,
    reblogChain,
    postUrl,
    postDate: getPublishedAt(post),
    tags: normalizeTags(post.tags ?? []),
    text,
    imageMetadata: getImageMetadata(post),
    sourceLinks,
    notesCount: typeof post.note_count === "number" ? post.note_count : null,
    fetchedAt,
    type: cleanString(post.type),
    addsReblogCommentary: addsReblogCommentary(post, text),
  };
}

export function createTumblrSourceInsert(blogName: string): SourceInsert {
  return {
    title: `${blogName} Tumblr`,
    source_type: "tumblr",
    author: blogName,
    publisher: "Tumblr",
    url: getTumblrBlogUrl(blogName),
    publication_date: null,
    original_language: null,
    reliability_tier: 4,
    rights_notes:
      "Collected for editorial review. Reblogs are not treated as independent historical sources unless they add meaningful commentary.",
  };
}

export function createTumblrRawDocumentInsert(
  post: NormalizedTumblrPost,
): Omit<RawDocumentInsert, "source_id"> {
  return {
    external_id: post.tumblrPostId,
    raw_text: post.text,
    normalized_text: post.text,
    original_url: post.postUrl,
    published_at: post.postDate,
    fetched_at: post.fetchedAt,
    content_hash: hashDocument(post),
    language: null,
    metadata: {
      provider: "tumblr",
      tumblrPostId: post.tumblrPostId,
      blogName: post.blogName,
      originalPoster: post.originalPoster,
      reblogChain: post.reblogChain,
      tags: post.tags,
      imageMetadata: post.imageMetadata,
      sourceLinks: post.sourceLinks,
      notesCount: post.notesCount,
      type: post.type,
      addsReblogCommentary: post.addsReblogCommentary,
    },
  };
}

export function getTumblrBlogUrl(blogName: string) {
  return `https://${normalizeTumblrBlogIdentifier(blogName)}.tumblr.com`;
}

export function normalizeTumblrBlogIdentifier(value: string) {
  const trimmed = value.trim();

  if (!trimmed) {
    return "";
  }

  try {
    const url = new URL(trimmed);
    const host = url.hostname.replace(/^www\./i, "");

    if (host === "tumblr.com") {
      return url.pathname.split("/").filter(Boolean)[0] ?? "";
    }

    if (host.endsWith(".tumblr.com")) {
      return host.replace(/\.tumblr\.com$/i, "");
    }
  } catch {
    // Plain blog names and domains are normalized below.
  }

  return trimmed
    .replace(/^@/, "")
    .replace(/^www\./i, "")
    .replace(/\.tumblr\.com$/i, "")
    .replace(/\/.*$/, "");
}

export function parseTumblrPostUrl(value: string): TumblrPostReference {
  const url = new URL(value);
  const host = url.hostname.replace(/^www\./i, "");
  const parts = url.pathname.split("/").filter(Boolean);

  if (host === "tumblr.com" && parts.length >= 2) {
    return {
      blogIdentifier: parts[0] ?? "",
      postId: parts[1] ?? "",
    };
  }

  if (host.endsWith(".tumblr.com") && parts.length >= 2) {
    return {
      blogIdentifier: host.replace(/\.tumblr\.com$/i, ""),
      postId: parts[1] ?? "",
    };
  }

  throw new Error("Unsupported Tumblr post URL format.");
}

function buildTumblrPostsUrl({
  blogIdentifier,
  apiKey,
  limit,
  before,
  offset,
  postId,
}: Required<Pick<TumblrCollectOptions, "blogIdentifier" | "apiKey" | "limit">> &
  Pick<TumblrCollectOptions, "before" | "offset" | "postId">) {
  const normalizedBlog = `${normalizeTumblrBlogIdentifier(blogIdentifier)}.tumblr.com`;
  const url = new URL(
    `https://api.tumblr.com/v2/blog/${encodeURIComponent(normalizedBlog)}/posts`,
  );

  url.searchParams.set("api_key", apiKey);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("npf", "true");
  url.searchParams.set("reblog_info", "true");

  if (postId) {
    url.searchParams.set("id", postId);
  }

  if (before) {
    url.searchParams.set("before", String(before));
  }

  if (typeof offset === "number") {
    url.searchParams.set("offset", String(offset));
  }

  return url;
}

function extractTextParts(post: TumblrPost) {
  return [
    post.title,
    post.summary,
    post.body,
    post.text,
    post.caption,
    post.question,
    post.answer,
    ...(post.trail ?? []).flatMap((item) => [item.content_raw, item.content]),
    ...(post.photos ?? []).map((photo) => photo.caption),
  ].filter((part): part is string => Boolean(cleanString(part)));
}

function getReblogChain(post: TumblrPost) {
  const names = [
    post.reblogged_root_name,
    ...(post.trail ?? []).map((item) => item.blog?.name),
    post.reblogged_from_name,
    post.blog_name,
  ];

  return [...new Set(names.map(cleanString).filter(Boolean) as string[])];
}

function getSourceLinks(post: TumblrPost) {
  const links = [
    {
      title: cleanString(post.source_title),
      url: cleanString(post.source_url),
    },
    {
      title: cleanString(post.reblogged_root_name),
      url: cleanString(post.reblogged_root_url),
    },
    {
      title: cleanString(post.reblogged_from_name),
      url: cleanString(post.reblogged_from_url),
    },
  ];

  return dedupeByUrl(
    links.filter(
      (link): link is { title: string | null; url: string } =>
        Boolean(link.url) && /^https?:\/\//i.test(link.url ?? ""),
    ),
  );
}

function getImageMetadata(post: TumblrPost) {
  return (post.photos ?? [])
    .map((photo) => {
      const image = photo.original_size ?? photo.alt_sizes?.[0];

      if (!image?.url) {
        return null;
      }

      return {
        url: image.url,
        width: image.width ?? null,
        height: image.height ?? null,
        caption: cleanString(photo.caption),
      };
    })
    .filter((image): image is NonNullable<typeof image> => Boolean(image));
}

function getPublishedAt(post: TumblrPost) {
  if (typeof post.timestamp === "number") {
    return new Date(post.timestamp * 1000).toISOString();
  }

  if (post.date) {
    const date = new Date(post.date);
    return Number.isNaN(date.getTime()) ? null : date.toISOString();
  }

  return null;
}

function normalizeTags(tags: string[]) {
  return [...new Set(tags.map((tag) => tag.trim()).filter(Boolean))];
}

function normalizeText(text: string) {
  return text
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function addsReblogCommentary(post: TumblrPost, normalizedText: string) {
  const ownText = normalizeText(
    [post.title, post.body, post.text, post.caption, post.answer]
      .filter((part): part is string => Boolean(cleanString(part)))
      .join("\n\n"),
  );

  return Boolean(post.reblogged_from_name && ownText && ownText !== normalizedText);
}

function hashDocument(post: NormalizedTumblrPost) {
  return createHash("sha256")
    .update([post.blogName, post.tumblrPostId, post.postUrl, post.text].join("\n"))
    .digest("hex");
}

function createCheckpoint(
  blogIdentifier: string,
  fetchedAt: string,
  posts: TumblrPost[],
): TumblrFetchCheckpoint {
  const timestamps = posts
    .map((post) => post.timestamp)
    .filter((timestamp): timestamp is number => typeof timestamp === "number");
  const newestTimestamp = timestamps.length ? Math.max(...timestamps) : null;
  const oldestTimestamp = timestamps.length ? Math.min(...timestamps) : null;

  return {
    blogIdentifier,
    fetchedAt,
    newestTimestamp,
    oldestTimestamp,
    nextBefore: oldestTimestamp,
    returnedCount: posts.length,
  };
}

function dedupeByUrl<T extends { url: string }>(links: T[]) {
  const seen = new Set<string>();

  return links.filter((link) => {
    if (seen.has(link.url)) {
      return false;
    }

    seen.add(link.url);
    return true;
  });
}

function cleanString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function validateLimit(limit: number) {
  if (!Number.isInteger(limit) || limit < 1 || limit > 50) {
    throw new Error("Tumblr collector limit must be an integer from 1 to 50.");
  }
}
