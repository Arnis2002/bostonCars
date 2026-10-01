import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { vehicleCategories } from '../../data/homeContent';
import { applyFilters, emptyFilters, inventoryHref } from '../../utils/inventoryFilters';
import { cn, container } from '../../utils/styles';
import type { Vehicle } from '../../types/vehicle';

export function BodyStyleSelector({ vehicles }: {vehicles: Vehicle[];}) {
  const categories = useMemo(
    () =>
    vehicleCategories.
    map((c) => ({ ...c, count: applyFilters(vehicles, { ...emptyFilters(), ...c.filters }).length })).
    filter((c) => !vehicles.length || c.count > 0),
    [vehicles]
  );

  return (
    <section aria-labelledby="types-title" className="bg-white py-16 lg:py-24">
      <div className={container}>
        <SectionHeading id="types-title" title="Shop by vehicle type" description="Jump straight to the kind of vehicle that fits your day-to-day." />
        <ul className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {categories.map((c, i) => {
            const large = i < 2;
            return (
              <li key={c.id} className={cn(large ? 'col-span-2' : 'col-span-1')}>
                <Link
                  to={inventoryHref(c.filters)}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white transition-[box-shadow,border-color] duration-200 hover:border-navy/15 hover:shadow-card">
                  
                  <div className={cn('overflow-hidden bg-paper', large ? 'aspect-[16/9]' : 'aspect-[4/3]')}>
                    <img
                      src={c.image}
                      alt={c.imageAlt}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]" />
                    
                  </div>
                  <div className="flex flex-1 items-center justify-between gap-3 p-3.5 sm:p-4">
                    <div className="min-w-0">
                      <h3 className={cn('font-bold text-navy', large ? 'text-lg sm:text-xl' : 'text-[15px] sm:text-base')}>{c.label}</h3>
                      <p className="mt-0.5 hidden text-sm text-muted sm:block">
                        {large ? `${c.blurb} ` : ''}
                        {vehicles.length > 0 &&
                        <span className="tabular">
                            {c.count} available
                          </span>
                        }
                      </p>
                    </div>
                    <ArrowRightIcon className="h-5 w-5 shrink-0 text-brand transition-transform duration-200 ease-out group-hover:translate-x-0.5" aria-hidden />
                  </div>
                </Link>
              </li>);

          })}
        </ul>
      </div>
    </section>);

}