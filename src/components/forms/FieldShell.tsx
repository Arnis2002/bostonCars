import React from 'react';
import { AlertCircleIcon } from 'lucide-react';
import { cn } from '../../utils/styles';

interface FieldShellProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}

export function describedBy(id: string, error?: string, hint?: string): string | undefined {
  if (error) return `${id}-error`;
  if (hint) return `${id}-hint`;
  return undefined;
}

export function FieldShell({ id, label, required, error, hint, className, children }: FieldShellProps) {
  return (
    <div className={cn('min-w-0', className)}>
      <label htmlFor={id} className="mb-1.5 flex items-baseline justify-between gap-2 text-sm font-semibold text-ink">
        <span>{label}</span>
        {!required && <span className="text-xs font-normal text-muted">Optional</span>}
      </label>
      {children}
      {hint && !error &&
      <p id={`${id}-hint`} className="mt-1.5 text-xs leading-relaxed text-muted">
          {hint}
        </p>
      }
      {error &&
      <p id={`${id}-error`} className="mt-1.5 flex items-start gap-1.5 text-sm text-brand-dark">
          <AlertCircleIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          {error}
        </p>
      }
    </div>);

}