import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { PhoneIcon, ShieldCheckIcon, ClockIcon, UsersIcon } from 'lucide-react';
import { PageTransition } from '../components/layout/PageTransition';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { FinancingForm } from '../components/financing/FinancingForm';
import { useInventory } from '../hooks/useInventory';
import { useSeo } from '../hooks/useSeo';
import { dealership } from '../data/dealership';
import { financeProfiles } from '../data/homeContent';
import { disclaimers } from '../data/legal';
import { breadcrumbSchema } from '../utils/schema';
import { btn, cn, container } from '../utils/styles';

const reassurances = [
{ icon: ClockIcon, text: 'Takes about 3 minutes' },
{ icon: ShieldCheckIcon, text: 'No SSN or bank details requested' },
{ icon: UsersIcon, text: 'Reviewed by our local team' }];


export function FinancingPage() {
  const [params] = useSearchParams();
  const { vehicles, status } = useInventory();
  const requested = params.get('vehicle') ?? '';
  const initialVehicle = vehicles.some((v) => v.slug === requested) ? requested : '';

  useSeo({
    title: 'Used Car Financing in Grove City, OH | Southwest Auto Sale',
    description:
    'Start a financing request with Southwest Auto Sale in Grove City, Ohio. We work with customers across a range of credit situations, including first-time buyers. Financing subject to lender approval.',
    path: '/financing',
    schema: [breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Financing', path: '/financing' }])]
  });

  return (
    <PageTransition>
      <div className="on-dark bg-navy text-white">
        <div className={cn(container, 'pb-24 pt-6 lg:pb-28 lg:pt-8')}>
          <Breadcrumbs dark items={[{ label: 'Home', to: '/' }, { label: 'Financing' }]} />
          <h1 className="mt-3 max-w-3xl text-[2rem] font-bold leading-tight tracking-tight sm:text-5xl">Start your financing request</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/80">
            Credit situations can be different. Share a few details and our team will review the financing options available to you.
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {reassurances.map(({ icon: Icon, text }) =>
            <li key={text} className="flex items-center gap-2 text-[15px] text-white/85">
                <Icon className="h-4 w-4 text-gold" aria-hidden />
                {text}
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className={cn(container, 'relative -mt-16 grid gap-8 pb-16 lg:grid-cols-12 lg:pb-24')}>
        <div className="rounded-2xl border border-line bg-white p-5 shadow-lift sm:p-8 lg:col-span-8">
          {status === 'loading' ?
          <div className="space-y-4" aria-busy="true">
              <div className="h-2 w-full animate-pulse rounded bg-line" />
              <div className="h-8 w-2/3 animate-pulse rounded bg-line" />
              <div className="h-12 w-full animate-pulse rounded bg-line/70" />
              <div className="h-12 w-full animate-pulse rounded bg-line/70" />
            </div> :

          <FinancingForm key={initialVehicle} vehicles={vehicles} initialVehicle={initialVehicle} />
          }
        </div>

        <aside className="space-y-6 lg:col-span-4 lg:pt-20">
          <section aria-labelledby="who-title">
            <h2 id="who-title" className="text-lg font-bold text-navy">
              Who we help
            </h2>
            <ul className="mt-3 divide-y divide-line">
              {financeProfiles.map((p) =>
              <li key={p.title} className="py-3">
                  <h3 className="font-semibold text-ink">{p.title}</h3>
                  <p className="mt-0.5 text-sm leading-relaxed text-muted">{p.text}</p>
                </li>
              )}
            </ul>
          </section>
          <section aria-labelledby="talk-title" className="rounded-2xl bg-paper p-5">
            <h2 id="talk-title" className="font-bold text-navy">
              Prefer to talk it through?
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-muted">Call our Grove City team during business hours and we’ll walk you through your options.</p>
            <a href={dealership.phone.href} className={cn(btn.navy, 'mt-4 w-full')}>
              <PhoneIcon className="h-4 w-4" aria-hidden />
              Call {dealership.phone.display}
            </a>
          </section>
          <p className="text-xs leading-relaxed text-muted">{disclaimers.financing}</p>
        </aside>
      </div>
    </PageTransition>);

}