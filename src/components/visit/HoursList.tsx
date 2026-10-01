import React from 'react';
import { dealership } from '../../data/dealership';

const dayIndex: Record<string, number[]> = {
  'Monday – Thursday': [1, 2, 3, 4],
  Friday: [5],
  Saturday: [6],
  Sunday: [0]
};

export function HoursList({ tone = 'light' }: {tone?: 'light' | 'dark';}) {
  const today = new Date().getDay();
  const muted = tone === 'dark' ? 'text-ivory/70' : 'text-ink-soft';
  return (
    <div>
      <dl className="text-[15px] tnum">
        {dealership.hours.map((h) => {
          const isToday = dayIndex[h.days]?.includes(today);
          return (
            <div key={h.days} className={`flex justify-between gap-4 border-b py-2.5 ${tone === 'dark' ? 'border-ivory/15' : 'border-line'}`}>
              <dt className={isToday ? 'font-semibold' : ''}>
                {h.days}
                {isToday && <span className={`ml-2 text-xs font-medium ${tone === 'dark' ? 'text-ivory/80' : 'text-forest'}`}>Today</span>}
              </dt>
              <dd className={isToday ? 'font-semibold' : ''}>{h.time}</dd>
            </div>);

        })}
      </dl>
      <p className={`mt-3 text-sm ${muted}`}>{dealership.appointmentNote}</p>
    </div>);

}