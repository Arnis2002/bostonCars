import React from 'react';
import { Link } from 'react-router-dom';
import { SlidersHorizontalIcon, ChevronDownIcon, HeartIcon } from 'lucide-react';
import { sortOptions } from '../../data/formOptions';
import { useGarage } from '../../contexts/GarageContext';
import { cn } from '../../utils/styles';
import type { SortKey } from '../../types/inventory';

interface SortToolbarProps {
  count: number;
  total: number;
  loading: boolean;
  sort: SortKey;
  onSort: (sort: SortKey) => void;
  onOpenFilters: () => void;
  activeCount: number;
}

export function SortToolbar({ count, total, loading, sort, onSort, onOpenFilters, activeCount }: SortToolbarProps) {
  const { savedIds } = useGarage();
  return (
    <div className="sticky top-16 z-20 -mx-4 border-b border-line bg-white/95 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
      <div className="flex items-center gap-3">
        <p className="min-w-0 flex-1 text-[15px] text-steel" aria-live="polite">
          {loading ?
          'Loading vehicles…' :

          <>
              <span className="font-bold text-ink tabular">{count}</span> {count === 1 ? 'vehicle' : 'vehicles'}
              {count !== total && <span className="hidden sm:inline"> of {total}</span>}
            </>
          }
        </p>

        <Link to="/saved" className="hidden min-h-[44px] items-center gap-1.5 px-2 text-sm font-semibold text-navy hover:text-brand-dark md:inline-flex">
          <HeartIcon className="h-4 w-4" aria-hidden />
          Saved ({savedIds.length})
        </Link>

        <button
          type="button"
          onClick={onOpenFilters}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-line px-3.5 text-sm font-semibold text-navy lg:hidden">
          
          <SlidersHorizontalIcon className="h-4 w-4" aria-hidden />
          Filters
          {activeCount > 0 && <span className="grid h-5 min-w-[20px] place-items-center rounded-full bg-navy px-1.5 text-[11px] text-white tabular">{activeCount}</span>}
        </button>

        <div className="relative">
          <label htmlFor="inventory-sort" className="sr-only">
            Sort vehicles
          </label>
          <select
            id="inventory-sort"
            value={sort}
            onChange={(e) => onSort(e.target.value as SortKey)}
            className={cn(
              'h-11 appearance-none rounded-lg border border-line bg-white pl-3 pr-9 text-sm font-semibold text-navy focus:border-navy focus:outline-none focus:ring-4 focus:ring-navy/10',
              'max-w-[150px] sm:max-w-none'
            )}>
            
            {sortOptions.map((o) =>
            <option key={o.value} value={o.value}>
                {o.label}
              </option>
            )}
          </select>
          <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
        </div>
      </div>
    </div>);

}