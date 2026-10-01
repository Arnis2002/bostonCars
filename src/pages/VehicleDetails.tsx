import React, { useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckIcon, FileTextIcon, CarFrontIcon } from 'lucide-react';
import { PageTransition } from '../components/layout/PageTransition';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { VehicleGallery } from '../components/vehicle/VehicleGallery';
import { VehicleSpecifications } from '../components/vehicle/VehicleSpecifications';
import { VehicleInquiryPanel } from '../components/vehicle/VehicleInquiryPanel';
import { VehicleMobileActions } from '../components/vehicle/VehicleMobileActions';
import { VehicleCard } from '../components/inventory/VehicleCard';
import { RecentlyViewed } from '../components/inventory/RecentlyViewed';
import { EmptyState } from '../components/ui/EmptyState';
import { ErrorState } from '../components/ui/ErrorState';
import { useInventory } from '../hooks/useInventory';
import { useSeo } from '../hooks/useSeo';
import { useGarage } from '../contexts/GarageContext';
import { useLeadModal } from '../contexts/LeadModalContext';
import { disclaimers } from '../data/legal';
import { formatMileage, formatPrice, vehicleFullTitle, vehicleTitle } from '../utils/format';
import { breadcrumbSchema, vehicleSchema } from '../utils/schema';
import { btn, cn, container } from '../utils/styles';

export function VehicleDetailsPage() {
  const { slug = '' } = useParams();
  const { vehicles, status, retry } = useInventory();
  const { addRecent } = useGarage();
  const { openAvailability } = useLeadModal();
  const vehicle = vehicles.find((v) => v.slug === slug);

  useEffect(() => {
    if (vehicle) addRecent(vehicle.id);
  }, [vehicle, addRecent]);

  const similar = useMemo(() => {
    if (!vehicle) return [];
    const others = vehicles.filter((v) => v.id !== vehicle.id && v.status === 'available');
    const sameType = others.filter((v) => v.bodyStyle === vehicle.bodyStyle);
    const rest = others.
    filter((v) => v.bodyStyle !== vehicle.bodyStyle).
    sort((a, b) => Math.abs((a.price ?? 0) - (vehicle.price ?? 0)) - Math.abs((b.price ?? 0) - (vehicle.price ?? 0)));
    return [...sameType, ...rest].slice(0, 4);
  }, [vehicles, vehicle]);

  useSeo(
    vehicle ?
    {
      title: `Used ${vehicleFullTitle(vehicle)} for Sale in Grove City, OH | Southwest Auto Sale`,
      description: `${vehicleFullTitle(vehicle)} · ${formatMileage(vehicle.mileage)} · ${formatPrice(vehicle.price)}. ${vehicle.engine}, ${vehicle.drivetrain}. Check availability or schedule a test drive at Southwest Auto Sale in Grove City, OH.`,
      path: `/inventory/${vehicle.slug}`,
      image: vehicle.images[0].src,
      type: 'product',
      schema: [
      vehicleSchema(vehicle),
      breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Inventory', path: '/inventory' },
      { name: vehicleTitle(vehicle), path: `/inventory/${vehicle.slug}` }]
      )]

    } :
    { title: 'Vehicle | Southwest Auto Sale', description: 'Pre-owned vehicle at Southwest Auto Sale in Grove City, OH.', path: `/inventory/${slug}`, noindex: status !== 'loading' }
  );

  if (status === 'loading') {
    return (
      <div className={cn(container, 'py-8')} aria-busy="true">
        <div className="h-4 w-56 animate-pulse rounded bg-line" />
        <div className="mt-6 grid gap-8 lg:grid-cols-12">
          <div className="aspect-[16/10] animate-pulse rounded-2xl bg-line/70 lg:col-span-7" />
          <div className="h-96 animate-pulse rounded-2xl bg-line/50 lg:col-span-5" />
        </div>
        <span className="sr-only" role="status">
          Loading vehicle details…
        </span>
      </div>);

  }

  if (status === 'error') {
    return (
      <div className={cn(container, 'py-16')}>
        <ErrorState title="We couldn’t load this vehicle" onRetry={retry} />
      </div>);

  }

  if (!vehicle) {
    return (
      <PageTransition>
        <div className={cn(container, 'py-16')}>
          <EmptyState
            icon={CarFrontIcon}
            title="This vehicle is no longer listed"
            message="It may have recently sold or been removed from our inventory. Browse what’s available now, or tell us what you’re looking for.">
            
            <Link to="/inventory" className={btn.primary}>
              Browse Inventory
            </Link>
            <Link to="/contact?reason=Vehicle%20Finder" className={btn.outline}>
              Use our vehicle finder
            </Link>
          </EmptyState>
        </div>
      </PageTransition>);

  }

  const title = vehicleTitle(vehicle);

  return (
    <>
    <PageTransition>
      <div className={cn(container, 'pb-16 pt-5 lg:pt-6')}>
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Inventory', to: '/inventory' }, { label: `${title} ${vehicle.trim}` }]} />

        <div className="mt-4 grid gap-6 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-7 lg:row-start-1">
            <VehicleGallery images={vehicle.images} title={title} />
          </div>

          <div className="lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1">
            <div className="lg:sticky lg:top-24">
              <VehicleInquiryPanel vehicle={vehicle} />
            </div>
          </div>

          <div className="space-y-12 pt-4 lg:col-span-7 lg:row-start-2">
            <section aria-labelledby="specs-title">
              <h2 id="specs-title" className="text-xl font-bold text-navy">
                Vehicle details
              </h2>
              <div className="mt-4">
                <VehicleSpecifications vehicle={vehicle} />
              </div>
            </section>

            <section aria-labelledby="desc-title">
              <h2 id="desc-title" className="text-xl font-bold text-navy">
                About this {vehicle.model}
              </h2>
              <p className="mt-3 text-[16px] leading-relaxed text-steel">{vehicle.description}</p>
            </section>

            <section aria-labelledby="features-title">
              <h2 id="features-title" className="text-xl font-bold text-navy">
                Features
              </h2>
              <ul className="mt-4 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                {vehicle.features.map((f) =>
                  <li key={f} className="flex items-start gap-2.5 text-[15px] text-ink">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
                    {f}
                  </li>
                  )}
              </ul>
            </section>

            <section aria-labelledby="history-title" className="flex flex-col gap-4 rounded-2xl bg-paper p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div className="flex items-start gap-3">
                <FileTextIcon className="mt-0.5 h-6 w-6 shrink-0 text-navy" aria-hidden />
                <div>
                  <h2 id="history-title" className="font-bold text-navy">
                    Vehicle history report
                  </h2>
                  <p className="mt-0.5 text-[15px] text-muted">
                    {vehicle.historyReportUrl ? 'View the third-party history report for this VIN.' : 'Ask our team about the vehicle history report for this VIN.'}
                  </p>
                </div>
              </div>
              {vehicle.historyReportUrl ?
                <a href={vehicle.historyReportUrl} target="_blank" rel="noreferrer" className={cn(btn.outline, 'shrink-0')}>
                  View report
                </a> :

                <button
                  type="button"
                  onClick={() => openAvailability(vehicle, `Hi, could you share the vehicle history report for the ${vehicleFullTitle(vehicle)} (VIN ${vehicle.vin})?`)}
                  className={cn(btn.outline, 'shrink-0')}>
                  
                  Request report
                </button>
                }
            </section>

            <p id="price-disclaimer" className="scroll-mt-24 text-xs leading-relaxed text-muted">
              {disclaimers.price} {disclaimers.financing}
            </p>
          </div>
        </div>

        {similar.length > 0 &&
          <section aria-labelledby="similar-title" className="mt-16 border-t border-line pt-12">
            <div className="flex items-end justify-between gap-4">
              <h2 id="similar-title" className="text-2xl font-bold text-navy">
                Similar vehicles
              </h2>
              <Link to="/inventory" className="min-h-[44px] content-center font-semibold text-navy hover:text-brand-dark">
                View all
              </Link>
            </div>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {similar.map((v) =>
              <li key={v.id}>
                  <VehicleCard vehicle={v} />
                </li>
              )}
            </ul>
          </section>
          }

        <RecentlyViewed vehicles={vehicles} excludeId={vehicle.id} />
      </div>
    </PageTransition>
    <VehicleMobileActions vehicle={vehicle} />
    </>);

}