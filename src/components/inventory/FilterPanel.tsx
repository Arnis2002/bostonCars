import React, { useMemo } from 'react';
import type { Vehicle } from '../../types/vehicle';
import {
  applyFilters,
  mileageSteps,
  priceSteps,
  uniqueSorted,
  type InventoryFilters } from
'../../utils/inventoryFilters';
import { formatCurrency, formatNumber } from '../../utils/format';
import { inputClass } from '../forms/Field';

interface FilterPanelProps {
  all: Vehicle[];
  filters: InventoryFilters;
  savedIds: string[];
  onChange: (next: InventoryFilters) => void;
  idPrefix: string;
}

function toggle(list: string[], value: string) {
  return list.includes(value) ? list.filter((x) => x !== value) : [...list, value];
}

export function FilterPanel({ all, filters, savedIds, onChange, idPrefix }: FilterPanelProps) {
  const makes = useMemo(() => uniqueSorted(all.map((v) => v.make)), [all]);
  const bodies = useMemo(() => uniqueSorted(all.map((v) => v.bodyStyle)), [all]);
  const fuels = useMemo(() => uniqueSorted(all.map((v) => v.fuelType)), [all]);
  const years = useMemo(() => uniqueSorted(all.map((v) => v.year)), [all]);

  const count = (patch: Partial<InventoryFilters>) => applyFilters(all, { ...filters, ...patch }, savedIds).length;

  const checkboxGroup = (legend: string, values: string[], selected: string[], key: 'makes' | 'bodies' | 'fuels') =>
  <fieldset className="border-t border-line py-5">
      <legend className="float-left mb-2 w-full text-sm font-semibold">{legend}</legend>
      <ul className="clear-both space-y-0.5">
        {values.map((value) => {
        const id = `${idPrefix}-${key}-${value.replace(/\W+/g, '-')}`;
        const n = count({ [key]: [value] } as Partial<InventoryFilters>);
        const checked = selected.includes(value);
        return (
          <li key={value}>
              <label htmlFor={id} className={`flex h-10 cursor-pointer items-center gap-3 text-[15px] ${n === 0 && !checked ? 'text-ink-soft' : ''}`}>
                <input
                id={id}
                type="checkbox"
                checked={checked}
                onChange={() => onChange({ ...filters, [key]: toggle(selected, value) })}
                className="h-4 w-4 accent-forest" />
              
                <span className="flex-1">{value}</span>
                <span className="text-[13px] text-ink-soft tnum" aria-label={`${n} matching`}>{n}</span>
              </label>
            </li>);

      })}
      </ul>
    </fieldset>;


  const selectCls = `${inputClass} h-11 border-line-strong pr-8 text-[14px]`;

  return (
    <div>
      {checkboxGroup('Make', makes, filters.makes, 'makes')}
      {checkboxGroup('Body style', bodies, filters.bodies, 'bodies')}
      {checkboxGroup('Fuel type', fuels, filters.fuels, 'fuels')}

      <fieldset className="border-t border-line py-5">
        <legend className="mb-2 text-sm font-semibold">Price</legend>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label htmlFor={`${idPrefix}-minPrice`} className="mb-1 block text-[13px] text-ink-soft">Minimum</label>
            <select id={`${idPrefix}-minPrice`} className={selectCls} value={filters.minPrice ?? ''} onChange={(e) => onChange({ ...filters, minPrice: e.target.value ? Number(e.target.value) : null })}>
              <option value="">No min</option>
              {priceSteps.map((p) => <option key={p} value={p}>{formatCurrency(p)}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor={`${idPrefix}-maxPrice`} className="mb-1 block text-[13px] text-ink-soft">Maximum</label>
            <select id={`${idPrefix}-maxPrice`} className={selectCls} value={filters.maxPrice ?? ''} onChange={(e) => onChange({ ...filters, maxPrice: e.target.value ? Number(e.target.value) : null })}>
              <option value="">No max</option>
              {priceSteps.map((p) => <option key={p} value={p}>{formatCurrency(p)}</option>)}
            </select>
          </div>
        </div>
      </fieldset>

      <fieldset className="border-t border-line py-5">
        <legend className="mb-2 text-sm font-semibold">Year</legend>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label htmlFor={`${idPrefix}-minYear`} className="mb-1 block text-[13px] text-ink-soft">From</label>
            <select id={`${idPrefix}-minYear`} className={selectCls} value={filters.minYear ?? ''} onChange={(e) => onChange({ ...filters, minYear: e.target.value ? Number(e.target.value) : null })}>
              <option value="">Any</option>
              {years.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor={`${idPrefix}-maxYear`} className="mb-1 block text-[13px] text-ink-soft">To</label>
            <select id={`${idPrefix}-maxYear`} className={selectCls} value={filters.maxYear ?? ''} onChange={(e) => onChange({ ...filters, maxYear: e.target.value ? Number(e.target.value) : null })}>
              <option value="">Any</option>
              {years.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
        </div>
      </fieldset>

      <fieldset className="border-t border-line py-5">
        <legend className="mb-2 text-sm font-semibold">Mileage</legend>
        <label htmlFor={`${idPrefix}-maxMiles`} className="mb-1 block text-[13px] text-ink-soft">Maximum miles</label>
        <select id={`${idPrefix}-maxMiles`} className={selectCls} value={filters.maxMiles ?? ''} onChange={(e) => onChange({ ...filters, maxMiles: e.target.value ? Number(e.target.value) : null })}>
          <option value="">Any mileage</option>
          {mileageSteps.map((m) => <option key={m} value={m}>Under {formatNumber(m)} mi ({count({ maxMiles: m })})</option>)}
        </select>
      </fieldset>
    </div>);

}