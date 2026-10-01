import React from 'react';

interface ReviewSection {
  title: string;
  step: number;
  rows: [string, string][];
}

interface FinanceReviewProps {
  sections: ReviewSection[];
  onEdit: (step: number) => void;
}

export function FinanceReview({ sections, onEdit }: FinanceReviewProps) {
  return (
    <div className="space-y-4">
      {sections.map((s) =>
      <section key={s.title} className="rounded-xl border border-line p-4 sm:p-5" aria-labelledby={`review-${s.step}`}>
          <div className="flex items-center justify-between">
            <h3 id={`review-${s.step}`} className="font-bold text-navy">
              {s.title}
            </h3>
            <button type="button" onClick={() => onEdit(s.step)} className="min-h-[44px] px-2 text-sm font-semibold text-brand hover:text-brand-dark">
              Edit<span className="sr-only"> {s.title}</span>
            </button>
          </div>
          <dl className="mt-1 grid gap-x-6 gap-y-2 sm:grid-cols-2">
            {s.rows.map(([label, value]) =>
          <div key={label} className="min-w-0">
                <dt className="text-xs text-muted">{label}</dt>
                <dd className="truncate text-[15px] font-medium text-ink">{value || '—'}</dd>
              </div>
          )}
          </dl>
        </section>
      )}
    </div>);

}