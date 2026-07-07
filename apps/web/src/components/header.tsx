import { useTranslations } from "next-intl";

import { LanguageSwitcher } from "@/components/language-switcher";
import { LocalizedLink } from "@/components/localized-link";

const navItems = [
  { href: "/start", labelKey: "start" },
  { href: "/john-and-paul", labelKey: "johnPaul" },
  { href: "/anecdotes", labelKey: "anecdotes" },
  { href: "/timeline", labelKey: "timeline" },
] as const;

export function Header() {
  const t = useTranslations("Navigation");

  return (
    <header className="border-b border-ink/10 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <LocalizedLink
          href="/"
          className="flex items-center gap-3 text-lg font-semibold text-ink"
        >
          <span className="h-3 w-3 rounded-full bg-apple ring-4 ring-moss/25" />
          <span>Beatles Story</span>
        </LocalizedLink>
        <nav className="flex flex-wrap items-center gap-4 text-sm text-muted">
          {navItems.map((item) => (
            <LocalizedLink
              key={item.href}
              href={item.href}
              className="transition hover:text-ink"
            >
              {t(item.labelKey)}
            </LocalizedLink>
          ))}
        </nav>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
