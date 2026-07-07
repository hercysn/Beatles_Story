import { useTranslations } from "next-intl";

import { StoryPage } from "@/components/story-page";

export default function JohnAndPaulPage() {
  const t = useTranslations("JohnAndPaulPage");

  return <StoryPage title={t("title")} description={t("description")} />;
}
