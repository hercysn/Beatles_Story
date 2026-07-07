import { NextResponse } from "next/server";

import { routing, type Locale } from "@/i18n/routing";
import { getPublicAnecdote } from "@/lib/content/public";

type AnecdoteApiRouteContext = {
  params: Promise<{ slug: string }>;
};

function resolveLocale(request: Request): Locale {
  const { searchParams } = new URL(request.url);
  const locale = searchParams.get("locale");

  if (routing.locales.includes(locale as Locale)) {
    return locale as Locale;
  }

  return routing.defaultLocale;
}

export async function GET(
  request: Request,
  { params }: AnecdoteApiRouteContext,
) {
  const { slug } = await params;
  const anecdote = getPublicAnecdote(resolveLocale(request), slug);

  if (!anecdote) {
    return NextResponse.json({ error: "Anecdote not found" }, { status: 404 });
  }

  return NextResponse.json(anecdote);
}
