import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { VehicleCard } from '../inventory/VehicleCard';
import { LoadingSkeleton } from '../inventory/LoadingSkeleton';
import { ErrorState } from '../ui/ErrorState';
import { disclaimers } from '../../data/legal';
import { cn, container } from '../../utils/styles';
import type { LoadStatus } from '../../types/inventory';
import type { Vehicle } from '../../types/vehicle';

interface FeaturedInventoryProps {
  vehicles: Vehicle[];
  status: LoadStatus;
  onRetry: () => void;
}

export function FeaturedInventory({ vehicles, status, onRetry }: FeaturedInventoryProps) {
  const featured = vehicles.filter((v) => v.featured && v.status === 'available').slice(0, 8);

  return (
    <section aria-labelledby="featured-title" className="bg-paper py-16 lg:py-24">
      <div className={container}>
        <SectionHeading
          id="featured-title"
          title="Featured pre-owned vehicles"
          description="A selection of cars, trucks and SUVs available now at our Grove City lot."
          action={
          <Link to="/inventory" className="inline-flex min-h-[44px] items-center gap-1.5 font-semibold text-navy hover:text-brand-dark">
              View all {vehicles.length ? `${vehicles.length} vehicles` : 'inventory'}
              <ArrowRightIcon className="h-4 w-4" aria-hidden />
            </Link>
          } />
        
        <div className={cn('mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4')}>
          {status === 'loading' && <LoadingSkeleton count={8} />}
          {status === 'success' && featured.map((v, i) => <VehicleCard key={v.id} vehicle={v} priority={i < 4} />)}
        </div>
        {status === 'error' && <ErrorState onRetry={onRetry} />}
        <p className="mt-6 text-xs leading-relaxed text-muted">{disclaimers.price}</p>
      </div>
    </section>);

}