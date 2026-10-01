import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, CameraIcon } from 'lucide-react';
import { FavoriteButton } from './FavoriteButton';
import { useGarage } from '../../contexts/GarageContext';
import { useToast } from '../../contexts/ToastContext';
import { useLeadModal } from '../../contexts/LeadModalContext';
import { formatMileage, formatPrice, vehicleTitle } from '../../utils/format';
import { btn, cn } from '../../utils/styles';
import type { Vehicle } from '../../types/vehicle';

interface VehicleCardProps {
  vehicle: Vehicle;
  priority?: boolean;
}

export function VehicleCard({ vehicle: v, priority }: VehicleCardProps) {
  const { isSaved, toggleSaved, isComparing, toggleCompare } = useGarage();
  const { notify } = useToast();
  const { openAvailability } = useLeadModal();
  const title = vehicleTitle(v);
  const href = `/inventory/${v.slug}`;
  const saved = isSaved(v.id);
  const comparing = isComparing(v.id);

  const handleSave = () => {
    const nowSaved = toggleSaved(v.id);
    notify(
      nowSaved ?
      { title: 'Saved to your vehicles', description: title, action: { label: 'View saved vehicles', to: '/saved' } } :
      { title: 'Removed from saved vehicles', description: title, tone: 'info' }
    );
  };

  const handleCompare = () => {
    if (toggleCompare(v.id) === 'full') {
      notify({ title: 'You can compare up to 3 vehicles', description: 'Remove one from the compare tray to add another.', tone: 'info' });
    }
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white transition-[box-shadow,border-color] duration-200 hover:border-navy/15 hover:shadow-card">
      <div className="relative aspect-[4/3] overflow-hidden bg-paper">
        <Link to={href} tabIndex={-1} aria-hidden="true">
          <img
            src={v.images[0].src}
            alt={v.images[0].alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            width={800}
            height={600}
            className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]" />
          
        </Link>
        {v.status === 'pending' &&
        <span className="absolute left-3 top-3 rounded-md bg-gold px-2 py-1 text-xs font-semibold text-ink">Sale pending</span>
        }
        <FavoriteButton saved={saved} onToggle={handleSave} label={title} className="absolute right-3 top-3" />
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-md bg-ink/75 px-2 py-1 text-xs font-medium text-white">
          <CameraIcon className="h-3.5 w-3.5" aria-hidden />
          {v.images.length}
          <span className="sr-only">photos</span>
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-[17px] font-bold leading-snug text-navy">
          <Link to={href} className="transition-colors duration-150 hover:text-brand-dark">
            {title}
          </Link>
        </h3>
        <p className="truncate text-sm text-muted">{v.trim}</p>

        <div className="mt-3 flex items-baseline justify-between gap-3">
          <p className={cn('tabular', v.price === null ? 'text-base font-semibold text-navy' : 'text-2xl font-bold tracking-tight text-ink')}>
            {formatPrice(v.price)}
          </p>
          <p className="shrink-0 text-sm font-semibold text-steel tabular">{formatMileage(v.mileage)}</p>
        </div>

        <dl className="mt-3 grid grid-cols-3 gap-2 border-t border-line pt-3 text-[13px]">
          <div className="min-w-0">
            <dt className="text-muted">Trans.</dt>
            <dd className="truncate font-medium text-ink">{v.transmission}</dd>
          </div>
          <div className="min-w-0">
            <dt className="text-muted">Drive</dt>
            <dd className="truncate font-medium text-ink">{v.drivetrain}</dd>
          </div>
          <div className="min-w-0">
            <dt className="text-muted">Stock #</dt>
            <dd className="truncate font-medium text-ink">{v.stockNumber}</dd>
          </div>
        </dl>

        <div className="mt-auto pt-4">
          <button type="button" onClick={() => openAvailability(v)} className={cn(btn.primary, 'w-full text-sm')}>
            Check Availability
          </button>
          <div className="mt-1 flex items-center justify-between">
            <Link to={href} className="inline-flex min-h-[44px] items-center gap-1 text-sm font-semibold text-navy transition-colors duration-150 hover:text-brand-dark">
              View Details
              <ArrowRightIcon className="h-4 w-4" aria-hidden />
            </Link>
            <label className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 text-sm text-muted">
              <input
                type="checkbox"
                checked={comparing}
                onChange={handleCompare}
                className="h-4 w-4 cursor-pointer rounded border-steel/40 accent-navy"
                aria-label={`Compare ${title}`} />
              
              Compare
            </label>
          </div>
        </div>
      </div>
    </article>);

}