import { useTranslations } from "next-intl";

import { StoryPage } from "@/components/story-page";

export default function TimelinePage() {
  const t = useTranslations("TimelinePage");

  return <StoryPage title={t("title")} description={t("description")} />;
}
