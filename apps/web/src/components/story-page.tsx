import type { StoryFixture } from "@/content/story-pages";

type StoryPageProps =
  | {
      fixture: StoryFixture;
      title?: never;
      description?: never;
    }
  | {
      fixture?: never;
      title: string;
      description: string;
    };

export function StoryPage(props: StoryPageProps) {
  if (!props.fixture) {
    return (
      <section className="mx-auto w-full max-w-4xl px-6 py-14 sm:py-20">
        <div className="border-l-4 border-apple pl-6">
          <h1 className="text-3xl font-semibold text-ink sm:text-5xl">
            {props.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted">
            {props.description}
          </p>
        </div>
      </section>
    );
  }

  const { fixture } = props;
  const labels = {
    chapter: "Chapter",
    documented: "Documented",
    inferred: "Inferred",
    debated: "Debated",
    representativeSong: "Representative song",
    relatedEvents: "Related events",
    deeperReading: "Deeper reading",
    verifyWording: "Verify wording",
    ...fixture.labels,
  };

  return (
    <article className="mx-auto w-full max-w-5xl px-6 py-14 sm:py-20">
      <div className="grid gap-8 border-b border-ink/10 pb-10 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-end">
        <div className="border-l-4 border-apple pl-6">
          <p className="text-sm font-semibold uppercase text-apple">
            {fixture.readingTime}
          </p>
          <h1 className="mt-4 text-3xl font-semibold leading-tight text-ink sm:text-5xl">
            {fixture.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted">
            {fixture.promise}
          </p>
        </div>

        {fixture.editorialNote ? (
          <aside className="rounded-lg border border-ink/10 bg-cream p-4 text-sm leading-6 text-muted">
            {fixture.editorialNote}
          </aside>
        ) : null}
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {fixture.chapters.map((chapter, index) => (
          <a
            key={chapter.title}
            href={`#chapter-${index + 1}`}
            className="rounded-lg border border-ink/10 bg-cream p-4 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:border-apple hover:bg-white"
          >
            <span className="block text-xs uppercase text-apple">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="mt-2 block">{chapter.title}</span>
          </a>
        ))}
      </div>

      <div className="mt-16 space-y-16">
        {fixture.chapters.map((chapter, index) => (
          <section
            key={chapter.title}
            id={`chapter-${index + 1}`}
            className="scroll-mt-24 border-t border-ink/10 pt-10"
          >
            <p className="text-sm font-semibold uppercase text-apple">
              {labels.chapter} {index + 1}
            </p>
            <h2 className="mt-3 text-2xl font-semibold leading-tight text-ink sm:text-3xl">
              {chapter.title}
            </h2>
            <p className="mt-4 text-lg font-medium leading-8 text-ink">
              {chapter.dek}
            </p>

            <div className="mt-6 space-y-5">
              {chapter.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-base leading-8 text-muted">
                  {paragraph}
                </p>
              ))}
            </div>

            {chapter.quote ? (
              <blockquote className="mt-7 border-l-4 border-moss pl-5">
                <p className="text-lg font-medium leading-8 text-ink">
                  {"\""}
                  {chapter.quote.text}
                  {"\""}
                </p>
                <footer className="mt-2 text-sm text-muted">
                  {chapter.quote.attribution}
                  {chapter.quote.needsVerification ? (
                    <span className="ml-2 font-semibold text-apple">
                      {labels.verifyWording}
                    </span>
                  ) : null}
                </footer>
              </blockquote>
            ) : null}

            <EvidenceGroups evidence={chapter.evidence} labels={labels} />

            <div className="mt-8 grid gap-4 rounded-lg border border-ink/10 bg-cream p-5 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="text-xs font-semibold uppercase text-moss">
                  {labels.representativeSong}
                </p>
                <p className="mt-2 font-semibold text-ink">{chapter.song}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-moss">
                  {labels.relatedEvents}
                </p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {chapter.relatedEvents.map((event) => (
                    <li key={event}>
                      <a
                        href={`#chapter-${index + 1}`}
                        className="inline-flex rounded-full bg-grove px-3 py-1 text-sm text-ink ring-1 ring-transparent transition hover:-translate-y-0.5 hover:bg-white hover:ring-apple/25"
                      >
                        {event}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              {chapter.deeperReading ? (
                <div className="lg:col-span-2">
                  <p className="text-xs font-semibold uppercase text-moss">
                    {labels.deeperReading}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {chapter.deeperReading}
                  </p>
                </div>
              ) : null}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}

function EvidenceGroups({
  evidence,
  labels,
}: {
  evidence?: StoryFixture["chapters"][number]["evidence"];
  labels: Required<NonNullable<StoryFixture["labels"]>>;
}) {
  if (!evidence) {
    return null;
  }

  const groups = Array.isArray(evidence) ? evidence : [evidence];

  return (
    <div className="mt-8 space-y-3">
      {groups.map((group) => (
        <div
          key={`${group.documented}-${group.inferred}-${group.debated}`}
          className="grid gap-3 lg:grid-cols-3"
        >
          <EvidencePanel title={labels.documented} text={group.documented} />
          <EvidencePanel title={labels.inferred} text={group.inferred} />
          <EvidencePanel title={labels.debated} text={group.debated} />
        </div>
      ))}
    </div>
  );
}

function EvidencePanel({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-lg border border-ink/10 bg-cream p-4">
      <h3 className="text-xs font-semibold uppercase text-moss">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
    </div>
  );
}
