import { StoryPage } from "@/components/story-page";
import { getStoryFixture } from "@/content/story-pages";
import type { Locale } from "@/i18n/routing";

type JohnAndPaulPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function JohnAndPaulPage({ params }: JohnAndPaulPageProps) {
  const { locale } = await params;
  const fixture = getStoryFixture("johnAndPaul", locale as Locale);

  return <StoryPage fixture={fixture} />;
}
