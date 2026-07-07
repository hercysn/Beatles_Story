"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

import { routing, type Locale } from "@/i18n/routing";
import { buildLocalizedPath } from "@/lib/routes";

const labels: Record<Locale, string> = {
  en: "EN",
  zh: "中文",
};

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const t = useTranslations("LanguageSwitcher");

  const pathWithoutLocale = pathname.replace(/^\/(en|zh)(?=\/|$)/, "") || "/";

  return (
    <div
      aria-label={t("label")}
      className="flex gap-1 rounded-full border border-ink/10 bg-paper p-1"
    >
      {routing.locales.map((targetLocale) => (
        <a
          key={targetLocale}
          href={buildLocalizedPath(targetLocale, pathWithoutLocale)}
          className={`rounded-full px-3 py-1 text-sm font-medium transition ${
            targetLocale === locale
              ? "bg-vinyl text-cream"
              : "text-muted hover:bg-cream hover:text-ink"
          }`}
        >
          {labels[targetLocale]}
        </a>
      ))}
    </div>
  );
}
