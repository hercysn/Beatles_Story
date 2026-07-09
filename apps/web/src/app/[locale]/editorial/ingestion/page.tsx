import { connection } from "next/server";

import { LocalizedLink } from "@/components/localized-link";
import { RawDocumentReviewForm } from "@/components/raw-document-review-form";
import type { Locale } from "@/i18n/routing";
import { getEditorialAccess } from "@/lib/content/admin";
import { getIngestionDocuments } from "@/lib/content/ingestion";

type IngestionPageProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = "force-dynamic";

const labelsByLocale = {
  en: {
    title: "Ingestion queue",
    subtitle: "Private Tumblr and raw-source material waiting for review.",
    back: "Back to editorial",
    empty: "No raw documents found.",
    fetched: "Fetched",
    published: "Published",
    source: "Source",
    original: "Open original",
    sourceLink: "Source link",
    media: "Media",
    notes: "Notes",
    commentary: "Reblog commentary",
    accessTitle: "Editorial access required",
    reviewStatus: "Review status",
    reviewNotes: "Review notes",
    saveReview: "Save review",
    saved: "Saved",
    saving: "Saving...",
    statusNew: "New",
    statusReviewing: "Reviewing",
    statusApprovedForConversion: "Approved for conversion",
    statusIgnored: "Ignored",
    statusConverted: "Converted",
  },
  zh: {
    title: "采集队列",
    subtitle: "等待审核的私有 Tumblr 与原始来源材料。",
    back: "返回编辑后台",
    empty: "暂无原始文档。",
    fetched: "采集时间",
    published: "发布时间",
    source: "来源",
    original: "打开原文",
    sourceLink: "来源链接",
    media: "媒体",
    notes: "互动数",
    commentary: "转发评论",
    accessTitle: "需要编辑权限",
    reviewStatus: "审核状态",
    reviewNotes: "审核备注",
    saveReview: "保存审核",
    saved: "已保存",
    saving: "保存中...",
    statusNew: "新导入",
    statusReviewing: "审核中",
    statusApprovedForConversion: "批准转换",
    statusIgnored: "已忽略",
    statusConverted: "已转换",
  },
} satisfies Record<Locale, Record<string, string>>;

const reviewStatusOptions = [
  ["new", "statusNew"],
  ["reviewing", "statusReviewing"],
  ["approved_for_conversion", "statusApprovedForConversion"],
  ["ignored", "statusIgnored"],
  ["converted", "statusConverted"],
] as const;

export default async function EditorialIngestionPage({
  params,
}: IngestionPageProps) {
  await connection();
  const { locale } = await params;
  const currentLocale = locale as Locale;
  const labels = labelsByLocale[currentLocale] ?? labelsByLocale.en;
  const access = await getEditorialAccess();

  if (!access.allowed) {
    return (
      <main className="mx-auto w-full max-w-3xl px-6 py-14 sm:py-20">
        <div className="border-l-4 border-tomato pl-6">
          <h1 className="text-3xl font-semibold text-ink">
            {labels.accessTitle}
          </h1>
          <p className="mt-4 text-base leading-7 text-muted">
            {access.message}
          </p>
          <LocalizedLink
            href={`/editorial/login?redirectTo=/${currentLocale}/editorial/ingestion`}
            className="mt-6 inline-flex rounded-lg bg-apple px-4 py-2 text-sm font-semibold text-white"
          >
            {currentLocale === "zh" ? "编辑登录" : "Editorial login"}
          </LocalizedLink>
        </div>
      </main>
    );
  }

  const documents = await getIngestionDocuments();

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-10 sm:py-14">
      <header className="border-b border-ink/10 pb-8">
        <LocalizedLink
          href="/editorial"
          className="text-sm font-semibold text-apple underline-offset-4 hover:underline"
        >
          {labels.back}
        </LocalizedLink>
        <h1 className="mt-4 text-3xl font-semibold text-ink sm:text-5xl">
          {labels.title}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted">
          {labels.subtitle}
        </p>
      </header>

      {documents.length === 0 ? (
        <p className="mt-8 rounded-lg border border-ink/10 bg-cream p-5 text-sm text-muted">
          {labels.empty}
        </p>
      ) : (
        <section className="mt-8 space-y-4">
          {documents.map((document) => (
            <article
              key={document.id}
              className="rounded-lg border border-ink/10 bg-cream p-5"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap gap-2">
                    {document.provider ? (
                      <Badge>{document.provider}</Badge>
                    ) : null}
                    {document.blogName ? <Badge>{document.blogName}</Badge> : null}
                    {document.externalId ? (
                      <Badge>{document.externalId}</Badge>
                    ) : null}
                  </div>
                  <h2 className="mt-3 text-lg font-semibold text-ink">
                    {document.sourceTitle}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-muted">
                    {document.rawTextPreview}
                  </p>
                </div>
                <a
                  href={document.originalUrl}
                  className="inline-flex w-fit rounded-lg bg-apple px-3 py-2 text-sm font-semibold text-white"
                  rel="noreferrer"
                  target="_blank"
                >
                  {labels.original}
                </a>
              </div>

              <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
                <MetaItem label={labels.fetched} value={formatDate(document.fetchedAt)} />
                <MetaItem
                  label={labels.published}
                  value={formatDate(document.publishedAt)}
                />
                <MetaItem label={labels.media} value={String(document.imageCount)} />
                <MetaItem
                  label={labels.notes}
                  value={
                    document.notesCount === null ? "n/a" : String(document.notesCount)
                  }
                />
              </dl>

              <div className="mt-4 flex flex-wrap gap-2">
                {document.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
                {document.addsReblogCommentary ? (
                  <Badge>{labels.commentary}</Badge>
                ) : null}
              </div>

              {document.sourceLinks.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-3 text-sm">
                  {document.sourceLinks.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      className="font-semibold text-apple underline-offset-4 hover:underline"
                      rel="noreferrer"
                      target="_blank"
                    >
                      {link.title ?? labels.sourceLink}
                    </a>
                  ))}
                </div>
              ) : null}

              <RawDocumentReviewForm
                initialReviewNotes={document.reviewNotes ?? ""}
                initialReviewStatus={document.reviewStatus}
                labels={{
                  reviewStatus: labels.reviewStatus,
                  reviewNotes: labels.reviewNotes,
                  saveReview: labels.saveReview,
                  saved: labels.saved,
                  saving: labels.saving,
                }}
                rawDocumentId={document.id}
                statusOptions={reviewStatusOptions.map(([value, labelKey]) => ({
                  value,
                  label: labels[labelKey],
                }))}
              />
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

function Badge({ children }: { children: string }) {
  return (
    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-muted ring-1 ring-ink/10">
      {children}
    </span>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-semibold text-ink">{label}</dt>
      <dd className="mt-1 text-muted">{value}</dd>
    </div>
  );
}

function formatDate(value: string | null) {
  if (!value) {
    return "n/a";
  }

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
