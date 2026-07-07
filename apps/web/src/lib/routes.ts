export const locales = ["en", "zh"] as const;

export type Locale = (typeof locales)[number];

export function buildLocalizedPath(locale: Locale, path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (normalizedPath === "/") {
    return `/${locale}`;
  }

  return `/${locale}${normalizedPath}`;
}
