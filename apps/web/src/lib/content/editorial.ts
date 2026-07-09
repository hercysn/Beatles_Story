import type { Locale } from "@/i18n/routing";
import {
  getPublicAnecdoteSlugs,
  getPublicAnecdotes,
  type PublicAnecdote,
  type PublicEvidenceStatus,
} from "@/lib/content/public";

export type EditorialReviewStatus =
  | "approved"
  | "review"
  | "needs-source"
  | "provisional";

type EditorialQueue = {
  id: string;
  label: string;
  count: number;
};

type EditorialMetric = {
  label: string;
  value: string;
};

export type EditorialAnecdote = PublicAnecdote & {
  canonicalSlug: string;
  reviewStatus: EditorialReviewStatus;
  confidenceLabel: string;
  sourceCount: number;
  documentedClaimCount: number;
  interpretationClaimCount: number;
  hasQuote: boolean;
  sourceWarning?: string;
};

export type EditorialDashboard = {
  labels: {
    title: string;
    subtitle: string;
    reviewQueues: string;
    contentHealth: string;
    anecdoteEditor: string;
    documentedClaims: string;
    interpretationClaims: string;
    sources: string;
    quote: string;
    translation: string;
    openPublicPage: string;
    approve: string;
    requestChanges: string;
    attachSource: string;
    ingestionQueue: string;
    notAvailable: string;
  };
  queues: EditorialQueue[];
  metrics: EditorialMetric[];
  anecdotes: EditorialAnecdote[];
};

const labelsByLocale: Record<Locale, EditorialDashboard["labels"]> = {
  en: {
    title: "Editorial dashboard",
    subtitle: "Review queues, source checks, claims, and translations.",
    reviewQueues: "Review queues",
    contentHealth: "Content health",
    anecdoteEditor: "Anecdote editor",
    documentedClaims: "Documented claims",
    interpretationClaims: "Interpretation",
    sources: "Sources",
    quote: "Quote",
    translation: "Translation",
    openPublicPage: "Open public page",
    approve: "Approve",
    requestChanges: "Request changes",
    attachSource: "Attach source",
    ingestionQueue: "Ingestion queue",
    notAvailable: "Not available",
  },
  zh: {
    title: "编辑后台",
    subtitle: "审核队列、来源检查、论断与翻译状态。",
    reviewQueues: "审核队列",
    contentHealth: "内容状态",
    anecdoteEditor: "轶事编辑器",
    documentedClaims: "已记录论断",
    interpretationClaims: "解释部分",
    sources: "来源",
    quote: "引文",
    translation: "翻译",
    openPublicPage: "打开公开页面",
    approve: "通过",
    requestChanges: "请求修改",
    attachSource: "附加来源",
    ingestionQueue: "采集队列",
    notAvailable: "暂无",
  },
};

const reviewLabelByLocale: Record<
  Locale,
  Record<EditorialReviewStatus, string>
> = {
  en: {
    approved: "Approved",
    review: "In review",
    "needs-source": "Needs source",
    provisional: "Provisional",
  },
  zh: {
    approved: "已通过",
    review: "审核中",
    "needs-source": "需要来源",
    provisional: "临时",
  },
};

export async function getEditorialDashboard(
  locale: Locale,
): Promise<EditorialDashboard> {
  const [publicAnecdotes, canonicalSlugs] = await Promise.all([
    getPublicAnecdotes(locale),
    getPublicAnecdoteSlugs(),
  ]);
  const anecdotes = publicAnecdotes.map((anecdote, index) =>
    toEditorialAnecdote(locale, anecdote, canonicalSlugs[index] ?? anecdote.slug),
  );
  const pendingReviewCount = anecdotes.filter(
    (item) => item.reviewStatus !== "approved",
  ).length;
  const sourceIssueCount = anecdotes.filter((item) => item.sourceWarning).length;
  const quoteCount = anecdotes.filter((item) => item.hasQuote).length;

  return {
    labels: labelsByLocale[locale],
    queues: [
      {
        id: "new-documents",
        label: locale === "zh" ? "新采集文档" : "New documents",
        count: 0,
      },
      {
        id: "anecdote-review",
        label: locale === "zh" ? "轶事审核" : "Anecdote review",
        count: pendingReviewCount,
      },
      {
        id: "source-checks",
        label: locale === "zh" ? "来源检查" : "Source checks",
        count: sourceIssueCount,
      },
      {
        id: "translation-review",
        label: locale === "zh" ? "翻译审核" : "Translation review",
        count: locale === "zh" ? anecdotes.length : 0,
      },
      {
        id: "connection-suggestions",
        label: locale === "zh" ? "连接建议" : "Connection suggestions",
        count: anecdotes.reduce(
          (total, item) => total + item.connectionChain.length,
          0,
        ),
      },
    ],
    metrics: [
      {
        label: locale === "zh" ? "公开轶事" : "Public anecdotes",
        value: String(anecdotes.length),
      },
      {
        label: locale === "zh" ? "待处理" : "Needs attention",
        value: String(pendingReviewCount),
      },
      {
        label: locale === "zh" ? "含引文" : "With quotes",
        value: `${quoteCount}/${anecdotes.length}`,
      },
      {
        label: locale === "zh" ? "来源总数" : "Total sources",
        value: String(
          anecdotes.reduce((total, item) => total + item.sourceCount, 0),
        ),
      },
    ],
    anecdotes,
  };
}

function toEditorialAnecdote(
  locale: Locale,
  anecdote: PublicAnecdote,
  canonicalSlug: string,
): EditorialAnecdote {
  const reviewStatus = getReviewStatus(anecdote.evidenceStatus);
  const sourceWarning = getSourceWarning(locale, anecdote);

  return {
    ...anecdote,
    canonicalSlug,
    reviewStatus,
    confidenceLabel: reviewLabelByLocale[locale][reviewStatus],
    sourceCount: anecdote.sources.length,
    documentedClaimCount: anecdote.sections.documented.length,
    interpretationClaimCount: anecdote.sections.interpretation.length,
    hasQuote: Boolean(anecdote.quote),
    sourceWarning,
  };
}

function getReviewStatus(
  evidenceStatus: PublicEvidenceStatus,
): EditorialReviewStatus {
  if (evidenceStatus === "Fandom theory") {
    return "provisional";
  }

  if (evidenceStatus === "Interpretive connection") {
    return "review";
  }

  if (evidenceStatus === "Disputed recollection") {
    return "needs-source";
  }

  return "approved";
}

function getSourceWarning(locale: Locale, anecdote: PublicAnecdote) {
  if (anecdote.evidenceStatus === "Fandom theory") {
    return locale === "zh"
      ? "需要确认原始访谈、完整措辞和公开视频来源。"
      : "Confirm the original interview, full wording, and official footage source.";
  }

  if (anecdote.sources.length < 2) {
    return locale === "zh"
      ? "建议至少附加两个独立来源。"
      : "Attach at least two independent sources.";
  }

  return undefined;
}
