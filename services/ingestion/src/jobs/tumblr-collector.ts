import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

import type { RawDocumentInsert } from "@beatles-story/shared-types";

import {
  collectTumblrBlog,
  parseTumblrPostUrl,
  type CollectedTumblrDocument,
} from "../collectors/tumblr.js";
import { loadIngestionEnv } from "../config/env.js";
import { SupabaseRestStorage } from "../storage/supabase-rest.js";

type CliOptions = {
  blog: string;
  limit: number;
  postId?: string;
  before?: number;
  offset?: number;
  out?: string;
  checkpointOut?: string;
  writeSupabase: boolean;
};

async function main() {
  loadIngestionEnv();
  const options = parseArgs(process.argv.slice(2));
  const apiKey = getRequiredEnv("TUMBLR_API_KEY");
  const result = await collectTumblrBlog({
    blogIdentifier: options.blog,
    apiKey,
    limit: options.limit,
    before: options.before,
    offset: options.offset,
    postId: options.postId,
  });

  if (options.writeSupabase) {
    const storage = new SupabaseRestStorage({
      supabaseUrl: getRequiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
      serviceRoleKey: getRequiredEnv("SUPABASE_SERVICE_ROLE_KEY"),
    });

    for (const document of result.documents) {
      const source = await storage.upsertSource(document.source);
      await storage.upsertRawDocument({
        ...document.rawDocument,
        source_id: source.id,
      } satisfies RawDocumentInsert);
    }
  }

  if (options.out) {
    await writeJsonl(options.out, result.documents);
  } else {
    for (const document of result.documents) {
      console.log(JSON.stringify(document));
    }
  }

  if (options.checkpointOut) {
    await writeText(
      options.checkpointOut,
      `${JSON.stringify(result.checkpoint, null, 2)}\n`,
    );
  }

  console.error(
    JSON.stringify({
      blog: result.checkpoint.blogIdentifier,
      collected: result.documents.length,
      nextBefore: result.checkpoint.nextBefore,
      wroteSupabase: options.writeSupabase,
    }),
  );
}

function parseArgs(args: string[]): CliOptions {
  const options: CliOptions = {
    blog: "",
    limit: 20,
    writeSupabase: false,
  };

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];

    switch (arg) {
      case "--":
        break;
      case "--blog":
        options.blog = getArgValue(args, (index += 1), "--blog");
        break;
      case "--post-url": {
        const post = parseTumblrPostUrl(
          getArgValue(args, (index += 1), "--post-url"),
        );

        if (options.blog && options.blog !== post.blogIdentifier) {
          throw new Error("--post-url cannot be combined with a different --blog.");
        }

        options.blog = post.blogIdentifier;
        options.postId = post.postId;
        options.limit = 1;
        break;
      }
      case "--post-id":
        options.postId = getArgValue(args, (index += 1), "--post-id");
        options.limit = 1;
        break;
      case "--limit":
        options.limit = Number(getArgValue(args, (index += 1), "--limit"));
        break;
      case "--before":
        options.before = Number(getArgValue(args, (index += 1), "--before"));
        break;
      case "--offset":
        options.offset = Number(getArgValue(args, (index += 1), "--offset"));
        break;
      case "--out":
        options.out = getArgValue(args, (index += 1), "--out");
        break;
      case "--checkpoint-out":
        options.checkpointOut = getArgValue(args, (index += 1), "--checkpoint-out");
        break;
      case "--write-supabase":
        options.writeSupabase = true;
        break;
      default:
        throw new Error(`Unsupported argument: ${arg}`);
    }
  }

  if (!options.blog) {
    throw new Error("Missing required argument: --blog");
  }

  if (!Number.isInteger(options.limit) || options.limit < 1 || options.limit > 50) {
    throw new Error("--limit must be an integer from 1 to 50.");
  }

  return options;
}

function getArgValue(args: string[], index: number, name: string) {
  const value = args[index];

  if (!value || value.startsWith("--")) {
    throw new Error(`Missing value for ${name}.`);
  }

  return value;
}

function getRequiredEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

async function writeJsonl(path: string, documents: CollectedTumblrDocument[]) {
  await writeText(
    path,
    documents.map((document) => JSON.stringify(document)).join("\n") + "\n",
  );
}

async function writeText(path: string, content: string) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, content, "utf8");
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
