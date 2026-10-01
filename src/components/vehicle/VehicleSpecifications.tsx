import React from 'react';
import { formatMPG, formatNumber } from '../../utils/format';
import type { Vehicle } from '../../types/vehicle';

export function VehicleSpecifications({ vehicle: v }: {vehicle: Vehicle;}) {
  const rows: [string, string][] = [
  ['Mileage', `${formatNumber(v.mileage)} miles`],
  ['Body style', v.bodyStyle],
  ['Engine', v.engine],
  ['Transmission', v.transmission],
  ['Drivetrain', v.drivetrain],
  ['Fuel type', v.fuelType],
  ['Fuel economy', `${formatMPG(v)} MPG (EPA est.)`],
  ['Exterior color', v.exteriorColor],
  ['Interior color', v.interiorColor],
  ['Seating', `${v.seating} passengers`],
  ['VIN', v.vin],
  ['Stock number', v.stockNumber],
  ['Availability', v.status === 'available' ? 'Available' : 'Sale pending']];


  return (
    <dl className="grid border-t border-line sm:grid-cols-2 sm:gap-x-10">
      {rows.map(([label, value]) =>
      <div key={label} className="flex items-baseline justify-between gap-4 border-b border-line py-3">
          <dt className="text-[15px] text-muted">{label}</dt>
          <dd className="text-right text-[15px] font-medium text-ink break-all">{value}</dd>
        </div>
      )}
    </dl>);

}