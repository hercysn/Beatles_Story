import type { ReactNode } from "react";

import { ConnectionChain } from "@/components/connection-chain";
import { EvidenceLabel } from "@/components/evidence-label";
import { LocalizedLink } from "@/components/localized-link";
import type {
  PublicAnecdote,
  PublicAnecdoteDetailLabels,
} from "@/lib/content/public";

type AnecdoteDetailProps = {
  anecdote: PublicAnecdote;
  labels: PublicAnecdoteDetailLabels;
};

export function AnecdoteDetail({ anecdote, labels }: AnecdoteDetailProps) {
  return (
    <article className="mx-auto w-full max-w-5xl px-6 py-14 sm:py-20">
      <header className="border-l-4 border-apple pl-6">
        <EvidenceLabel status={anecdote.evidenceStatus} />
        <h1 className="mt-3 text-3xl font-semibold leading-tight text-ink sm:text-5xl">
          {anecdote.title}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
          {anecdote.hook}
        </p>
        {anecdote.quote ? (
          <figure className="mt-6 max-w-3xl border-l-2 border-mustard pl-4">
            <blockquote className="text-lg font-medium leading-8 text-ink">
              “{anecdote.quote.text}”
            </blockquote>
            <figcaption className="mt-2 text-sm text-muted">
              {anecdote.quote.attribution}
            </figcaption>
          </figure>
        ) : null}
      </header>

      <dl className="mt-8 grid gap-3 rounded-lg border border-ink/10 bg-cream p-5 text-sm sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <dt className="font-semibold text-ink">{labels.date}</dt>
          <dd className="mt-1 text-muted">{anecdote.dateLabel}</dd>
        </div>
        <div>
          <dt className="font-semibold text-ink">{labels.people}</dt>
          <dd className="mt-1 text-muted">{anecdote.people.join(" · ")}</dd>
        </div>
        <div>
          <dt className="font-semibold text-ink">{labels.place}</dt>
          <dd className="mt-1 text-muted">{anecdote.place}</dd>
        </div>
        <div>
          <dt className="font-semibold text-ink">
            {labels.beginnerRelevance}
          </dt>
          <dd className="mt-1 text-muted">{anecdote.beginnerRelevance}</dd>
        </div>
      </dl>

      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="space-y-10">
          <DetailSection title={labels.happened}>
            <p>{anecdote.sections.happened}</p>
          </DetailSection>
          <DetailSection title={labels.whyInteresting}>
            <p>{anecdote.sections.whyInteresting}</p>
          </DetailSection>
          <DetailSection title={labels.before}>
            <p>{anecdote.sections.before}</p>
          </DetailSection>
          <DetailSection title={labels.connection}>
            <p>{anecdote.sections.connection}</p>
          </DetailSection>
          <DetailSection title={labels.documented}>
            <ul className="space-y-2">
              {anecdote.sections.documented.map((claim) => (
                <li key={claim}>{claim}</li>
              ))}
            </ul>
          </DetailSection>
          <DetailSection title={labels.interpretation}>
            <ul className="space-y-2">
              {anecdote.sections.interpretation.map((claim) => (
                <li key={claim}>{claim}</li>
              ))}
            </ul>
          </DetailSection>
        </div>

        <aside className="space-y-8">
          <section>
            <h2 className="text-lg font-semibold text-ink">
              {labels.connectionChain}
            </h2>
            <div className="mt-4">
              <ConnectionChain items={anecdote.connectionChain} />
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink">
              {labels.sources}
            </h2>
            <div className="mt-4 space-y-3">
              {anecdote.sources.map((source) => (
                <div
                  key={source.title}
                  className="rounded-lg border border-ink/10 bg-cream p-4"
                >
                  {source.url ? (
                    <a
                      href={source.url}
                      className="text-sm font-semibold text-apple underline-offset-4 hover:underline"
                      rel="noreferrer"
                      target="_blank"
                    >
                      {source.title}
                    </a>
                  ) : (
                    <h3 className="text-sm font-semibold text-ink">
                      {source.title}
                    </h3>
                  )}
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {source.detail}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-ink">
              {labels.related}
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {anecdote.related.map((item) => (
                <LocalizedLink
                  key={item}
                  href={getTagHref(item)}
                  className="rounded-full bg-vinyl px-3 py-1 text-xs font-medium text-cream"
                >
                  {item}
                </LocalizedLink>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </article>
  );
}

function getTagHref(tag: string) {
  return `/anecdotes?tag=${encodeURIComponent(tag)}`;
}

type DetailSectionProps = {
  title: string;
  children: ReactNode;
};

function DetailSection({ title, children }: DetailSectionProps) {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-ink">{title}</h2>
      <div className="mt-3 text-base leading-7 text-muted">{children}</div>
    </section>
  );
}
