import React, { useEffect, useRef } from 'react';
import { InfoIcon } from 'lucide-react';
import { dealership } from '../../data/dealership';

interface DemoSubmittedProps {
  summary: {label: string;value: string;}[];
  onEdit: () => void;
}

/** Shown after a form validates. Makes clear nothing was delivered. */
export function DemoSubmitted({ summary, onEdit }: DemoSubmittedProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => ref.current?.focus(), []);

  return (
    <div ref={ref} tabIndex={-1} role="status" className="rounded border border-clay/50 bg-clay-soft p-5 focus:outline-none">
      <div className="flex items-start gap-3">
        <InfoIcon className="mt-0.5 h-5 w-5 shrink-0 text-clay" aria-hidden="true" />
        <div>
          <p className="text-[17px] font-semibold">Demo only — your request has not been sent.</p>
          <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">
            The form checked out, but this preview isn’t connected to the dealership. To reach someone now, call sales at{' '}
            <a href={dealership.phoneHref} className="font-medium text-ink underline underline-offset-2">{dealership.phoneDisplay}</a>.
          </p>
        </div>
      </div>
      {summary.length > 0 &&
      <dl className="mt-4 grid gap-x-6 gap-y-2 border-t border-clay/25 pt-4 text-sm sm:grid-cols-2">
          {summary.map((s) =>
        <div key={s.label}>
              <dt className="text-ink-soft">{s.label}</dt>
              <dd className="font-medium">{s.value}</dd>
            </div>
        )}
        </dl>
      }
      <button type="button" onClick={onEdit} className="mt-4 text-sm font-medium underline underline-offset-4">
        Edit the form
      </button>
    </div>);

}