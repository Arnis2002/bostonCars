import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { quickFilters } from '../../data/quickFilters';
import { applyFilters, emptyFilters, inventoryHref } from '../../utils/inventoryFilters';
import type { Vehicle } from '../../types/vehicle';

export function QuickFilters({ vehicles }: {vehicles: Vehicle[];}) {
  const available = useMemo(
    () =>
    quickFilters.
    map((q) => ({ ...q, count: applyFilters(vehicles, { ...emptyFilters(), ...q.filters }).length })).
    filter((q) => q.count > 0),
    [vehicles]
  );

  if (!available.length) return null;

  return (
    <div className="flex items-center gap-3">
      <span className="hidden shrink-0 text-sm font-medium text-muted sm:block">Popular:</span>
      <ul className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 py-1">
        {available.map((q) =>
        <li key={q.id} className="shrink-0">
            <Link
            to={inventoryHref(q.filters)}
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-line bg-white px-3.5 text-sm font-medium text-ink transition-[border-color,background-color] duration-150 hover:border-navy/40 hover:bg-paper">
            
              {q.label}
              <span className="text-xs text-muted tabular">{q.count}</span>
            </Link>
          </li>
        )}
      </ul>
    </div>);

}