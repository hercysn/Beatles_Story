import type { PublicEvidenceStatus } from "@/lib/content/public";
import type { Locale } from "@/lib/routes";

type EvidenceTone = "fact" | "recollection" | "disputed" | "interpretive";

const evidenceToneByStatus: Record<PublicEvidenceStatus, EvidenceTone> = {
  "Documented context": "fact",
  "Corroborated recollection": "recollection",
  "Disputed recollection": "disputed",
  "Interpretive connection": "interpretive",
  "Fandom theory": "disputed",
};

const evidenceClassByTone: Record<EvidenceTone, string> = {
  fact: "bg-grove text-ink ring-apple/25",
  recollection: "bg-white text-ink ring-moss/35",
  disputed: "bg-tomato/10 text-tomato ring-tomato/25",
  interpretive: "bg-mustard/15 text-ink ring-mustard/35",
};

type EvidenceLabelProps = {
  status: PublicEvidenceStatus;
  locale?: Locale;
  className?: string;
};

export function EvidenceLabel({
  status,
  locale = "en",
  className = "",
}: EvidenceLabelProps) {
  const tone = evidenceToneByStatus[status];

  return (
    <span
      className={[
        "inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold ring-1",
        evidenceClassByTone[tone],
        className,
      ].join(" ")}
    >
      {getEvidenceLabel(status, locale)}
    </span>
  );
}

function getEvidenceLabel(status: PublicEvidenceStatus, locale: Locale) {
  if (locale !== "zh") {
    return status;
  }

  const labelByStatus: Record<PublicEvidenceStatus, string> = {
    "Documented context": "有记录的背景",
    "Corroborated recollection": "有旁证的回忆",
    "Disputed recollection": "有争议的回忆",
    "Interpretive connection": "解释性连接",
    "Fandom theory": "歌迷理论",
  };

  return labelByStatus[status];
}
