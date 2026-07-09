"use client";

import type { RawDocumentReviewStatus } from "@beatles-story/shared-types";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";

import {
  type RawDocumentReviewActionState,
  updateRawDocumentReviewAction,
} from "@/lib/content/editorial-actions";

type ReviewStatusOption = {
  value: RawDocumentReviewStatus;
  label: string;
};

type RawDocumentReviewFormProps = {
  rawDocumentId: string;
  initialReviewStatus: RawDocumentReviewStatus;
  initialReviewNotes: string;
  labels: {
    reviewStatus: string;
    reviewNotes: string;
    saveReview: string;
    saved: string;
    saving: string;
  };
  statusOptions: ReviewStatusOption[];
};

const initialActionState: RawDocumentReviewActionState = {
  ok: false,
  message: null,
  reviewStatus: null,
  reviewNotes: null,
};

export function RawDocumentReviewForm({
  rawDocumentId,
  initialReviewStatus,
  initialReviewNotes,
  labels,
  statusOptions,
}: RawDocumentReviewFormProps) {
  const [reviewStatus, setReviewStatus] = useState(initialReviewStatus);
  const [reviewNotes, setReviewNotes] = useState(initialReviewNotes);
  const [isSaving, setIsSaving] = useState(false);
  const [saveState, setSaveState] = useState(initialActionState);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);

    const formData = new FormData(event.currentTarget);
    const result = await updateRawDocumentReviewAction(saveState, formData);
    setSaveState(result);
    setIsSaving(false);

    if (result.ok) {
      if (result.reviewStatus) {
        setReviewStatus(result.reviewStatus);
      }

      if (result.reviewNotes !== null) {
        setReviewNotes(result.reviewNotes);
      }
    }
  }

  const currentStatusLabel = useMemo(
    () =>
      statusOptions.find((option) => option.value === reviewStatus)?.label ??
      reviewStatus,
    [reviewStatus, statusOptions],
  );

  return (
    <form
      className="mt-5 grid gap-3 border-t border-ink/10 pt-5 lg:grid-cols-[minmax(12rem,16rem)_1fr_auto]"
      onSubmit={handleSubmit}
    >
      <input name="rawDocumentId" type="hidden" value={rawDocumentId} />
      <div>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-muted ring-1 ring-ink/10">
          {currentStatusLabel}
        </span>
        <label className="mt-3 block text-sm font-semibold text-ink">
          {labels.reviewStatus}
          <select
            className="mt-2 block w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm font-medium text-ink"
            key={reviewStatus}
            name="reviewStatus"
            onChange={(event) =>
              setReviewStatus(event.target.value as RawDocumentReviewStatus)
            }
            value={reviewStatus}
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="text-sm font-semibold text-ink">
        {labels.reviewNotes}
        <textarea
          className="mt-2 min-h-20 w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm font-normal leading-6 text-ink"
          name="reviewNotes"
          onChange={(event) => setReviewNotes(event.target.value)}
          value={reviewNotes}
        />
      </label>
      <div className="flex flex-col items-start justify-end gap-2">
        <button
          className="rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-white disabled:cursor-wait disabled:opacity-70"
          disabled={isSaving}
          type="submit"
        >
          {isSaving ? labels.saving : labels.saveReview}
        </button>
        {saveState.message ? (
          <p
            className={
              saveState.ok
                ? "text-xs font-semibold text-apple"
                : "text-xs font-semibold text-tomato"
            }
          >
            {saveState.ok ? labels.saved : saveState.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
