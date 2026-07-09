import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";

import { afterEach, describe, expect, it } from "vitest";

import { loadIngestionEnv } from "./env.js";

const envKeys = ["TUMBLR_API_KEY", "SUPABASE_SERVICE_ROLE_KEY"];

describe("loadIngestionEnv", () => {
  afterEach(() => {
    for (const key of envKeys) {
      delete process.env[key];
    }
  });

  it("loads .env.local without overriding existing shell variables", async () => {
    const directory = await mkdtemp(join(tmpdir(), "beatles-ingestion-env-"));

    try {
      process.env.SUPABASE_SERVICE_ROLE_KEY = "from-shell";
      await writeFile(
        join(directory, ".env.local"),
        [
          "TUMBLR_API_KEY='from-file'",
          "SUPABASE_SERVICE_ROLE_KEY=from-file",
          "# ignored comment",
          "",
        ].join("\n"),
        "utf8",
      );

      loadIngestionEnv(directory);

      expect(process.env.TUMBLR_API_KEY).toBe("from-file");
      expect(process.env.SUPABASE_SERVICE_ROLE_KEY).toBe("from-shell");
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });
});
