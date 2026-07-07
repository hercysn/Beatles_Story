import { useTranslations } from "next-intl";

import { StoryPage } from "@/components/story-page";

export default function StartPage() {
  const t = useTranslations("StartPage");

  return <StoryPage title={t("title")} description={t("description")} />;
}
