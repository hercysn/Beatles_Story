import { NextResponse } from "next/server";

import { routing, type Locale } from "@/i18n/routing";
import { getPublicAnecdoteCollection } from "@/lib/content/public";

function resolveLocale(request: Request): Locale {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale");

  if (routing.locales.includes(locale as Locale)) {
    return locale as Locale;
  }

  return routing.defaultLocale;
}

export async function GET(request: Request) {
  return NextResponse.json(
    await getPublicAnecdoteCollection(resolveLocale(request)),
  );
}
