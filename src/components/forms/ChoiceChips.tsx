import React from 'react';
import { AlertCircleIcon } from 'lucide-react';
import { cn } from '../../utils/styles';

interface ChoiceChipsProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  error?: string;
  required?: boolean;
  className?: string;
}

export function ChoiceChips({ id, label, value, onChange, options, error, required, className }: ChoiceChipsProps) {
  return (
    <fieldset className={cn('min-w-0', className)} aria-describedby={error ? `${id}-error` : undefined}>
      <legend className="mb-1.5 flex w-full items-baseline justify-between gap-2 text-sm font-semibold text-ink">
        <span>{label}</span>
        {!required && <span className="text-xs font-normal text-muted">Optional</span>}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((opt, i) => {
          const checked = value === opt;
          return (
            <label
              key={opt}
              className={cn(
                'relative inline-flex min-h-[44px] cursor-pointer items-center rounded-lg border px-3.5 text-sm font-medium transition-[background-color,border-color,color] duration-150',
                'has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand has-[:focus-visible]:ring-offset-2',
                checked ? 'border-navy bg-navy text-white' : 'border-line bg-white text-ink hover:border-navy/40'
              )}>
              
              <input
                id={i === 0 ? id : undefined}
                type="radio"
                name={id}
                value={opt}
                checked={checked}
                onChange={() => onChange(opt)}
                className="sr-only" />
              
              {opt}
            </label>);

        })}
      </div>
      {error &&
      <p id={`${id}-error`} className="mt-1.5 flex items-start gap-1.5 text-sm text-brand-dark">
          <AlertCircleIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          {error}
        </p>
      }
    </fieldset>);

}