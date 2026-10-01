import React from 'react';
import { XIcon } from 'lucide-react';
import type { FilterChip, InventoryFilters } from '../../utils/inventoryFilters';

interface ActiveFilterChipsProps {
  chips: FilterChip[];
  onChange: (next: InventoryFilters) => void;
  onClear: () => void;
}

export function ActiveFilterChips({ chips, onChange, onClear }: ActiveFilterChipsProps) {
  if (!chips.length) return null;
  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="Active filters">
      {chips.map((chip) =>
      <button
        key={chip.id}
        type="button"
        onClick={() => onChange(chip.next)}
        className="inline-flex h-9 items-center gap-1.5 rounded border border-line-strong bg-paper pl-3 pr-2 text-[13px] font-medium transition-colors duration-150 hover:border-ink"
        aria-label={`Remove filter: ${chip.label}`}>
        
          {chip.label}
          <XIcon className="h-3.5 w-3.5 text-ink-soft" aria-hidden="true" />
        </button>
      )}
      <button type="button" onClick={onClear} className="h-9 px-2 text-[13px] font-medium text-forest underline underline-offset-4">
        Clear all
      </button>
    </div>);

}