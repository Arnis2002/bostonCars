import React from 'react';
import { dealership } from '../../data/dealership';
import { todayIndex } from '../../utils/hours';
import { cn } from '../../utils/styles';

interface HoursListProps {
  dark?: boolean;
  highlightToday?: boolean;
  className?: string;
}

export function HoursList({ dark, highlightToday = true, className }: HoursListProps) {
  const today = todayIndex();
  return (
    <dl className={cn('divide-y text-[15px]', dark ? 'divide-white/10' : 'divide-line', className)}>
      {dealership.hours.map((h) => {
        const isToday = highlightToday && h.days.includes(today);
        return (
          <div key={h.label} className="flex items-center justify-between gap-4 py-2.5">
            <dt className={cn('flex items-center gap-2', dark ? 'text-white/80' : 'text-steel', isToday && (dark ? 'font-semibold text-white' : 'font-semibold text-ink'))}>
              {h.label}
              {isToday &&
              <span className={cn('rounded px-1.5 py-0.5 text-[11px] font-semibold', dark ? 'bg-white/10 text-white' : 'bg-paper text-navy')}>Today</span>
              }
            </dt>
            <dd className={cn('tabular', dark ? 'text-white' : 'text-ink', isToday && 'font-semibold')}>
              {h.open ? `${h.open} – ${h.close}` : 'Closed'}
            </dd>
          </div>);

      })}
    </dl>);

}