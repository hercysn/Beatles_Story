import type { PublicAnecdote } from "@/lib/content/public";
import type { Locale } from "@/lib/routes";

type ContentStatusBadgesProps = {
  anecdote: PublicAnecdote;
  locale?: Locale;
};

const badgeClassName =
  "inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold ring-1";

export function ContentStatusBadges({
  anecdote,
  locale = "en",
}: ContentStatusBadgesProps) {
  const badges = getBadges(anecdote, locale);

  if (badges.length === 0) {
    return null;
  }

  return (
    <>
      {badges.map((badge) => (
        <span key={badge.label} className={`${badgeClassName} ${badge.className}`}>
          {badge.label}
        </span>
      ))}
    </>
  );
}

function getBadges(anecdote: PublicAnecdote, locale: Locale) {
  const badges: Array<{ label: string; className: string }> = [];
  const labels = labelByLocale[locale];

  if (anecdote.verificationStatus === "human_verified") {
    badges.push({
      label: labels.humanVerified,
      className: "bg-grove text-ink ring-apple/25",
    });
  }

  if (anecdote.verificationStatus === "unverified") {
    badges.push({
      label: labels.unverified,
      className: "bg-mustard/15 text-ink ring-mustard/35",
    });
  }

  if (anecdote.verificationStatus === "disputed") {
    badges.push({
      label: labels.disputed,
      className: "bg-tomato/10 text-tomato ring-tomato/25",
    });
  }

  if (anecdote.aiAssisted) {
    badges.push({
      label: labels.aiAssisted,
      className: "bg-white text-ink ring-moss/35",
    });
  }

  if (anecdote.sourceStatus === "partially_sourced") {
    badges.push({
      label: labels.partiallySourced,
      className: "bg-white text-muted ring-ink/10",
    });
  }

  if (anecdote.sourceStatus === "unsourced") {
    badges.push({
      label: labels.unsourced,
      className: "bg-tomato/10 text-tomato ring-tomato/25",
    });
  }

  if (anecdote.translationStatus === "machine_translated") {
    badges.push({
      label: labels.machineTranslated,
      className: "bg-white text-muted ring-ink/10",
    });
  }

  if (anecdote.translationStatus === "needs_review") {
    badges.push({
      label: labels.translationNeedsReview,
      className: "bg-mustard/15 text-ink ring-mustard/35",
    });
  }

  if (anecdote.showingFallbackTranslation) {
    badges.push({
      label: labels.showingEnglishFallback,
      className: "bg-vinyl text-cream ring-vinyl/25",
    });
  }

  return badges;
}

const labelByLocale: Record<
  Locale,
  Record<
    | "humanVerified"
    | "unverified"
    | "disputed"
    | "aiAssisted"
    | "partiallySourced"
    | "unsourced"
    | "machineTranslated"
    | "translationNeedsReview"
    | "showingEnglishFallback",
    string
  >
> = {
  en: {
    humanVerified: "Human-verified",
    unverified: "Not human-verified",
    disputed: "Disputed",
    aiAssisted: "AI-assisted",
    partiallySourced: "Partially sourced",
    unsourced: "Unsourced",
    machineTranslated: "Machine translated",
    translationNeedsReview: "Translation needs review",
    showingEnglishFallback: "Showing English fallback",
  },
  zh: {
    humanVerified: "人工核实",
    unverified: "未人工核实",
    disputed: "有争议",
    aiAssisted: "AI 辅助",
    partiallySourced: "部分来源支持",
    unsourced: "暂无来源",
    machineTranslated: "机器翻译",
    translationNeedsReview: "翻译待审",
    showingEnglishFallback: "显示英文备用内容",
  },
};
