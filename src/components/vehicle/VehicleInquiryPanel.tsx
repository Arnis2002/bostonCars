import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon, PhoneIcon, NavigationIcon, Share2Icon, HandCoinsIcon, RepeatIcon } from 'lucide-react';
import { FavoriteButton } from '../inventory/FavoriteButton';
import { useGarage } from '../../contexts/GarageContext';
import { useToast } from '../../contexts/ToastContext';
import { useLeadModal } from '../../contexts/LeadModalContext';
import { dealership } from '../../data/dealership';
import { getOpenStatus } from '../../utils/hours';
import { formatMileage, formatPrice, vehicleTitle } from '../../utils/format';
import { btn, cn } from '../../utils/styles';
import type { Vehicle } from '../../types/vehicle';

export function VehicleInquiryPanel({ vehicle: v }: {vehicle: Vehicle;}) {
  const { isSaved, toggleSaved } = useGarage();
  const { notify } = useToast();
  const { openAvailability, openTestDrive } = useLeadModal();
  const status = getOpenStatus();
  const title = vehicleTitle(v);

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: `${title} ${v.trim} | ${dealership.name}`, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      notify({ title: 'Link copied', description: 'Share this vehicle with anyone.' });
    } catch {

      // Share cancelled.
    }};

  const save = () => {
    const now = toggleSaved(v.id);
    notify(now ? { title: 'Saved to your vehicles', description: title, action: { label: 'View saved vehicles', to: '/saved' } } : { title: 'Removed from saved vehicles', tone: 'info' });
  };

  return (
    <div className="rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          {v.status === 'pending' && <span className="mb-2 inline-block rounded-md bg-gold px-2 py-1 text-xs font-semibold text-ink">Sale pending</span>}
          <h1 className="text-2xl font-bold leading-tight tracking-tight text-navy sm:text-[1.75rem]">{title}</h1>
          <p className="mt-1 text-[15px] text-muted">{v.trim}</p>
        </div>
        <div className="flex shrink-0 gap-1">
          <button type="button" onClick={share} className="grid h-11 w-11 place-items-center rounded-full text-navy ring-1 ring-line hover:bg-paper" aria-label="Share this vehicle">
            <Share2Icon className="h-5 w-5" aria-hidden />
          </button>
          <FavoriteButton saved={isSaved(v.id)} onToggle={save} label={title} className="shadow-none ring-line" />
        </div>
      </div>

      <div className="mt-5 flex items-end justify-between gap-4 border-y border-line py-4">
        <div>
          <p className={cn('tabular', v.price === null ? 'text-xl font-semibold text-navy' : 'text-[2rem] font-bold leading-none tracking-tight text-ink')}>{formatPrice(v.price)}</p>
          <a href="#price-disclaimer" className="mt-1.5 inline-block text-xs text-muted underline underline-offset-2">
            Plus taxes and fees — see details
          </a>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold text-ink tabular">{formatMileage(v.mileage)}</p>
          <p className="text-xs text-muted">Stock {v.stockNumber}</p>
        </div>
      </div>

      <div className="mt-5 grid gap-2.5">
        <button type="button" onClick={() => openAvailability(v)} className={cn(btn.primary, 'h-12 text-base')}>
          Check Availability
        </button>
        <button type="button" onClick={() => openTestDrive(v)} className={cn(btn.navy, 'h-12')}>
          <CalendarIcon className="h-4 w-4" aria-hidden />
          Schedule a Test Drive
        </button>
        <div className="grid grid-cols-2 gap-2.5">
          <Link to={`/financing?vehicle=${v.slug}`} className={cn(btn.outline, 'px-3 text-sm')}>
            <HandCoinsIcon className="h-4 w-4" aria-hidden />
            Start Financing
          </Link>
          <Link to={`/sell-trade?vehicle=${v.slug}`} className={cn(btn.outline, 'px-3 text-sm')}>
            <RepeatIcon className="h-4 w-4" aria-hidden />
            Value My Trade
          </Link>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2 border-t border-line pt-4">
        <a href={dealership.phone.href} className="inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-navy hover:text-brand-dark">
          <PhoneIcon className="h-4 w-4 text-brand" aria-hidden />
          Call Dealership
        </a>
        <a href={dealership.links.directions} target="_blank" rel="noreferrer" className="inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-navy hover:text-brand-dark">
          <NavigationIcon className="h-4 w-4 text-brand" aria-hidden />
          Get Directions
        </a>
      </div>
      <p className="mt-2 flex items-center gap-2 text-sm text-muted">
        <span className={cn('h-2 w-2 rounded-full', status.isOpen ? 'bg-emerald-500' : 'bg-muted/50')} aria-hidden />
        {status.label} · {dealership.address.street}, {dealership.address.city}
      </p>
    </div>);

}