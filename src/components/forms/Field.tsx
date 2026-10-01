import React from 'react';

export const inputClass =
'block w-full rounded border bg-paper px-3 text-[15px] text-ink placeholder:text-ink-soft/70 transition-colors duration-150 focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20';

interface FieldShellProps {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  className?: string;
  children: React.ReactNode;
}

function FieldShell({ id, label, error, hint, optional, className = '', children }: FieldShellProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
        {optional && <span className="font-normal text-ink-soft"> (optional)</span>}
      </label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="mt-1.5 text-[13px] text-ink-soft">{hint}</p>}
      {error && <p id={`${id}-error`} className="mt-1.5 text-[13px] font-medium text-clay">{error}</p>}
    </div>);

}

function describedBy(id: string, error?: string, hint?: string) {
  return error ? `${id}-error` : hint ? `${id}-hint` : undefined;
}

type BaseProps = {id: string;label: string;error?: string;hint?: string;optional?: boolean;className?: string;};

export function TextField({ id, label, error, hint, optional, className, ...rest }: BaseProps & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <FieldShell id={id} label={label} error={error} hint={hint} optional={optional} className={className}>
      <input
        id={id}
        name={id}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy(id, error, hint)}
        className={`${inputClass} h-12 ${error ? 'border-clay' : 'border-line-strong'}`}
        {...rest} />
      
    </FieldShell>);

}

export function SelectField({ id, label, error, hint, optional, className, children, ...rest }: BaseProps & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <FieldShell id={id} label={label} error={error} hint={hint} optional={optional} className={className}>
      <select
        id={id}
        name={id}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy(id, error, hint)}
        className={`${inputClass} h-12 pr-8 ${error ? 'border-clay' : 'border-line-strong'}`}
        {...rest}>
        
        {children}
      </select>
    </FieldShell>);

}

export function TextAreaField({ id, label, error, hint, optional, className, ...rest }: BaseProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <FieldShell id={id} label={label} error={error} hint={hint} optional={optional} className={className}>
      <textarea
        id={id}
        name={id}
        rows={4}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy(id, error, hint)}
        className={`${inputClass} py-2.5 leading-relaxed ${error ? 'border-clay' : 'border-line-strong'}`}
        {...rest} />
      
    </FieldShell>);

}