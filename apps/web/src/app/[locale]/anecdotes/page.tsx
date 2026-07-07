import { AnecdoteCard } from "@/components/anecdote-card";
import { getAnecdoteCollection } from "@/content/anecdotes";
import type { Locale } from "@/i18n/routing";

type AnecdotesPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function AnecdotesPage({ params }: AnecdotesPageProps) {
  const { locale } = await params;
  const fixture = getAnecdoteCollection(locale as Locale);

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

      <section className="mt-10 grid gap-4 lg:grid-cols-2">
        {fixture.items.map((anecdote) => (
          <AnecdoteCard
            key={anecdote.slug}
            anecdote={anecdote}
            peopleLabel={fixture.labels.detail.people}
            placeLabel={fixture.labels.detail.place}
            readLabel={fixture.labels.readStory}
          />
        ))}
      </section>
    </main>
  );
}
