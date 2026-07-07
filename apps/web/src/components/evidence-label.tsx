import type { EvidenceStatus } from "@/content/anecdotes";

type EvidenceTone = "fact" | "recollection" | "disputed" | "interpretive";

const evidenceToneByStatus: Record<EvidenceStatus, EvidenceTone> = {
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
  status: EvidenceStatus;
  className?: string;
};

export function EvidenceLabel({ status, className = "" }: EvidenceLabelProps) {
  const tone = evidenceToneByStatus[status];

  return (
    <span
      className={[
        "inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold ring-1",
        evidenceClassByTone[tone],
        className,
      ].join(" ")}
    >
      {status}
    </span>
  );
}
