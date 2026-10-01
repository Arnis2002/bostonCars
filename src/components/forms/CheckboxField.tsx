import React from 'react';
import { CheckIcon, AlertCircleIcon } from 'lucide-react';
import { cn } from '../../utils/styles';

interface CheckboxFieldProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  children: React.ReactNode;
}

export function CheckboxField({ id, checked, onChange, error, children }: CheckboxFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 py-1">
        <span className="relative mt-0.5 grid h-5 w-5 shrink-0 place-items-center">
          <input
            id={id}
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${id}-error` : undefined}
            className={cn(
              'peer h-5 w-5 cursor-pointer appearance-none rounded border bg-white transition-colors duration-150 checked:border-navy checked:bg-navy',
              error ? 'border-brand' : 'border-steel/40'
            )} />
          
          <CheckIcon className="pointer-events-none absolute h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100" strokeWidth={3} aria-hidden />
        </span>
        <span className="text-[13px] leading-relaxed text-steel">{children}</span>
      </label>
      {error &&
      <p id={`${id}-error`} className="ml-8 mt-1 flex items-start gap-1.5 text-sm text-brand-dark">
          <AlertCircleIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          {error}
        </p>
      }
    </div>);

}