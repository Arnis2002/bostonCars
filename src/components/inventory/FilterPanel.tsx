import React, { useEffect, useMemo, useState } from 'react';
import { SearchIcon } from 'lucide-react';
import { FilterSection } from './FilterSection';
import { FilterCheckboxGroup, type FilterOption } from './FilterCheckboxGroup';
import { SearchSelect } from '../home/SearchSelect';
import { priceSteps, mileageSteps } from '../../data/formOptions';
import { countBy } from '../../utils/inventoryFilters';
import { formatCurrency, formatNumber } from '../../utils/format';
import { cn, inputBase } from '../../utils/styles';
import type { AvailabilityFilter, InventoryFilters } from '../../types/inventory';
import type { ColorFamily, Vehicle } from '../../types/vehicle';

interface FilterPanelProps {
  vehicles: Vehicle[];
  filters: InventoryFilters;
  onChange: (next: InventoryFilters) => void;
  idPrefix: string;
}

const SWATCH: Record<ColorFamily, string> = {
  Black: '#111418',
  White: '#FFFFFF',
  Silver: '#C3C7CC',
  Gray: '#6B7079',
  Red: '#B3202A',
  Blue: '#244A8F',
  Green: '#2F5D3A',
  Brown: '#6B4A2F'
};

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((x) => x !== value) : [...list, value];
}

function optionsFrom(vehicles: Vehicle[], pick: (v: Vehicle) => string): FilterOption[] {
  return Array.from(countBy(vehicles, pick).entries()).
  sort((a, b) => a[0].localeCompare(b[0])).
  map(([value, count]) => ({ value, label: value, count }));
}

function useDebouncedField(value: string, commit: (v: string) => void): [string, (v: string) => void] {
  const [local, setLocal] = useState(value);
  useEffect(() => setLocal(value), [value]);
  useEffect(() => {
    if (local === value) return undefined;
    const t = window.setTimeout(() => commit(local), 300);
    return () => window.clearTimeout(t);
  }, [local, value, commit]);
  return [local, setLocal];
}

export function FilterPanel({ vehicles, filters, onChange, idPrefix }: FilterPanelProps) {
  const set = (patch: Partial<InventoryFilters>) => onChange({ ...filters, ...patch });

  const [keyword, setKeyword] = useDebouncedField(filters.keyword, (v) => onChange({ ...filters, keyword: v }));
  const [stock, setStock] = useDebouncedField(filters.stockNumber, (v) => onChange({ ...filters, stockNumber: v }));

  const makes = useMemo(() => optionsFrom(vehicles, (v) => v.make), [vehicles]);
  const models = useMemo(
    () => Array.from(new Set(vehicles.filter((v) => !filters.makes.length || filters.makes.includes(v.make)).map((v) => v.model))).sort(),
    [vehicles, filters.makes]
  );
  const years = useMemo(() => Array.from(new Set(vehicles.map((v) => v.year))).sort((a, b) => b - a), [vehicles]);
  const bodies = useMemo(() => optionsFrom(vehicles, (v) => v.bodyStyle), [vehicles]);
  const transmissions = useMemo(() => optionsFrom(vehicles, (v) => v.transmission), [vehicles]);
  const drivetrains = useMemo(() => optionsFrom(vehicles, (v) => v.drivetrain), [vehicles]);
  const fuels = useMemo(() => optionsFrom(vehicles, (v) => v.fuelType), [vehicles]);
  const colors = useMemo(() => Array.from(new Set(vehicles.map((v) => v.exteriorColorFamily))).sort(), [vehicles]);

  const availability: {value: AvailabilityFilter;label: string;}[] = [
  { value: 'all', label: 'All in-stock vehicles' },
  { value: 'available', label: 'Available now' },
  { value: 'pending', label: 'Sale pending' }];


  return (
    <div>
      <FilterSection title="Search">
        <div className="space-y-3">
          <div>
            <label htmlFor={`${idPrefix}-kw`} className="mb-1 block text-xs font-semibold text-muted">
              Keyword
            </label>
            <div className="relative">
              <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
              <input
                id={`${idPrefix}-kw`}
                type="search"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="e.g. backup camera, 4x4"
                className={cn(inputBase, 'border-line pl-9')} />
              
            </div>
          </div>
          <div>
            <label htmlFor={`${idPrefix}-stock`} className="mb-1 block text-xs font-semibold text-muted">
              Stock number or last 6 of VIN
            </label>
            <input
              id={`${idPrefix}-stock`}
              type="text"
              value={stock}
              onChange={(e) => setStock(e.target.value.toUpperCase())}
              placeholder="e.g. SW1042"
              className={cn(inputBase, 'border-line')} />
            
          </div>
        </div>
      </FilterSection>

      <FilterSection title="Make & model" activeCount={filters.makes.length + (filters.model ? 1 : 0)}>
        <FilterCheckboxGroup
          name={`${idPrefix}-make`}
          legend="Make"
          options={makes}
          selected={filters.makes}
          onToggle={(m) => set({ makes: toggle(filters.makes, m), model: '' })} />
        
        <div className="mt-3">
          <SearchSelect id={`${idPrefix}-model`} label="Model" anyLabel="Any model" value={filters.model} onChange={(v) => set({ model: v })} options={models} />
        </div>
      </FilterSection>

      <FilterSection title="Price" activeCount={filters.priceMin !== null || filters.priceMax !== null ? 1 : 0}>
        <div className="grid grid-cols-2 gap-2">
          <SearchSelect
            id={`${idPrefix}-pmin`}
            label="Min."
            anyLabel="No min"
            value={filters.priceMin?.toString() ?? ''}
            onChange={(v) => set({ priceMin: v ? Number(v) : null })}
            options={priceSteps.map((p) => ({ value: String(p), label: formatCurrency(p) }))} />
          
          <SearchSelect
            id={`${idPrefix}-pmax`}
            label="Max."
            anyLabel="No max"
            value={filters.priceMax?.toString() ?? ''}
            onChange={(v) => set({ priceMax: v ? Number(v) : null })}
            options={priceSteps.map((p) => ({ value: String(p), label: formatCurrency(p) }))} />
          
        </div>
        <p className="mt-2 text-xs text-muted">Vehicles listed as “Contact for Price” are hidden when a price range is set.</p>
      </FilterSection>

      <FilterSection title="Year" activeCount={filters.yearMin !== null || filters.yearMax !== null ? 1 : 0}>
        <div className="grid grid-cols-2 gap-2">
          <SearchSelect
            id={`${idPrefix}-ymin`}
            label="From"
            anyLabel="Any"
            value={filters.yearMin?.toString() ?? ''}
            onChange={(v) => set({ yearMin: v ? Number(v) : null })}
            options={[...years].reverse().map(String)} />
          
          <SearchSelect
            id={`${idPrefix}-ymax`}
            label="To"
            anyLabel="Any"
            value={filters.yearMax?.toString() ?? ''}
            onChange={(v) => set({ yearMax: v ? Number(v) : null })}
            options={years.map(String)} />
          
        </div>
      </FilterSection>

      <FilterSection title="Mileage" activeCount={filters.mileageMax !== null ? 1 : 0}>
        <SearchSelect
          id={`${idPrefix}-miles`}
          label="Maximum mileage"
          anyLabel="Any mileage"
          value={filters.mileageMax?.toString() ?? ''}
          onChange={(v) => set({ mileageMax: v ? Number(v) : null })}
          options={mileageSteps.map((m) => ({ value: String(m), label: `Under ${formatNumber(m)} mi` }))} />
        
      </FilterSection>

      <FilterSection title="Body style" activeCount={filters.bodyStyles.length}>
        <FilterCheckboxGroup
          name={`${idPrefix}-body`}
          legend="Body style"
          options={bodies}
          selected={filters.bodyStyles}
          onToggle={(b) => set({ bodyStyles: toggle(filters.bodyStyles, b as InventoryFilters['bodyStyles'][number]) })} />
        
      </FilterSection>

      <FilterSection title="Transmission" defaultOpen={false} activeCount={filters.transmissions.length}>
        <FilterCheckboxGroup
          name={`${idPrefix}-trans`}
          legend="Transmission"
          options={transmissions}
          selected={filters.transmissions}
          onToggle={(t) => set({ transmissions: toggle(filters.transmissions, t as InventoryFilters['transmissions'][number]) })} />
        
      </FilterSection>

      <FilterSection title="Drivetrain" defaultOpen={false} activeCount={filters.drivetrains.length}>
        <FilterCheckboxGroup
          name={`${idPrefix}-drive`}
          legend="Drivetrain"
          options={drivetrains}
          selected={filters.drivetrains}
          onToggle={(d) => set({ drivetrains: toggle(filters.drivetrains, d as InventoryFilters['drivetrains'][number]) })} />
        
      </FilterSection>

      <FilterSection title="Fuel type" defaultOpen={false} activeCount={filters.fuelTypes.length}>
        <FilterCheckboxGroup
          name={`${idPrefix}-fuel`}
          legend="Fuel type"
          options={fuels}
          selected={filters.fuelTypes}
          onToggle={(f) => set({ fuelTypes: toggle(filters.fuelTypes, f as InventoryFilters['fuelTypes'][number]) })} />
        
      </FilterSection>

      <FilterSection title="Exterior color" defaultOpen={false} activeCount={filters.colors.length}>
        <ul className="grid grid-cols-4 gap-2">
          {colors.map((c) => {
            const active = filters.colors.includes(c);
            return (
              <li key={c}>
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => set({ colors: toggle(filters.colors, c) })}
                  className={cn(
                    'flex min-h-[64px] w-full flex-col items-center justify-center gap-1.5 rounded-lg border text-xs font-medium transition-[border-color,background-color] duration-150',
                    active ? 'border-navy bg-paper text-navy' : 'border-transparent text-steel hover:bg-paper'
                  )}>
                  
                  <span className="h-6 w-6 rounded-full ring-1 ring-black/15" style={{ backgroundColor: SWATCH[c] }} aria-hidden />
                  {c}
                </button>
              </li>);

          })}
        </ul>
      </FilterSection>

      <FilterSection title="Availability" defaultOpen={false} activeCount={filters.availability !== 'all' ? 1 : 0}>
        <fieldset>
          <legend className="sr-only">Availability</legend>
          {availability.map((a) =>
          <label key={a.value} className="flex min-h-[44px] cursor-pointer items-center gap-3 rounded-md px-1 text-[15px] text-ink hover:bg-paper">
              <input
              type="radio"
              name={`${idPrefix}-availability`}
              checked={filters.availability === a.value}
              onChange={() => set({ availability: a.value })}
              className="h-4 w-4 accent-navy" />
            
              {a.label}
            </label>
          )}
        </fieldset>
      </FilterSection>
    </div>);

}