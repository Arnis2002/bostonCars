import React from 'react';
import { CheckIcon } from 'lucide-react';
import { cn } from '../../utils/styles';

interface FinancingStepperProps {
  steps: string[];
  current: number;
  onSelect: (index: number) => void;
}

export function FinancingStepper({ steps, current, onSelect }: FinancingStepperProps) {
  return (
    <nav aria-label="Financing request progress">
      <ol className="grid grid-cols-4 gap-2">
        {steps.map((label, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <li key={label}>
              <button
                type="button"
                onClick={() => onSelect(i)}
                disabled={!done}
                aria-current={active ? 'step' : undefined}
                className="group flex w-full flex-col gap-2 text-left disabled:cursor-default">
                
                <span className={cn('h-1.5 w-full rounded-full transition-colors duration-300', done || active ? 'bg-navy' : 'bg-line')} />
                <span className={cn('flex items-center gap-1.5 text-[13px] font-semibold sm:text-sm', active ? 'text-navy' : done ? 'text-steel group-hover:text-navy' : 'text-muted')}>
                  {done && <CheckIcon className="h-3.5 w-3.5 shrink-0 text-emerald-600" aria-hidden />}
                  <span className="truncate">{label}</span>
                  {done && <span className="sr-only">(completed)</span>}
                </span>
              </button>
            </li>);

        })}
      </ol>
    </nav>);

}