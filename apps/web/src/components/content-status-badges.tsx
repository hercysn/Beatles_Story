import type { PublicAnecdote } from "@/lib/content/public";

type ContentStatusBadgesProps = {
  anecdote: PublicAnecdote;
};

const badgeClassName =
  "inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold ring-1";

export function ContentStatusBadges({ anecdote }: ContentStatusBadgesProps) {
  const badges = getBadges(anecdote);

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

function getBadges(anecdote: PublicAnecdote) {
  const badges: Array<{ label: string; className: string }> = [];

  if (anecdote.verificationStatus === "human_verified") {
    badges.push({
      label: "Human-verified",
      className: "bg-grove text-ink ring-apple/25",
    });
  }

  if (anecdote.verificationStatus === "unverified") {
    badges.push({
      label: "Unverified",
      className: "bg-mustard/15 text-ink ring-mustard/35",
    });
  }

  if (anecdote.verificationStatus === "disputed") {
    badges.push({
      label: "Disputed",
      className: "bg-tomato/10 text-tomato ring-tomato/25",
    });
  }

  if (anecdote.aiAssisted) {
    badges.push({
      label: "AI-assisted",
      className: "bg-white text-ink ring-moss/35",
    });
  }

  if (anecdote.sourceStatus === "partially_sourced") {
    badges.push({
      label: "Partially sourced",
      className: "bg-white text-muted ring-ink/10",
    });
  }

  if (anecdote.sourceStatus === "unsourced") {
    badges.push({
      label: "Unsourced",
      className: "bg-tomato/10 text-tomato ring-tomato/25",
    });
  }

  if (anecdote.translationStatus === "machine_translated") {
    badges.push({
      label: "Machine translated",
      className: "bg-white text-muted ring-ink/10",
    });
  }

  if (anecdote.translationStatus === "needs_review") {
    badges.push({
      label: "Translation needs review",
      className: "bg-mustard/15 text-ink ring-mustard/35",
    });
  }

  if (anecdote.showingFallbackTranslation) {
    badges.push({
      label: "Showing English fallback",
      className: "bg-vinyl text-cream ring-vinyl/25",
    });
  }

  return badges;
}
