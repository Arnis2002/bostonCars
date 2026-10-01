import React from 'react';
import { Link } from 'react-router-dom';
import { PhoneIcon } from 'lucide-react';
import { useLeadModal } from '../../contexts/LeadModalContext';
import { dealership } from '../../data/dealership';
import type { Vehicle } from '../../types/vehicle';

export function VehicleMobileActions({ vehicle }: {vehicle: Vehicle;}) {
  const { openAvailability } = useLeadModal();
  return (
    <div className="pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white px-3 py-2.5 md:hidden">
      <div className="grid grid-cols-[auto_1fr_auto] gap-2">
        <a href={dealership.phone.href} className="grid h-12 w-14 place-items-center rounded-lg border border-line text-navy" aria-label={`Call ${dealership.phone.display}`}>
          <PhoneIcon className="h-5 w-5" aria-hidden />
        </a>
        <button type="button" onClick={() => openAvailability(vehicle)} className="h-12 rounded-lg bg-brand text-[15px] font-semibold text-white active:bg-brand-dark">
          Check Availability
        </button>
        <Link to={`/financing?vehicle=${vehicle.slug}`} className="grid h-12 place-items-center rounded-lg bg-navy px-4 text-[15px] font-semibold text-white">
          Finance
        </Link>
      </div>
    </div>);

}