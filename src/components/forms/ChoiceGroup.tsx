import React from 'react';

interface Option {
  value: string;
  label: string;
  description?: string;
}

interface ChoiceGroupProps {
  name: string;
  legend: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  columns?: 2 | 3 | 4;
}

const cols = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-3', 4: 'sm:grid-cols-2 lg:grid-cols-4' };

export function ChoiceGroup({ name, legend, options, value, onChange, error, columns = 3 }: ChoiceGroupProps) {
  return (
    <fieldset aria-describedby={error ? `${name}-error` : undefined}>
      <legend className="mb-1.5 text-sm font-medium">{legend}</legend>
      <div className={`grid gap-2 ${cols[columns]}`}>
        {options.map((opt, i) => {
          const id = i === 0 ? name : `${name}-${opt.value}`;
          const checked = value === opt.value;
          return (
            <label
              key={opt.value}
              htmlFor={id}
              className={`flex cursor-pointer gap-3 rounded border px-3.5 py-3 transition-colors duration-150 ${
              checked ? 'border-forest bg-forest-soft/60' : error ? 'border-clay bg-paper' : 'border-line-strong bg-paper hover:border-ink/60'}`
              }>
              
              <input
                id={id}
                type="radio"
                name={name}
                value={opt.value}
                checked={checked}
                onChange={() => onChange(opt.value)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-forest" />
              
              <span>
                <span className="block text-[15px] font-medium leading-tight">{opt.label}</span>
                {opt.description && <span className="mt-1 block text-[13px] leading-snug text-ink-soft">{opt.description}</span>}
              </span>
            </label>);

        })}
      </div>
      {error && <p id={`${name}-error`} className="mt-1.5 text-[13px] font-medium text-clay">{error}</p>}
    </fieldset>);

}