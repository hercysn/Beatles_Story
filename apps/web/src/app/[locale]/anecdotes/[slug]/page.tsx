import { notFound } from "next/navigation";

import { AnecdoteDetail } from "@/components/anecdote-detail";
import { routing, type Locale } from "@/i18n/routing";
import {
  getPublicAnecdote,
  getPublicAnecdoteCollection,
  getPublicAnecdoteSlugs,
} from "@/lib/content/public";

type AnecdoteDetailPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getPublicAnecdoteSlugs().map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: AnecdoteDetailPageProps) {
  const { locale, slug } = await params;
  const anecdote = getPublicAnecdote(locale as Locale, slug);

  if (!anecdote) {
    return {};
  }

  return {
    title: anecdote.title,
    description: anecdote.summary,
  };
}

export default async function AnecdoteDetailPage({
  params,
}: AnecdoteDetailPageProps) {
  const { locale, slug } = await params;
  const fixture = getPublicAnecdoteCollection(locale as Locale);
  const anecdote = getPublicAnecdote(locale as Locale, slug);

  if (!anecdote) {
    notFound();
  }

  return <AnecdoteDetail anecdote={anecdote} labels={fixture.labels.detail} />;
}
