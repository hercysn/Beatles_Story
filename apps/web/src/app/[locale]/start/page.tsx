import { StoryPage } from "@/components/story-page";
import { getStoryFixture } from "@/content/story-pages";
import type { Locale } from "@/i18n/routing";

type StartPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function StartPage({ params }: StartPageProps) {
  const { locale } = await params;
  const fixture = getStoryFixture("start", locale as Locale);

  return <StoryPage fixture={fixture} />;
}
