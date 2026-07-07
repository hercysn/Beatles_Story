import { useTranslations } from "next-intl";

import { StoryPage } from "@/components/story-page";

export default function AnecdotesPage() {
  const t = useTranslations("AnecdotesPage");

  return <StoryPage title={t("title")} description={t("description")} />;
}
