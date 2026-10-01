import React from 'react';
import { ChevronDownIcon } from 'lucide-react';
import type { SelectOption } from '../forms/SelectField';

interface SearchSelectProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  anyLabel: string;
  disabled?: boolean;
}

export function SearchSelect({ id, label, value, onChange, options, anyLabel, disabled }: SearchSelectProps) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-1 block text-xs font-semibold text-muted">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className="block h-12 w-full appearance-none truncate rounded-lg border border-line bg-paper pl-3 pr-9 text-[15px] font-medium text-ink transition-[border-color,box-shadow] duration-150 focus:border-navy focus:bg-white focus:outline-none focus:ring-4 focus:ring-navy/10 disabled:opacity-60">
          
          <option value="">{anyLabel}</option>
          {options.map((o) => {
            const opt = typeof o === 'string' ? { value: o, label: o } : o;
            return (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>);

          })}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
      </div>
    </div>);

}