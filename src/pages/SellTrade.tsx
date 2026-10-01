import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageTransition } from '../components/layout/PageTransition';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { TradeInForm } from '../components/trade/TradeInForm';
import { useInventory } from '../hooks/useInventory';
import { useSeo } from '../hooks/useSeo';
import { dealership } from '../data/dealership';
import { breadcrumbSchema } from '../utils/schema';
import { vehicleFullTitle } from '../utils/format';
import { cn, container } from '../utils/styles';

const steps = [
{ title: 'Share your vehicle details', text: 'VIN or plate, mileage, condition and a few photos.' },
{ title: 'We review your request', text: 'Our team looks over the details and follows up with questions.' },
{ title: 'Bring it in for inspection', text: 'Visit our Grove City lot so we can inspect and verify the vehicle.' },
{ title: 'Sell it or trade toward your next vehicle', text: 'Apply the value toward a vehicle from our inventory, or simply sell.' }];


export function SellTradePage() {
  const [params] = useSearchParams();
  const { vehicles } = useInventory();
  const target = vehicles.find((v) => v.slug === params.get('vehicle'));

  useSeo({
    title: 'Sell or Trade Your Car in Grove City, OH | Southwest Auto Sale',
    description: 'Request a trade-in or sell-your-car appraisal from Southwest Auto Sale in Grove City, Ohio. Share your vehicle details and photos online — final value subject to in-person inspection.',
    path: '/sell-trade',
    schema: [breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Sell or Trade', path: '/sell-trade' }])]
  });

  return (
    <PageTransition>
      <div className="border-b border-line bg-paper">
        <div className={cn(container, 'py-6 lg:py-10')}>
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Sell or Trade' }]} />
          <h1 className="mt-2 max-w-3xl text-[2rem] font-bold leading-tight tracking-tight text-navy sm:text-5xl">Sell or trade your vehicle</h1>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">
            Tell us about your current vehicle and the Southwest Auto Sale team will follow up about a preliminary appraisal.
          </p>
        </div>
      </div>

      <div className={cn(container, 'grid gap-10 py-10 lg:grid-cols-12 lg:gap-14 lg:py-16')}>
        <div className="lg:col-span-8">
          {target &&
          <p className="mb-5 rounded-xl border border-line bg-white px-4 py-3 text-[15px] text-steel">
              Trading toward the <span className="font-semibold text-navy">{vehicleFullTitle(target)}</span> (Stock {target.stockNumber})
            </p>
          }
          <div className="rounded-2xl border border-line bg-white p-5 shadow-card sm:p-8">
            <TradeInForm targetVehicle={target?.slug} />
          </div>
        </div>
        <aside className="lg:col-span-4">
          <h2 className="text-lg font-bold text-navy">How it works</h2>
          <ol className="mt-4 space-y-5">
            {steps.map((s, i) =>
            <li key={s.title} className="grid grid-cols-[32px_1fr] gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-navy text-sm font-bold text-white tabular">{i + 1}</span>
                <div>
                  <h3 className="font-semibold text-ink">{s.title}</h3>
                  <p className="mt-0.5 text-sm leading-relaxed text-muted">{s.text}</p>
                </div>
              </li>
            )}
          </ol>
          <div className="mt-8 rounded-2xl bg-paper p-5 text-sm leading-relaxed text-steel">
            <p className="font-semibold text-navy">Questions about your trade?</p>
            <p className="mt-1">
              Call{' '}
              <a href={dealership.phone.href} className="font-semibold text-navy underline underline-offset-2">
                {dealership.phone.display}
              </a>{' '}
              or visit us at {dealership.fullAddress}.
            </p>
          </div>
        </aside>
      </div>
    </PageTransition>);

}