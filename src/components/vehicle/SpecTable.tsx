import React from 'react';
import type { Vehicle } from '../../types/vehicle';
import { formatMiles, orUnknown } from '../../utils/format';

export function SpecTable({ vehicle }: {vehicle: Vehicle;}) {
  const specs: {label: string;value: string | null;}[] = [
  { label: 'Year', value: String(vehicle.year) },
  { label: 'Make', value: vehicle.make },
  { label: 'Model', value: vehicle.model },
  { label: 'Trim', value: vehicle.trim },
  { label: 'Mileage', value: formatMiles(vehicle.mileage) },
  { label: 'Body style', value: vehicle.bodyStyle },
  { label: 'Drivetrain', value: vehicle.drivetrain },
  { label: 'Fuel type', value: vehicle.fuelType },
  { label: 'Engine', value: vehicle.engine },
  { label: 'Transmission', value: vehicle.transmission },
  { label: 'Exterior color', value: vehicle.exteriorColor },
  { label: 'Interior color', value: vehicle.interiorColor },
  { label: 'Title status', value: vehicle.titleStatus },
  { label: 'VIN', value: vehicle.vin },
  { label: 'Stock number', value: vehicle.stockNumber }];


  return (
    <dl className="grid border-t border-line sm:grid-cols-2 sm:gap-x-10">
      {specs.map((s) =>
      <div key={s.label} className="flex items-baseline justify-between gap-4 border-b border-line py-3">
          <dt className="text-sm text-ink-soft">{s.label}</dt>
          <dd className={`text-right text-[15px] tnum ${s.value ? 'font-medium' : 'text-ink-soft'}`}>
            {s.label === 'VIN' && !s.value ? vehicle.isSample ? 'Not shown for sample listings' : 'Not listed' : orUnknown(s.value, 'Not listed')}
          </dd>
        </div>
      )}
    </dl>);

}