import React from 'react';
import { MapPinIcon, ClockIcon, PhoneIcon, NavigationIcon } from 'lucide-react';
import { dealership } from '../../data/dealership';
import { getOpenStatus } from '../../utils/hours';
import { container, cn } from '../../utils/styles';

export function UtilityBar() {
  const status = getOpenStatus();
  return (
    <div className="on-dark hidden bg-ink text-[13px] text-white/80 md:block">
      <div className={cn(container, 'flex h-10 items-center justify-between gap-6')}>
        <div className="flex min-w-0 items-center gap-6">
          <a href={dealership.links.maps} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 transition-colors duration-150 hover:text-white">
            <MapPinIcon className="h-3.5 w-3.5" aria-hidden />
            {dealership.address.street}, {dealership.address.city}, {dealership.address.state}
          </a>
          <span className="hidden items-center gap-1.5 lg:inline-flex">
            <ClockIcon className="h-3.5 w-3.5" aria-hidden />
            Mon–Fri 9 AM–5 PM · Sat 9 AM–2:30 PM
            <span className="mx-1 text-white/30">|</span>
            <span className={cn('inline-flex items-center gap-1.5', status.isOpen ? 'text-white' : 'text-white/70')}>
              <span className={cn('h-1.5 w-1.5 rounded-full', status.isOpen ? 'bg-emerald-400' : 'bg-white/40')} aria-hidden />
              {status.label}
            </span>
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-5">
          <a href={dealership.links.directions} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 transition-colors duration-150 hover:text-white">
            <NavigationIcon className="h-3.5 w-3.5" aria-hidden />
            Get Directions
          </a>
          <a href={dealership.phone.href} className="inline-flex items-center gap-1.5 font-semibold text-white">
            <PhoneIcon className="h-3.5 w-3.5" aria-hidden />
            Call {dealership.phone.display}
          </a>
        </div>
      </div>
    </div>);

}