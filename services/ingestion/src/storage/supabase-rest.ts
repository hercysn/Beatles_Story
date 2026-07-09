import type {
  RawDocumentInsert,
  Source,
  SourceInsert,
} from "@beatles-story/shared-types";

type SupabaseRestOptions = {
  supabaseUrl: string;
  serviceRoleKey: string;
  fetcher?: typeof fetch;
};

export type StoredRawDocument = {
  id: string;
  external_id: string | null;
};

export class SupabaseRestStorage {
  private readonly supabaseUrl: string;
  private readonly serviceRoleKey: string;
  private readonly fetcher: typeof fetch;

  constructor({
    supabaseUrl,
    serviceRoleKey,
    fetcher = fetch,
  }: SupabaseRestOptions) {
    this.supabaseUrl = supabaseUrl.replace(/\/$/, "");
    this.serviceRoleKey = serviceRoleKey;
    this.fetcher = fetcher;
  }

  async upsertSource(source: SourceInsert): Promise<Pick<Source, "id">> {
    const existing = await this.request<Array<Pick<Source, "id">>>(
      `sources?select=id&url=eq.${encodeURIComponent(source.url ?? "")}&source_type=eq.tumblr&limit=1`,
    );

    if (existing[0]) {
      return existing[0];
    }

    const created = await this.request<Array<Pick<Source, "id">>>("sources", {
      method: "POST",
      body: JSON.stringify(source),
      headers: {
        Prefer: "return=representation",
      },
    });

    if (!created[0]) {
      throw new Error("Supabase did not return the created source row.");
    }

    return created[0];
  }

  async upsertRawDocument(
    rawDocument: RawDocumentInsert,
  ): Promise<StoredRawDocument> {
    const rows = await this.request<StoredRawDocument[]>(
      "raw_documents?on_conflict=source_id,external_id",
      {
        method: "POST",
        body: JSON.stringify(rawDocument),
        headers: {
          Prefer: "resolution=merge-duplicates,return=representation",
        },
      },
    );

    if (!rows[0]) {
      throw new Error("Supabase did not return the upserted raw document row.");
    }

    return rows[0];
  }

  private async request<T>(
    path: string,
    init: RequestInit & { headers?: Record<string, string> } = {},
  ): Promise<T> {
    const response = await this.fetcher(`${this.supabaseUrl}/rest/v1/${path}`, {
      ...init,
      headers: {
        apikey: this.serviceRoleKey,
        Authorization: `Bearer ${this.serviceRoleKey}`,
        "Content-Type": "application/json",
        ...init.headers,
      },
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(
        `Supabase REST request failed with status ${response.status}: ${body}`,
      );
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return (await response.json()) as T;
  }
}
