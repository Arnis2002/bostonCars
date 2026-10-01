import React from 'react';
import { Link } from 'react-router-dom';
import type { FilterChip, InventoryFilters } from '../../utils/inventoryFilters';
import { dealership } from '../../data/dealership';
import { btn } from '../../utils/styles';

interface InventoryEmptyStateProps {
  chips: FilterChip[];
  savedOnly: boolean;
  onChange: (next: InventoryFilters) => void;
  onClear: () => void;
}

export function InventoryEmptyState({ chips, savedOnly, onChange, onClear }: InventoryEmptyStateProps) {
  if (savedOnly && chips.length === 1) {
    return (
      <div className="border-y border-line py-14 text-center">
        <h2 className="font-serif text-3xl">Nothing saved yet</h2>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-ink-soft">
          Tap the heart on any car to keep it here. Saved cars stay on this device. No account needed.
        </p>
        <button type="button" onClick={onClear} className={`${btn.primary} mt-6`}>Browse all inventory</button>
      </div>);

  }

  return (
    <div className="border-y border-line py-12">
      <h2 className="font-serif text-3xl">No cars match all of those filters</h2>
      <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-ink-soft">
        Try removing one filter. Or tell us what you’re after, and we’ll let you know if a matching car comes in.
      </p>
      {chips.length > 0 &&
      <div className="mt-6">
          <p className="text-sm font-medium">Remove a filter</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {chips.map((chip) =>
          <button key={chip.id} type="button" onClick={() => onChange(chip.next)} className={btn.small}>
                Without {chip.label}
              </button>
          )}
          </div>
        </div>
      }
      <div className="mt-8 flex flex-wrap gap-3">
        <button type="button" onClick={onClear} className={btn.primary}>Clear all filters</button>
        <Link to="/about?topic=find#contact" className={btn.secondary}>Ask us to find a car</Link>
        <a href={dealership.phoneHref} className={btn.secondary}>Call {dealership.phoneDisplay}</a>
      </div>
    </div>);

}