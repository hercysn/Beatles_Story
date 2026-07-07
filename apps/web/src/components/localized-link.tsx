import Link, { type LinkProps } from "next/link";
import { useLocale } from "next-intl";
import type { AnchorHTMLAttributes, ReactNode } from "react";

import { buildLocalizedPath, type Locale } from "@/lib/routes";

type LocalizedLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
> &
  Omit<LinkProps, "href"> & {
    href: string;
    children: ReactNode;
  };

export function LocalizedLink({
  href,
  children,
  ...props
}: LocalizedLinkProps) {
  const locale = useLocale() as Locale;
  const localizedHref = buildLocalizedPath(locale, href);

  return (
    <Link href={localizedHref} {...props}>
      {children}
    </Link>
  );
}
