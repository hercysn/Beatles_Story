import { EvidenceLabel } from "@/components/evidence-label";
import { LocalizedLink } from "@/components/localized-link";
import type { AnecdoteFixture } from "@/content/anecdotes";

type AnecdoteCardProps = {
  anecdote: AnecdoteFixture;
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
    <article className="flex h-full flex-col rounded-lg border border-ink/10 bg-cream p-5 shadow-sm shadow-ink/5 transition hover:-translate-y-0.5 hover:border-apple hover:bg-white">
      <div className="flex flex-wrap gap-2">
        <EvidenceLabel status={anecdote.evidenceStatus} />
        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-muted ring-1 ring-ink/10">
          {anecdote.dateLabel}
        </span>
      </div>

      <h2 className="mt-4 text-xl font-semibold leading-snug text-ink">
        {anecdote.title}
      </h2>
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

      <div className="mt-5 flex flex-wrap gap-2">
        {anecdote.tone.map((tone) => (
          <span
            key={tone}
            className="rounded-full bg-paper px-3 py-1 text-xs font-medium text-muted ring-1 ring-ink/10"
          >
            {tone}
          </span>
        ))}
      </div>

      <LocalizedLink
        href={`/anecdotes/${anecdote.slug}`}
        className="mt-6 inline-flex w-fit items-center font-semibold text-apple underline-offset-4 hover:underline"
      >
        {readLabel}
      </LocalizedLink>
    </article>
  );
}
