import type { ReactNode } from "react";

import { LocalizedLink } from "@/components/localized-link";

type PrimaryLinkProps = {
  href: string;
  children: ReactNode;
};

export function PrimaryLink({ href, children }: PrimaryLinkProps) {
  return (
    <LocalizedLink
      href={href}
      className="rounded-lg border border-ink/10 bg-cream px-5 py-4 font-semibold text-ink shadow-sm shadow-ink/5 transition hover:-translate-y-0.5 hover:border-apple hover:bg-white"
    >
      {children}
    </LocalizedLink>
  );
}
