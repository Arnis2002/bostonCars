import React from 'react';
import { CheckIcon } from 'lucide-react';

export interface FilterOption {
  value: string;
  label: string;
  count: number;
}

interface FilterCheckboxGroupProps {
  name: string;
  legend: string;
  options: FilterOption[];
  selected: string[];
  onToggle: (value: string) => void;
}

export function FilterCheckboxGroup({ name, legend, options, selected, onToggle }: FilterCheckboxGroupProps) {
  return (
    <fieldset>
      <legend className="sr-only">{legend}</legend>
      <ul className="space-y-0.5">
        {options.map((o) => {
          const id = `${name}-${o.value.replace(/\s+/g, '-')}`;
          const checked = selected.includes(o.value);
          return (
            <li key={o.value}>
              <label htmlFor={id} className="flex min-h-[44px] cursor-pointer items-center gap-3 rounded-md px-1 text-[15px] text-ink hover:bg-paper">
                <span className="relative grid h-5 w-5 shrink-0 place-items-center">
                  <input
                    id={id}
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggle(o.value)}
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-steel/40 bg-white transition-colors duration-150 checked:border-navy checked:bg-navy" />
                  
                  <CheckIcon className="pointer-events-none absolute h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100" strokeWidth={3} aria-hidden />
                </span>
                <span className="flex-1">{o.label}</span>
                <span className="text-sm text-muted tabular">{o.count}</span>
              </label>
            </li>);

        })}
      </ul>
    </fieldset>);

}