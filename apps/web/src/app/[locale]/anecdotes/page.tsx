import { AnecdoteCard } from "@/components/anecdote-card";
import { LocalizedLink } from "@/components/localized-link";
import type { Locale } from "@/i18n/routing";
import {
  filterPublicAnecdotesByTag,
  getPublicAnecdoteCollection,
  getPublicAnecdoteTags,
} from "@/lib/content/public";

type AnecdotesPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ tag?: string }>;
};

export default async function AnecdotesPage({
  params,
  searchParams,
}: AnecdotesPageProps) {
  const { locale } = await params;
  const { tag } = await searchParams;
  const activeTag = normalizeTagParam(tag);
  const [fixture, tags, anecdotes] = await Promise.all([
    getPublicAnecdoteCollection(locale as Locale),
    getPublicAnecdoteTags(locale as Locale),
    filterPublicAnecdotesByTag(locale as Locale, activeTag),
  ]);

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-14 sm:py-20">
      <header className="max-w-3xl border-l-4 border-apple pl-6">
        <h1 className="text-3xl font-semibold text-ink sm:text-5xl">
          {fixture.labels.title}
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted">
          {fixture.labels.description}
        </p>
      </header>

      <section className="mt-10">
        <h2 className="text-sm font-semibold uppercase text-apple">
          {fixture.labels.filtersTitle}
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {fixture.labels.filters.map((filter) => (
            <span
              key={filter}
              className="rounded-full bg-cream px-3 py-1 text-sm font-medium text-muted ring-1 ring-ink/10"
            >
              {filter}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-sm font-semibold uppercase text-apple">
          {fixture.labels.allTags}
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((availableTag) => {
            const isActive = activeTag === availableTag;

            return (
              <LocalizedLink
                key={availableTag}
                href={getTagHref(availableTag)}
                className={[
                  "rounded-full px-3 py-1 text-sm font-medium ring-1 transition hover:-translate-y-0.5 hover:border-apple hover:bg-white hover:text-ink",
                  isActive
                    ? "bg-vinyl text-cream ring-vinyl/25"
                    : "bg-cream text-muted ring-ink/10",
                ].join(" ")}
              >
                {availableTag}
              </LocalizedLink>
            );
          })}
        </div>
        {activeTag ? (
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted">
            <span>
              {fixture.labels.activeFilter}:{" "}
              <strong className="font-semibold text-ink">{activeTag}</strong>
            </span>
            <LocalizedLink
              href="/anecdotes"
              className="font-semibold text-apple underline-offset-4 hover:underline"
            >
              {fixture.labels.clearFilter}
            </LocalizedLink>
          </div>
        ) : null}
      </section>

      <section className="mt-10 grid gap-4 lg:grid-cols-2">
        {anecdotes.map((anecdote) => (
          <AnecdoteCard
            key={anecdote.slug}
            anecdote={anecdote}
            peopleLabel={fixture.labels.detail.people}
            placeLabel={fixture.labels.detail.place}
            readLabel={fixture.labels.readStory}
          />
        ))}
      </section>

      {anecdotes.length === 0 ? (
        <p className="mt-8 rounded-lg border border-ink/10 bg-cream p-5 text-sm text-muted">
          {fixture.labels.noResults}
        </p>
      ) : null}
    </main>
  );
}

function normalizeTagParam(tag: string | undefined) {
  return tag?.trim() || undefined;
}

function getTagHref(tag: string) {
  return `/anecdotes?tag=${encodeURIComponent(tag)}`;
}
