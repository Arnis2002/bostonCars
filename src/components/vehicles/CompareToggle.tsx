import React from 'react';
import type { Vehicle } from '../../types/vehicle';
import { useGarage } from '../../contexts/GarageContext';
import { vehicleName } from '../../utils/format';

export function CompareToggle({ vehicle }: {vehicle: Vehicle;}) {
  const { isComparing, toggleCompare } = useGarage();
  const checked = isComparing(vehicle.id);
  const id = `compare-${vehicle.id}`;

  return (
    <label htmlFor={id} className="relative z-10 inline-flex h-10 cursor-pointer select-none items-center gap-2 text-sm text-ink-soft hover:text-ink">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={() => toggleCompare(vehicle.id)}
        className="h-4 w-4 rounded-sm border-line-strong accent-forest"
        aria-label={`Compare ${vehicleName(vehicle)}`} />
      
      <span aria-hidden="true">Compare</span>
    </label>);

}