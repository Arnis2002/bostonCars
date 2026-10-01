import React from 'react';
import { formatMileage, formatPrice, vehicleTitle } from '../../utils/format';
import type { Vehicle } from '../../types/vehicle';

export function VehicleMini({ vehicle }: {vehicle: Vehicle;}) {
  return (
    <div className="mb-5 flex items-center gap-3 rounded-xl border border-line p-2.5">
      <img src={vehicle.images[0].src} alt="" className="h-16 w-20 shrink-0 rounded-lg object-cover" width={80} height={64} />
      <div className="min-w-0">
        <p className="truncate font-semibold text-navy">{vehicleTitle(vehicle)}</p>
        <p className="truncate text-sm text-muted">
          {vehicle.trim} · Stock {vehicle.stockNumber}
        </p>
        <p className="mt-0.5 text-sm font-semibold text-ink tabular">
          {formatPrice(vehicle.price)} <span className="font-normal text-muted">· {formatMileage(vehicle.mileage)}</span>
        </p>
      </div>
    </div>);

}