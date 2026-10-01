import React from 'react';
import { FilterPanel } from './FilterPanel';
import type { InventoryFilters } from '../../types/inventory';
import type { Vehicle } from '../../types/vehicle';

interface FilterSidebarProps {
  vehicles: Vehicle[];
  filters: InventoryFilters;
  onChange: (next: InventoryFilters) => void;
  activeCount: number;
  onClear: () => void;
}

export function FilterSidebar({ vehicles, filters, onChange, activeCount, onClear }: FilterSidebarProps) {
  return (
    <aside aria-label="Inventory filters" className="hidden w-72 shrink-0 lg:block">
      <div className="no-scrollbar sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pb-6 pr-1">
        <div className="flex items-center justify-between border-b border-line pb-3">
          <h2 className="text-lg font-bold text-navy">Filters</h2>
          {activeCount > 0 &&
          <button type="button" onClick={onClear} className="min-h-[44px] px-1 text-sm font-semibold text-brand hover:text-brand-dark">
              Clear all ({activeCount})
            </button>
          }
        </div>
        <FilterPanel vehicles={vehicles} filters={filters} onChange={onChange} idPrefix="side" />
      </div>
    </aside>);

}