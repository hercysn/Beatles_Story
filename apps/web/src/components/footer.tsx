import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="border-t border-ink/10 bg-cream/70">
      <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-muted">
        {t("text")}
      </div>
    </footer>
  );
}
