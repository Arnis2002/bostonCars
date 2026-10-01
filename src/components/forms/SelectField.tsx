import React from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { FieldShell, describedBy } from './FieldShell';
import { cn, inputBase } from '../../utils/styles';

export type SelectOption = string | {value: string;label: string;};

interface SelectFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  required?: boolean;
  hint?: string;
  className?: string;
  disabled?: boolean;
}

export function SelectField({ id, label, value, onChange, options, placeholder = 'Select…', error, required, hint, className, disabled }: SelectFieldProps) {
  return (
    <FieldShell id={id} label={label} required={required} error={error} hint={hint} className={className}>
      <div className="relative">
        <select
          id={id}
          name={id}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-required={required}
          aria-describedby={describedBy(id, error, hint)}
          className={cn(inputBase, 'appearance-none pr-10 disabled:bg-paper disabled:text-muted', error ? 'border-brand' : 'border-line', !value && 'text-muted')}>
          
          <option value="">{placeholder}</option>
          {options.map((o) => {
            const opt = typeof o === 'string' ? { value: o, label: o } : o;
            return (
              <option key={opt.value} value={opt.value} className="text-ink">
                {opt.label}
              </option>);

          })}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
      </div>
    </FieldShell>);

}