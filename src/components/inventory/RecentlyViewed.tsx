import React from 'react';
import { Link } from 'react-router-dom';
import { useGarage } from '../../contexts/GarageContext';
import { formatMileage, formatPrice, vehicleTitle } from '../../utils/format';
import type { Vehicle } from '../../types/vehicle';

interface RecentlyViewedProps {
  vehicles: Vehicle[];
  excludeId?: string;
  title?: string;
}

export function RecentlyViewed({ vehicles, excludeId, title = 'Recently viewed' }: RecentlyViewedProps) {
  const { recentIds } = useGarage();
  const list = recentIds.
  filter((id) => id !== excludeId).
  map((id) => vehicles.find((v) => v.id === id)).
  filter((v): v is Vehicle => Boolean(v)).
  slice(0, 6);

  if (!list.length) return null;

  return (
    <section aria-labelledby="recent-title" className="mt-14">
      <h2 id="recent-title" className="text-xl font-bold text-navy">
        {title}
      </h2>
      <ul className="no-scrollbar -mx-4 mt-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
        {list.map((v) =>
        <li key={v.id} className="w-60 shrink-0 snap-start">
            <Link to={`/inventory/${v.slug}`} className="group block overflow-hidden rounded-xl border border-line bg-white transition-[border-color] duration-150 hover:border-navy/25">
              <div className="aspect-[4/3] overflow-hidden bg-paper">
                <img src={v.images[0].src} alt={v.images[0].alt} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="p-3">
                <p className="truncate font-semibold text-navy group-hover:text-brand-dark">{vehicleTitle(v)}</p>
                <p className="mt-0.5 text-sm text-muted tabular">
                  <span className="font-semibold text-ink">{formatPrice(v.price)}</span> · {formatMileage(v.mileage)}
                </p>
              </div>
            </Link>
          </li>
        )}
      </ul>
    </section>);

}