import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AlertTriangleIcon, ChevronRightIcon, FileTextIcon } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';
import { getVehicle, vehicles } from '../data/vehicles';
import { Gallery } from '../components/vehicle/Gallery';
import { SpecTable } from '../components/vehicle/SpecTable';
import { InquiryPanel, type InquiryTab } from '../components/vehicle/InquiryPanel';
import { MobileActionBar } from '../components/vehicle/MobileActionBar';
import { VehicleCard } from '../components/vehicles/VehicleCard';
import { CompareToggle } from '../components/vehicles/CompareToggle';
import { formatMiles, formatPrice, orUnknown, vehicleFullName, vehicleName } from '../utils/format';
import { btn, container, textLink } from '../utils/styles';

export function VehicleDetail() {
  const { vehicleId } = useParams();
  const vehicle = getVehicle(vehicleId);
  const [tab, setTab] = useState<InquiryTab>('availability');

  usePageMeta(
    vehicle ? vehicleFullName(vehicle) : 'Vehicle not found',
    vehicle ?
    `${vehicleFullName(vehicle)}, ${formatMiles(vehicle.mileage)}, ${formatPrice(vehicle.price)}. Ask about availability or request a test drive.` :
    'This vehicle could not be found.'
  );

  const related = useMemo(() => {
    if (!vehicle) return [];
    const target = vehicle.price ?? 0;
    return vehicles.
    filter((v) => v.id !== vehicle.id).
    sort((a, b) => Number(b.bodyStyle === vehicle.bodyStyle) - Number(a.bodyStyle === vehicle.bodyStyle) || Math.abs((a.price ?? 0) - target) - Math.abs((b.price ?? 0) - target)).
    slice(0, 3);
  }, [vehicle]);

  if (!vehicle) {
    return (
      <div className={`${container} py-24`}>
        <h1 className="font-serif text-5xl">We couldn’t find that car.</h1>
        <p className="mt-4 max-w-lg text-[17px] text-ink-soft">It may have sold, or the link may be out of date.</p>
        <Link to="/inventory" className={`${btn.primary} mt-8`}>Browse inventory</Link>
      </div>);

  }

  const ask = () => {
    setTab('availability');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById('inquiry')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    window.setTimeout(() => document.getElementById('fullName')?.focus({ preventScroll: true }), reduce ? 0 : 450);
  };

  const name = vehicleName(vehicle);

  return (
    <>
      <div className={`${container} pb-32 pt-6 lg:pb-20`}>
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 text-sm text-ink-soft">
            <li><Link to="/inventory" className="hover:text-ink hover:underline">Inventory</Link></li>
            <li aria-hidden="true"><ChevronRightIcon className="h-3.5 w-3.5" /></li>
            <li aria-current="page" className="truncate text-ink">{name}</li>
          </ol>
        </nav>

        <div className="mt-5 grid gap-10 lg:grid-cols-[minmax(0,1fr)_370px] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_400px]">
          <div className="min-w-0">
            <Gallery vehicle={vehicle} />

            <header className="mt-10">
              <p className="text-sm text-ink-soft">
                {vehicle.isSample && <span className="mr-2 rounded-sm bg-ink px-1.5 py-0.5 text-[11px] font-medium text-ivory">Sample listing</span>}
                Stock {vehicle.stockNumber}
              </p>
              <h1 className="mt-3 font-serif text-[40px] leading-[1.04] tracking-[-0.015em] sm:text-[56px]">{name}</h1>
              <p className="mt-1 text-[19px] text-ink-soft">{vehicle.trim ?? 'Trim not listed'}</p>
              <dl className="mt-6 grid grid-cols-2 gap-y-5 border-y border-line py-5 sm:grid-cols-4">
                {[
                { k: 'Price', v: formatPrice(vehicle.price) },
                { k: 'Mileage', v: formatMiles(vehicle.mileage) },
                { k: 'Drivetrain', v: orUnknown(vehicle.drivetrain) },
                { k: 'Fuel', v: vehicle.fuelType }].
                map((f) =>
                <div key={f.k}>
                    <dt className="text-sm text-ink-soft">{f.k}</dt>
                    <dd className="mt-0.5 text-[20px] font-semibold tnum">{f.v}</dd>
                  </div>
                )}
              </dl>
              <div className="mt-3"><CompareToggle vehicle={vehicle} /></div>
            </header>

            <section className="mt-10" aria-labelledby="history-title">
              <h2 id="history-title" className="font-serif text-[28px]">History and disclosures</h2>
              {vehicle.disclosures.length > 0 ?
              <div role="note" className="mt-4 rounded border-l-4 border-clay bg-clay-soft p-5">
                  <p className="flex items-center gap-2 text-[15px] font-semibold">
                    <AlertTriangleIcon className="h-4 w-4 text-clay" aria-hidden="true" /> Disclosure for this vehicle
                  </p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-[15px] leading-relaxed">
                    {vehicle.disclosures.map((d) => <li key={d}>{d}</li>)}
                  </ul>
                </div> :

              <p className="mt-3 flex items-start gap-2 text-[15px] leading-relaxed text-ink-soft">
                  <FileTextIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  No disclosures are listed for this car. Ask for the vehicle history report before you visit.
                </p>
              }
              <p className="mt-3 text-[15px]">
                <span className="text-ink-soft">Title status: </span>
                <span className="font-medium">{orUnknown(vehicle.titleStatus, 'Not provided. Ask the dealership.')}</span>
              </p>
            </section>

            {vehicle.bfmCertified &&
            <section className="mt-10 border-t border-line pt-8" aria-labelledby="cert-title">
                <h2 id="cert-title" className="font-serif text-[28px]">BFM Certified</h2>
                <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
                  This car is in Boston Foreign Motor’s own certification program. It is not a manufacturer certified pre-owned program. An extended warranty is optional and sold separately.{' '}
                  <Link to="/about#certified" className={textLink}>How BFM Certified works</Link>
                </p>
              </section>
            }

            <section className="mt-10 border-t border-line pt-8" aria-labelledby="about-car-title">
              <h2 id="about-car-title" className="font-serif text-[28px]">About this car</h2>
              <p className="mt-3 max-w-2xl text-[17px] leading-relaxed">{vehicle.description}</p>
              {vehicle.isSample &&
              <p className="mt-3 max-w-2xl text-sm text-ink-soft">This is a sample listing for the redesign preview. It does not describe a car the dealership has for sale.</p>
              }
            </section>

            <section className="mt-10" aria-labelledby="specs-title">
              <h2 id="specs-title" className="mb-4 font-serif text-[28px]">Specifications</h2>
              <SpecTable vehicle={vehicle} />
            </section>
          </div>

          <aside id="inquiry" className="scroll-mt-24" aria-label={`Contact about the ${name}`}>
            <div className="lg:sticky lg:top-24">
              <InquiryPanel vehicle={vehicle} tab={tab} onTabChange={setTab} />
            </div>
          </aside>
        </div>

        {related.length > 0 &&
        <section className="mt-20 border-t border-ink pt-10" aria-labelledby="related-title">
            <div className="flex items-end justify-between gap-4">
              <h2 id="related-title" className="font-serif text-[34px] leading-tight">Similar cars</h2>
              <Link to="/inventory" className={`${textLink} text-[15px]`}>All inventory</Link>
            </div>
            <ul className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((v) =>
            <li key={v.id}><VehicleCard vehicle={v} /></li>
            )}
            </ul>
          </section>
        }
      </div>
      <MobileActionBar vehicle={vehicle} onAsk={ask} />
    </>);

}