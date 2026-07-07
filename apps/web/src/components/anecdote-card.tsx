import { ContentStatusBadges } from "@/components/content-status-badges";
import { EvidenceLabel } from "@/components/evidence-label";
import { LocalizedLink } from "@/components/localized-link";
import type { PublicAnecdote } from "@/lib/content/public";

type AnecdoteCardProps = {
  anecdote: PublicAnecdote;
  readLabel: string;
  peopleLabel: string;
  placeLabel: string;
};

export function AnecdoteCard({
  anecdote,
  readLabel,
  peopleLabel,
  placeLabel,
}: AnecdoteCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-lg border border-ink/10 bg-cream p-5 shadow-sm shadow-ink/5 transition hover:-translate-y-0.5 hover:border-apple hover:bg-white">
      <div className="flex flex-wrap gap-2">
        <EvidenceLabel status={anecdote.evidenceStatus} />
        <ContentStatusBadges anecdote={anecdote} />
        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-muted ring-1 ring-ink/10">
          {anecdote.dateLabel}
        </span>
      </div>

      <h2 className="mt-4 text-xl font-semibold leading-snug text-ink">
        {anecdote.title}
      </h2>

      <div className="mt-3 flex flex-wrap gap-2">
        {anecdote.tone.map((tone) => (
          <LocalizedLink
            key={tone}
            href={getTagHref(tone)}
            className="rounded-full bg-paper px-3 py-1 text-xs font-medium text-muted ring-1 ring-ink/10 transition hover:-translate-y-0.5 hover:bg-white hover:text-ink"
          >
            {tone}
          </LocalizedLink>
        ))}
      </div>

      <p className="mt-3 text-sm leading-6 text-muted">{anecdote.hook}</p>

      <dl className="mt-5 grid gap-3 text-sm">
        <div>
          <dt className="sr-only">{peopleLabel}</dt>
          <dd className="text-ink">{anecdote.people.join(" · ")}</dd>
        </div>
        <div>
          <dt className="sr-only">{placeLabel}</dt>
          <dd className="text-muted">{anecdote.place}</dd>
        </div>
      </dl>

      <LocalizedLink
        href={`/anecdotes/${anecdote.slug}`}
        className="mt-6 inline-flex w-fit items-center font-semibold text-apple underline decoration-transparent underline-offset-4 transition group-hover:decoration-apple hover:decoration-apple focus-visible:decoration-apple focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple/40"
      >
        {readLabel}
      </LocalizedLink>
    </article>
  );
}

function getTagHref(tag: string) {
  return `/anecdotes?tag=${encodeURIComponent(tag)}`;
}
