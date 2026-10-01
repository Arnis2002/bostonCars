import React from 'react';
import { PhoneIcon } from 'lucide-react';
import type { Vehicle } from '../../types/vehicle';
import { dealership } from '../../data/dealership';
import { formatMiles, formatPrice } from '../../utils/format';

interface MobileActionBarProps {
  vehicle: Vehicle;
  onAsk: () => void;
}

export function MobileActionBar({ vehicle, onAsk }: MobileActionBarProps) {
  return (
    <div className="pb-safe fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper px-4 pt-3 shadow-bar lg:hidden">
      <div className="mx-auto flex max-w-xl items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[18px] font-semibold leading-tight tnum">{formatPrice(vehicle.price)}</p>
          <p className="text-[13px] text-ink-soft tnum">{formatMiles(vehicle.mileage)}</p>
        </div>
        <a href={dealership.phoneHref} className="inline-flex h-12 w-12 items-center justify-center rounded border border-line-strong" aria-label={`Call sales at ${dealership.phoneDisplay}`}>
          <PhoneIcon className="h-5 w-5" aria-hidden="true" />
        </a>
        <button type="button" onClick={onAsk} className="inline-flex h-12 items-center justify-center rounded bg-forest px-4 text-[15px] font-medium text-ivory">
          Check availability
        </button>
      </div>
    </div>);

}