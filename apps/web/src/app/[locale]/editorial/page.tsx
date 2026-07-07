import type { ReactNode } from "react";

import { LocalizedLink } from "@/components/localized-link";
import type { Locale } from "@/i18n/routing";
import { getEditorialDashboard } from "@/lib/content/editorial";

type EditorialPageProps = {
  params: Promise<{ locale: string }>;
};

const statusClassName = {
  approved: "bg-grove text-ink ring-apple/25",
  review: "bg-mustard/15 text-ink ring-mustard/35",
  "needs-source": "bg-tomato/10 text-tomato ring-tomato/25",
  provisional: "bg-vinyl text-cream ring-vinyl/25",
};

export default async function EditorialPage({ params }: EditorialPageProps) {
  const { locale } = await params;
  const dashboard = getEditorialDashboard(locale as Locale);

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-10 sm:py-14">
      <header className="grid gap-6 border-b border-ink/10 pb-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase text-apple">
            Beatles Story
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-ink sm:text-5xl">
            {dashboard.labels.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
            {dashboard.labels.subtitle}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            className="rounded-lg bg-apple px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-ink/10"
            type="button"
          >
            {dashboard.labels.approve}
          </button>
          <button
            className="rounded-lg border border-ink/10 bg-cream px-4 py-2 text-sm font-semibold text-ink"
            type="button"
          >
            {dashboard.labels.requestChanges}
          </button>
          <button
            className="rounded-lg border border-ink/10 bg-cream px-4 py-2 text-sm font-semibold text-ink"
            type="button"
          >
            {dashboard.labels.attachSource}
          </button>
        </div>
      </header>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-ink">
          {dashboard.labels.contentHealth}
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dashboard.metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-lg border border-ink/10 bg-cream p-4"
            >
              <p className="text-sm font-medium text-muted">{metric.label}</p>
              <p className="mt-2 text-3xl font-semibold text-ink">
                {metric.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-10 grid gap-8 lg:grid-cols-[18rem_minmax(0,1fr)]">
        <aside className="space-y-8">
          <section>
            <h2 className="text-lg font-semibold text-ink">
              {dashboard.labels.reviewQueues}
            </h2>
            <div className="mt-4 space-y-2">
              {dashboard.queues.map((queue) => (
                <div
                  key={queue.id}
                  className="flex items-center justify-between rounded-lg border border-ink/10 bg-cream px-4 py-3"
                >
                  <span className="text-sm font-medium text-ink">
                    {queue.label}
                  </span>
                  <span className="rounded-full bg-paper px-3 py-1 text-sm font-semibold text-muted ring-1 ring-ink/10">
                    {queue.count}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </aside>

        <section>
          <h2 className="text-lg font-semibold text-ink">
            {dashboard.labels.anecdoteEditor}
          </h2>
          <div className="mt-4 space-y-4">
            {dashboard.anecdotes.map((anecdote) => (
              <article
                key={anecdote.slug}
                className="rounded-lg border border-ink/10 bg-cream p-5"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${
                          statusClassName[anecdote.reviewStatus]
                        }`}
                      >
                        {anecdote.confidenceLabel}
                      </span>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-muted ring-1 ring-ink/10">
                        {anecdote.evidenceStatus}
                      </span>
                    </div>
                    <h3 className="mt-3 text-xl font-semibold text-ink">
                      {anecdote.title}
                    </h3>
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">
                      {anecdote.hook}
                    </p>
                  </div>
                  <LocalizedLink
                    href={`/anecdotes/${anecdote.slug}`}
                    className="w-fit rounded-lg border border-ink/10 bg-white px-3 py-2 text-sm font-semibold text-ink"
                  >
                    {dashboard.labels.openPublicPage}
                  </LocalizedLink>
                </div>

                <div className="mt-5 grid gap-4 lg:grid-cols-3">
                  <ReviewPanel title={dashboard.labels.documentedClaims}>
                    <p className="text-2xl font-semibold text-ink">
                      {anecdote.documentedClaimCount}
                    </p>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-muted">
                      {anecdote.sections.documented.map((claim) => (
                        <li key={claim}>{claim}</li>
                      ))}
                    </ul>
                  </ReviewPanel>

                  <ReviewPanel title={dashboard.labels.interpretationClaims}>
                    <p className="text-2xl font-semibold text-ink">
                      {anecdote.interpretationClaimCount}
                    </p>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-muted">
                      {anecdote.sections.interpretation.map((claim) => (
                        <li key={claim}>{claim}</li>
                      ))}
                    </ul>
                  </ReviewPanel>

                  <ReviewPanel title={dashboard.labels.sources}>
                    <p className="text-2xl font-semibold text-ink">
                      {anecdote.sourceCount}
                    </p>
                    {anecdote.sourceWarning ? (
                      <p className="mt-3 text-sm leading-6 text-tomato">
                        {anecdote.sourceWarning}
                      </p>
                    ) : null}
                    <div className="mt-3 space-y-2">
                      {anecdote.sources.map((source) => (
                        <div key={source.title}>
                          {source.url ? (
                            <a
                              href={source.url}
                              className="block text-sm font-medium text-apple underline-offset-4 hover:underline"
                              rel="noreferrer"
                              target="_blank"
                            >
                              {source.title}
                            </a>
                          ) : (
                            <p className="text-sm font-medium text-muted">
                              {source.title}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </ReviewPanel>
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                  <ReviewPanel title={dashboard.labels.quote}>
                    {anecdote.quote ? (
                      <figure>
                        <blockquote className="text-sm leading-6 text-ink">
                          “{anecdote.quote.text}”
                        </blockquote>
                        <figcaption className="mt-2 text-xs text-muted">
                          {anecdote.quote.attribution}
                        </figcaption>
                      </figure>
                    ) : (
                      <p className="text-sm text-muted">
                        {dashboard.labels.notAvailable}
                      </p>
                    )}
                  </ReviewPanel>

                  <ReviewPanel title={dashboard.labels.translation}>
                    <p className="text-sm leading-6 text-muted">
                      {anecdote.canonicalSlug}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {anecdote.people.map((person) => (
                        <span
                          key={person}
                          className="rounded-full bg-paper px-3 py-1 text-xs font-medium text-muted ring-1 ring-ink/10"
                        >
                          {person}
                        </span>
                      ))}
                    </div>
                  </ReviewPanel>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

type ReviewPanelProps = {
  title: string;
  children: ReactNode;
};

function ReviewPanel({ title, children }: ReviewPanelProps) {
  return (
    <div className="border-t border-ink/10 pt-4">
      <h4 className="text-sm font-semibold text-ink">{title}</h4>
      <div className="mt-2">{children}</div>
    </div>
  );
}
