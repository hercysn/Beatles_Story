import type { ReactNode } from "react";
import { connection } from "next/server";

import { LocalizedLink } from "@/components/localized-link";
import type { Locale } from "@/i18n/routing";
import { getEditorialAccess } from "@/lib/content/admin";
import { logoutEditorialAdminAction } from "@/lib/content/admin-actions";
import { getEditorialDashboard } from "@/lib/content/editorial";
import {
  attachClaimSourceAction,
  createClaimAction,
  createEventAction,
  createSourceAction,
  upsertAnecdoteAction,
  upsertAnecdoteTranslationAction,
} from "@/lib/content/editorial-actions";

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
  await connection();
  const { locale } = await params;
  const currentLocale = locale as Locale;
  const access = await getEditorialAccess();

  if (!access.allowed) {
    return (
      <main className="mx-auto w-full max-w-3xl px-6 py-14 sm:py-20">
        <div className="border-l-4 border-tomato pl-6">
          <h1 className="text-3xl font-semibold text-ink">
            Editorial access required
          </h1>
          <p className="mt-4 text-base leading-7 text-muted">
            {access.message}
          </p>
          <LocalizedLink
            href={`/editorial/login?redirectTo=/${currentLocale}/editorial`}
            className="mt-6 inline-flex rounded-lg bg-apple px-4 py-2 text-sm font-semibold text-white"
          >
            {currentLocale === "zh" ? "编辑登录" : "Editorial login"}
          </LocalizedLink>
        </div>
      </main>
    );
  }

  const dashboard = await getEditorialDashboard(currentLocale);

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
          {access.message ? (
            <p className="mt-4 rounded-lg border border-mustard/30 bg-mustard/10 p-3 text-sm leading-6 text-muted">
              {access.message}
            </p>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2">
          <LocalizedLink
            href="/editorial/ingestion"
            className="rounded-lg border border-ink/10 bg-cream px-4 py-2 text-sm font-semibold text-ink"
          >
            {dashboard.labels.ingestionQueue}
          </LocalizedLink>
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
          <form action={logoutEditorialAdminAction}>
            <input
              name="redirectTo"
              type="hidden"
              value={`/${currentLocale}/editorial`}
            />
            <button
              className="rounded-lg border border-ink/10 bg-cream px-4 py-2 text-sm font-semibold text-ink"
              type="submit"
            >
              {currentLocale === "zh" ? "退出" : "Log out"}
            </button>
          </form>
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
          <section>
            <h2 className="text-lg font-semibold text-ink">Backend forms</h2>
            <div className="mt-4 space-y-4">
              <EditorialForm title="Source" action={createSourceAction}>
                <TextInput name="title" placeholder="Title" required />
                <TextInput name="url" placeholder="https://..." />
                <TextInput name="publisher" placeholder="Publisher" />
                <SelectInput
                  name="sourceType"
                  options={[
                    "primary",
                    "official",
                    "book",
                    "interview",
                    "article",
                    "tumblr",
                    "fan-research",
                    "other",
                  ]}
                />
                <TextInput
                  name="reliabilityTier"
                  placeholder="Reliability 1-5"
                />
              </EditorialForm>

              <EditorialForm title="Event" action={createEventAction}>
                <TextInput name="eventType" placeholder="event_type" required />
                <TextInput name="startDate" placeholder="YYYY-MM-DD" />
                <TextInput name="endDate" placeholder="YYYY-MM-DD" />
                <SelectInput
                  name="datePrecision"
                  options={[
                    "exact",
                    "month",
                    "year",
                    "approximate",
                    "range",
                    "disputed",
                  ]}
                />
                <SelectInput
                  name="reviewStatus"
                  options={["draft", "review", "approved", "rejected"]}
                />
              </EditorialForm>

              <EditorialForm title="Anecdote" action={upsertAnecdoteAction}>
                <TextInput name="slug" placeholder="slug" required />
                <TextInput name="dateLabel" placeholder="Date label" />
                <TextInput name="peopleTags" placeholder="People, comma list" />
                <TextInput name="placeLabel" placeholder="Place" />
                <TextInput name="toneTags" placeholder="Tone, comma list" />
                <TextInput name="relatedTags" placeholder="Related, comma list" />
                <TextInput
                  name="connectionChain"
                  placeholder="Connection chain, comma list"
                />
                <SelectInput
                  name="publicationStatus"
                  options={["draft", "published", "hidden"]}
                />
                <SelectInput
                  name="verificationStatus"
                  options={["unverified", "human_verified", "disputed"]}
                />
                <SelectInput
                  name="sourceStatus"
                  options={["unsourced", "partially_sourced", "fully_sourced"]}
                />
                <CheckboxInput name="aiAssisted" label="AI-assisted" />
                <SelectInput
                  name="evidenceLevel"
                  options={[
                    "documented",
                    "corroborated",
                    "single-recollection",
                    "disputed",
                    "interpretive",
                    "fandom-theory",
                  ]}
                />
                <SelectInput
                  name="reviewStatus"
                  options={["draft", "review", "approved", "rejected"]}
                />
              </EditorialForm>

              <EditorialForm
                title="Translation"
                action={upsertAnecdoteTranslationAction}
              >
                <TextInput name="slug" placeholder="Anecdote slug" required />
                <SelectInput name="locale" options={["en", "zh-CN"]} />
                <TextInput name="title" placeholder="Title" required />
                <TextAreaInput name="hook" placeholder="Hook" required />
                <TextAreaInput name="summary" placeholder="Summary" required />
                <TextAreaInput
                  name="whatHappened"
                  placeholder="What happened"
                  required
                />
                <TextAreaInput
                  name="whyInteresting"
                  placeholder="Why interesting"
                  required
                />
                <TextAreaInput name="beforeSection" placeholder="Before" />
                <TextAreaInput
                  name="connectionSection"
                  placeholder="Connection"
                />
                <TextAreaInput
                  name="documentedSection"
                  placeholder="Documented claims"
                  required
                />
                <TextAreaInput
                  name="interpretationSection"
                  placeholder="Interpretation claims"
                />
                <TextInput name="quoteText" placeholder="Quote text" />
                <TextInput
                  name="quoteAttribution"
                  placeholder="Quote attribution"
                />
                <SelectInput
                  name="translationStatus"
                  options={[
                    "human_translated",
                    "machine_translated",
                    "needs_review",
                  ]}
                />
              </EditorialForm>

              <EditorialForm title="Claim" action={createClaimAction}>
                <TextInput name="slug" placeholder="Anecdote slug" />
                <TextInput name="eventId" placeholder="Event ID" />
                <TextAreaInput name="claimText" placeholder="Claim" required />
                <SelectInput
                  name="claimType"
                  options={[
                    "fact",
                    "recollection",
                    "interpretation",
                    "disputed",
                    "theory",
                  ]}
                />
                <SelectInput
                  name="reviewStatus"
                  options={["draft", "review", "approved", "rejected"]}
                />
              </EditorialForm>

              <EditorialForm
                title="Claim source"
                action={attachClaimSourceAction}
              >
                <TextInput name="claimId" placeholder="Claim ID" required />
                <TextInput name="sourceId" placeholder="Source ID" required />
                <TextAreaInput name="sourceExcerpt" placeholder="Excerpt" />
                <SelectInput
                  name="supportType"
                  options={["supports", "contradicts", "context", "mentions"]}
                />
              </EditorialForm>
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

type EditorialFormProps = {
  title: string;
  action: (formData: FormData) => Promise<void>;
  children: ReactNode;
};

function EditorialForm({ title, action, children }: EditorialFormProps) {
  return (
    <form
      action={action}
      className="rounded-lg border border-ink/10 bg-cream p-4"
    >
      <h3 className="text-sm font-semibold text-ink">{title}</h3>
      <div className="mt-3 grid gap-2">{children}</div>
      <button
        type="submit"
        className="mt-3 rounded-lg bg-apple px-3 py-2 text-sm font-semibold text-white"
      >
        Save
      </button>
    </form>
  );
}

type InputProps = {
  name: string;
  placeholder: string;
  required?: boolean;
};

function TextInput({ name, placeholder, required }: InputProps) {
  return (
    <input
      name={name}
      placeholder={placeholder}
      required={required}
      className="w-full rounded-md border border-ink/10 bg-white px-3 py-2 text-sm text-ink"
    />
  );
}

function TextAreaInput({ name, placeholder, required }: InputProps) {
  return (
    <textarea
      name={name}
      placeholder={placeholder}
      required={required}
      rows={3}
      className="w-full rounded-md border border-ink/10 bg-white px-3 py-2 text-sm text-ink"
    />
  );
}

function SelectInput({ name, options }: { name: string; options: string[] }) {
  return (
    <select
      name={name}
      className="w-full rounded-md border border-ink/10 bg-white px-3 py-2 text-sm text-ink"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

function CheckboxInput({ name, label }: { name: string; label: string }) {
  return (
    <label className="flex items-center gap-2 text-sm text-muted">
      <input
        name={name}
        type="checkbox"
        className="h-4 w-4 rounded border-ink/20"
      />
      {label}
    </label>
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
