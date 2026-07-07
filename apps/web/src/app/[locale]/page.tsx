import { LocalizedLink } from "@/components/localized-link";
import { PrimaryLink } from "@/components/primary-link";
import { getHomeFixture } from "@/content/home";
import { routing, type Locale } from "@/i18n/routing";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const fixture = getHomeFixture(locale as Locale);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col px-6 py-16 sm:py-24">
      <section>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-center">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase text-apple">
              {fixture.hero.eyebrow}
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-ink sm:text-6xl">
              {fixture.hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              {fixture.hero.text}
            </p>
          </div>

          <div
            aria-hidden="true"
            className="hidden aspect-square rounded-full border-[18px] border-vinyl bg-[radial-gradient(circle,#f3f5e9_0_12%,#4f7f3a_12%_18%,#24201c_18%_20%,transparent_20%),repeating-radial-gradient(circle,#312c27_0_2px,#24201c_2px_9px)] shadow-xl shadow-ink/10 lg:block"
          />
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {fixture.hero.primaryLinks.map((link) => (
            <PrimaryLink key={link.href} href={link.href}>
              {link.label}
            </PrimaryLink>
          ))}
        </div>

        <div className="mt-12 grid h-2 grid-cols-[1.8fr_1fr_0.6fr] overflow-hidden rounded-full">
          <span className="bg-apple" />
          <span className="bg-moss" />
          <span className="bg-mustard" />
        </div>
      </section>

      <section className="mt-20">
        <h2 className="text-2xl font-semibold text-ink sm:text-3xl">
          {fixture.startingPoints.title}
        </h2>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {fixture.startingPoints.items.map((item) => (
            <LocalizedLink
              key={item.href}
              href={item.href}
              className="rounded-lg border border-ink/10 bg-cream p-5 shadow-sm shadow-ink/5 transition hover:-translate-y-0.5 hover:border-apple hover:bg-white"
            >
              <p className="text-xs font-semibold uppercase text-apple">
                {item.eyebrow}
              </p>
              <h3 className="mt-3 text-lg font-semibold text-ink">
                {item.label}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                {item.description}
              </p>
            </LocalizedLink>
          ))}
        </div>
      </section>

      <section className="mt-20 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <div>
          <h2 className="text-2xl font-semibold text-ink sm:text-3xl">
            {fixture.featuredMoment.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">
            {fixture.featuredMoment.item.context}
          </p>
        </div>
        <LocalizedLink
          href={fixture.featuredMoment.item.href}
          className="rounded-lg border border-ink/10 bg-cream p-6 shadow-sm shadow-ink/5 transition hover:-translate-y-0.5 hover:border-apple hover:bg-white"
        >
          <p className="text-xs font-semibold uppercase text-moss">
            {fixture.featuredMoment.item.evidenceLabel}
          </p>
          <h3 className="mt-3 text-2xl font-semibold text-ink">
            {fixture.featuredMoment.item.title}
          </h3>
          <p className="mt-4 text-base leading-7 text-muted">
            {fixture.featuredMoment.item.summary}
          </p>
        </LocalizedLink>
      </section>

      <section className="mt-20">
        <h2 className="text-2xl font-semibold text-ink sm:text-3xl">
          {fixture.turningPoints.title}
        </h2>
        <div className="mt-6 grid gap-3">
          {fixture.turningPoints.items.map((item) => (
            <div
              key={`${item.year}-${item.title}`}
              className="grid gap-3 border-t border-ink/10 py-4 sm:grid-cols-[5rem_1fr]"
            >
              <p className="font-semibold text-apple">{item.year}</p>
              <div>
                <h3 className="font-semibold text-ink">{item.title}</h3>
                <p className="mt-1 text-sm leading-6 text-muted">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h2 className="text-2xl font-semibold text-ink sm:text-3xl">
            {fixture.johnPaul.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">
            {fixture.johnPaul.description}
          </p>
        </div>
        <div className="flex flex-wrap content-start gap-3">
          {fixture.johnPaul.points.map((point) => (
            <span
              key={point}
              className="rounded-full border border-apple/25 bg-grove px-4 py-2 text-sm font-medium text-ink"
            >
              {point}
            </span>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <h2 className="text-2xl font-semibold text-ink sm:text-3xl">
          {fixture.explore.title}
        </h2>
        <div className="mt-5 flex flex-wrap gap-3">
          {fixture.explore.items.map((item) => (
            <LocalizedLink
              key={item}
              href={`/anecdotes?tag=${encodeURIComponent(item)}`}
              className="rounded-full bg-cream px-4 py-2 text-sm font-medium text-muted ring-1 ring-ink/10 transition hover:-translate-y-0.5 hover:bg-white hover:text-ink"
            >
              {item}
            </LocalizedLink>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <h2 className="text-2xl font-semibold text-ink sm:text-3xl">
          {fixture.recentDiscoveries.title}
        </h2>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {fixture.recentDiscoveries.items.map((item) => (
            <article
              key={item.title}
              className="rounded-lg border border-ink/10 bg-cream p-5"
            >
              <p className="text-xs font-semibold uppercase text-moss">
                {item.evidenceLabel}
              </p>
              <h3 className="mt-3 text-lg font-semibold text-ink">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-20 border-l-4 border-apple pl-6">
        <h2 className="text-2xl font-semibold text-ink sm:text-3xl">
          {fixture.evidence.title}
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted">
          {fixture.evidence.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {fixture.evidence.labels.map((label) => (
            <span
              key={label}
              className="rounded-full bg-vinyl px-3 py-1 text-sm text-cream"
            >
              {label}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
