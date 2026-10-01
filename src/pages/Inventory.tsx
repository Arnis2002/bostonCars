import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { HeartIcon, SearchIcon, SlidersHorizontalIcon, XIcon } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';
import { vehicles } from '../data/vehicles';
import { useGarage } from '../contexts/GarageContext';
import { VehicleCard } from '../components/vehicles/VehicleCard';
import { FilterPanel } from '../components/inventory/FilterPanel';
import { ActiveFilterChips } from '../components/inventory/ActiveFilterChips';
import { InventoryEmptyState } from '../components/inventory/InventoryEmptyState';
import { Dialog } from '../components/Dialog';
import { inputClass } from '../components/forms/Field';
import {
  applyFilters,
  clearFilters,
  filtersToParams,
  getChips,
  parseFilters,
  sortOptions,
  sortVehicles,
  type InventoryFilters,
  type SortKey } from
'../utils/inventoryFilters';
import { container } from '../utils/styles';

export function Inventory() {
  usePageMeta('Inventory', 'Search pre-owned luxury cars and SUVs by make, body style, price, year, and mileage.');
  const [params, setParams] = useSearchParams();
  const filters = useMemo(() => parseFilters(params), [params]);
  const { savedIds } = useGarage();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [query, setQuery] = useState(filters.q);

  const results = useMemo(() => sortVehicles(applyFilters(vehicles, filters, savedIds), filters.sort), [filters, savedIds]);
  const chips = getChips(filters);
  const filterCount = chips.filter((c) => c.id !== 'q' && c.id !== 'saved').length;

  const update = (next: InventoryFilters) => setParams(filtersToParams(next), { replace: true });
  const clearAll = () => {
    setQuery('');
    update(clearFilters(filters));
  };

  useEffect(() => setQuery(filters.q), [filters.q]);
  useEffect(() => {
    if (query === filters.q) return undefined;
    const t = window.setTimeout(() => update({ ...filters, q: query }), 250);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const savedToggle =
  <button
    type="button"
    aria-pressed={filters.savedOnly}
    onClick={() => update({ ...filters, savedOnly: !filters.savedOnly })}
    className={`inline-flex h-11 items-center gap-2 rounded border px-3.5 text-sm font-medium transition-colors duration-150 ${filters.savedOnly ? 'border-ink bg-ink text-ivory' : 'border-line-strong bg-paper hover:border-ink'}`}>
    
      <HeartIcon className={`h-4 w-4 ${filters.savedOnly ? 'fill-ivory' : ''}`} aria-hidden="true" />
      Saved <span className="tnum">({savedIds.length})</span>
    </button>;


  return (
    <div className={`${container} pb-28 pt-10`}>
      <header className="flex flex-col gap-6 border-b border-line pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="font-serif text-[44px] leading-none tracking-[-0.015em] sm:text-[56px]">Inventory</h1>
          <p className="mt-3 text-[15px] text-ink-soft tnum" aria-live="polite">
            {filters.savedOnly ? 'Showing saved cars: ' : 'Showing '}
            <strong className="font-semibold text-ink">{results.length}</strong> of {vehicles.length} sample listings
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_220px] lg:w-[560px]">
          <div>
            <label htmlFor="inventory-search" className="mb-1.5 block text-sm font-medium">Search make or model</label>
            <div className="relative">
              <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" aria-hidden="true" />
              <input
                id="inventory-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. X5, Taycan, Volvo"
                className={`${inputClass} h-12 border-line-strong pl-9 pr-10`} />
              
              {query &&
              <button type="button" onClick={() => setQuery('')} className="absolute right-1 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center text-ink-soft hover:text-ink" aria-label="Clear search">
                  <XIcon className="h-4 w-4" aria-hidden="true" />
                </button>
              }
            </div>
          </div>
          <div>
            <label htmlFor="inventory-sort" className="mb-1.5 block text-sm font-medium">Sort by</label>
            <select id="inventory-sort" value={filters.sort} onChange={(e) => update({ ...filters, sort: e.target.value as SortKey })} className={`${inputClass} h-12 border-line-strong pr-8`}>
              {sortOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>
      </header>

      <div className="mt-5 flex gap-2 lg:hidden">
        <button type="button" onClick={() => setDrawerOpen(true)} className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded border border-ink bg-ink px-4 text-sm font-medium text-ivory sm:flex-none" aria-haspopup="dialog">
          <SlidersHorizontalIcon className="h-4 w-4" aria-hidden="true" />
          Filters{filterCount > 0 && <span className="tnum"> ({filterCount})</span>}
        </button>
        {savedToggle}
      </div>

      <div className="mt-6 lg:grid lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-10">
        <aside className="hidden lg:block" aria-label="Filters">
          <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pb-6 pr-2">
            <div className="flex items-center justify-between pb-4">
              <h2 className="text-[15px] font-semibold">Filters</h2>
              {chips.length > 0 &&
              <button type="button" onClick={clearAll} className="text-sm font-medium text-forest underline underline-offset-4">Clear all</button>
              }
            </div>
            <div className="pb-5">{savedToggle}</div>
            <FilterPanel all={vehicles} filters={filters} savedIds={savedIds} onChange={update} idPrefix="side" />
          </div>
        </aside>

        <section aria-label="Results">
          <ActiveFilterChips chips={chips} onChange={update} onClear={clearAll} />
          <div className={chips.length ? 'mt-6' : ''}>
            {results.length === 0 ?
            <InventoryEmptyState chips={chips} savedOnly={filters.savedOnly} onChange={update} onClear={clearAll} /> :

            <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
                {results.map((v, i) =>
              <li key={v.id}>
                    <VehicleCard vehicle={v} priority={i < 3} sizes="(min-width: 1280px) 26vw, (min-width: 1024px) 36vw, (min-width: 640px) 45vw, 100vw" />
                  </li>
              )}
              </ul>
            }
          </div>
        </section>
      </div>

      <Dialog open={drawerOpen} onClose={() => setDrawerOpen(false)} labelledBy="filters-title" variant="drawer-left" panelClassName="flex h-full w-[88vw] max-w-sm flex-col bg-ivory">
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5">
          <h2 id="filters-title" className="font-serif text-2xl">Filters</h2>
          <button type="button" onClick={() => setDrawerOpen(false)} className="inline-flex h-11 w-11 items-center justify-center rounded" aria-label="Close filters">
            <XIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5">
          <FilterPanel all={vehicles} filters={filters} savedIds={savedIds} onChange={update} idPrefix="drawer" />
        </div>
        <div className="pb-safe grid shrink-0 grid-cols-[auto_1fr] gap-3 border-t border-line bg-paper px-5 pt-3">
          <button type="button" onClick={clearAll} className="h-12 px-3 text-sm font-medium text-forest underline underline-offset-4">Clear all</button>
          <button type="button" onClick={() => setDrawerOpen(false)} className="inline-flex h-12 items-center justify-center rounded bg-forest text-[15px] font-medium text-ivory tnum">
            Show {results.length} {results.length === 1 ? 'car' : 'cars'}
          </button>
        </div>
      </Dialog>
    </div>);

}