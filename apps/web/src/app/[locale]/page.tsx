import { useTranslations } from "next-intl";

import { PrimaryLink } from "@/components/primary-link";

export default function HomePage() {
  const t = useTranslations("HomePage");

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col px-6 py-16 sm:py-24">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-center">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase text-apple">
            {t("eyebrow")}
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-ink sm:text-6xl">
            {t("heroTitle")}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
            {t("heroText")}
          </p>
        </div>

        <div
          aria-hidden="true"
          className="hidden aspect-square rounded-full border-[18px] border-vinyl bg-[radial-gradient(circle,#f3f5e9_0_12%,#4f7f3a_12%_18%,#24201c_18%_20%,transparent_20%),repeating-radial-gradient(circle,#312c27_0_2px,#24201c_2px_9px)] shadow-xl shadow-ink/10 lg:block"
        />
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <PrimaryLink href="/start">{t("links.beatles")}</PrimaryLink>
        <PrimaryLink href="/john-and-paul">{t("links.johnPaul")}</PrimaryLink>
        <PrimaryLink href="/anecdotes">{t("links.anecdote")}</PrimaryLink>
      </div>

      <div className="mt-12 grid h-2 grid-cols-[1.8fr_1fr_0.6fr] overflow-hidden rounded-full">
        <span className="bg-apple" />
        <span className="bg-moss" />
        <span className="bg-mustard" />
      </div>
    </section>
  );
}
