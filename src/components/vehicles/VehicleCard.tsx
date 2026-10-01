import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import type { Vehicle } from '../../types/vehicle';
import { VehiclePhoto } from '../VehiclePhoto';
import { SaveButton } from './SaveButton';
import { CompareToggle } from './CompareToggle';
import { formatMiles, formatPrice, orUnknown, vehicleName } from '../../utils/format';

interface VehicleCardProps {
  vehicle: Vehicle;
  sizes?: string;
  priority?: boolean;
  showCompare?: boolean;
}

export function VehicleCard({ vehicle, sizes = '(min-width: 1280px) 30vw, (min-width: 640px) 45vw, 100vw', priority = false, showCompare = true }: VehicleCardProps) {
  const href = `/inventory/${vehicle.id}`;
  const hasDisclosure = vehicle.disclosures.length > 0;

  return (
    <article className="group relative flex h-full flex-col">
      <div className="relative aspect-[4/3] overflow-hidden rounded bg-line/40">
        <VehiclePhoto
          photo={vehicle.photos[0]}
          sizes={sizes}
          priority={priority}
          className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]" />
        
        <div className="absolute right-2.5 top-2.5">
          <SaveButton vehicle={vehicle} />
        </div>
        <div className="absolute bottom-2.5 left-2.5 flex flex-wrap gap-1.5">
          {vehicle.isSample && <span className="rounded-sm bg-ink/80 px-2 py-1 text-[11px] font-medium text-ivory">Sample listing</span>}
          {hasDisclosure && <span className="rounded-sm bg-clay px-2 py-1 text-[11px] font-medium text-ivory">Disclosure</span>}
          {vehicle.bfmCertified && <span className="rounded-sm bg-forest px-2 py-1 text-[11px] font-medium text-ivory">BFM Certified</span>}
        </div>
      </div>

      <div className="flex flex-1 flex-col pt-4">
        <h3 className="text-[17px] font-semibold leading-snug">
          <Link to={href} className="before:absolute before:inset-0 before:content-[''] focus-visible:outline-none">
            {vehicleName(vehicle)}
          </Link>
        </h3>
        <p className="mt-0.5 line-clamp-1 text-[15px] text-ink-soft">{vehicle.trim ?? 'Trim not listed'}</p>

        <div className="mt-3 flex items-baseline justify-between gap-3">
          <p className="text-[22px] font-semibold tracking-[-0.01em] tnum">{formatPrice(vehicle.price)}</p>
          <p className="text-[15px] text-ink tnum">{formatMiles(vehicle.mileage)}</p>
        </div>

        <dl className="mt-3 grid grid-cols-3 gap-2 border-t border-line pt-3 text-[13px]">
          <div>
            <dt className="text-ink-soft">Body</dt>
            <dd className="mt-0.5">{vehicle.bodyStyle}</dd>
          </div>
          <div>
            <dt className="text-ink-soft">Drive</dt>
            <dd className="mt-0.5">{orUnknown(vehicle.drivetrain, '—')}</dd>
          </div>
          <div>
            <dt className="text-ink-soft">Fuel</dt>
            <dd className="mt-0.5">{vehicle.fuelType}</dd>
          </div>
        </dl>

        <div className="mt-auto flex items-center justify-between pt-3">
          {showCompare ? <CompareToggle vehicle={vehicle} /> : <span />}
          <span className="inline-flex items-center gap-1 text-sm font-medium text-forest" aria-hidden="true">
            Details <ArrowRightIcon className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </article>);

}