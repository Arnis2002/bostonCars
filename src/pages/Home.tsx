import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, MapPinIcon, PhoneIcon } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';
import { vehicles } from '../data/vehicles';
import { editorialPhotos } from '../data/editorialPhotos';
import { dealership, addressLine } from '../data/dealership';
import { VehiclePhoto } from '../components/VehiclePhoto';
import { PhotoCredit } from '../components/PhotoCredit';
import { HeroSearch } from '../components/home/HeroSearch';
import { VehicleCard } from '../components/vehicles/VehicleCard';
import { HoursList } from '../components/visit/HoursList';
import { buildInventoryHref } from '../utils/inventoryFilters';
import { estimatePayment } from '../utils/payment';
import { formatCurrency } from '../utils/format';
import { ILLUSTRATIVE_APR } from '../components/finance/PaymentCalculator';
import { btn, container, textLink } from '../utils/styles';

const budgets = [30000, 40000, 50000];

export function Home() {
  usePageMeta(
    'Pre-owned luxury cars and SUVs in Allston',
    'Browse pre-owned luxury cars and SUVs at Boston Foreign Motor in Allston, MA. Compare details, save favorites, and plan a visit.'
  );

  const featured = vehicles.filter((v) => v.featured).slice(0, 6);

  const needs = useMemo(
    () =>
    [
    { label: 'SUVs', note: 'Room for people, gear, and snow days.', match: vehicles.filter((v) => v.bodyStyle === 'SUV'), href: buildInventoryHref({ bodies: ['SUV'] }) },
    { label: 'Sedans', note: 'Comfortable commuters and quick weekend cars.', match: vehicles.filter((v) => v.bodyStyle === 'Sedan'), href: buildInventoryHref({ bodies: ['Sedan'] }) },
    { label: 'Electric', note: 'Battery-electric cars and SUVs.', match: vehicles.filter((v) => v.fuelType === 'Electric'), href: buildInventoryHref({ fuels: ['Electric'] }) }].
    filter((n) => n.match.length > 0),
    []
  );
  const budgetLinks = budgets.
  map((b) => ({ amount: b, count: vehicles.filter((v) => v.price != null && v.price <= b).length })).
  filter((b) => b.count > 0);

  return (
    <>
      {/* Hero */}
      <section className={`${container} pt-8 sm:pt-12 lg:pt-14`}>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-5">
            <p className="flex items-center gap-3 text-[13px] text-ink-soft">
              <span className="h-px w-8 bg-ink/40" aria-hidden="true" />
              Boston Foreign Motor · Allston, Massachusetts
            </p>
            <h1 className="mt-6 font-serif text-[44px] leading-[1.02] tracking-[-0.02em] sm:text-[60px] xl:text-[76px]">
              A better look at your next car.
            </h1>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed text-ink-soft">
              Browse pre-owned luxury cars and SUVs in Allston. Compare the details, save your favorites, and arrange a time to see one in person.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/inventory" className={btn.primary}>
                Browse inventory <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link to="/about?topic=visit#contact" className={btn.secondary}>Plan a visit</Link>
            </div>
          </div>
          <figure className="lg:col-span-7">
            <div className="aspect-[4/3] overflow-hidden rounded bg-line/40">
              <VehiclePhoto photo={editorialPhotos.hero} priority sizes="(min-width: 1024px) 58vw, 100vw" widths={[640, 1000, 1400, 1900]} className="h-full w-full object-cover" />
            </div>
            <figcaption className="mt-2 flex flex-wrap justify-between gap-x-4 gap-y-1">
              <span className="text-xs text-ink-soft">Editorial photo. Not a car in inventory.</span>
              <PhotoCredit photo={editorialPhotos.hero} />
            </figcaption>
          </figure>
        </div>
        <div className="mt-8 lg:mt-10">
          <HeroSearch />
        </div>
      </section>

      {/* Featured */}
      <section className={`${container} py-20 lg:py-24`} aria-labelledby="featured-title">
        <div className="flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="featured-title" className="font-serif text-[36px] leading-tight tracking-[-0.01em] sm:text-[44px]">A few to start with</h2>
            <p className="mt-2 max-w-xl text-[15px] text-ink-soft">
              Sample listings for this preview. The live site would show current inventory from the dealership’s feed.
            </p>
          </div>
          <Link to="/inventory" className={`${textLink} shrink-0 text-[15px]`}>See all {vehicles.length} cars</Link>
        </div>
        <ul className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((v, i) =>
          <li key={v.id}>
              <VehicleCard vehicle={v} priority={i < 3} />
            </li>
          )}
        </ul>
      </section>

      {/* Browse by need */}
      <section className={`${container} pb-20 lg:pb-24`} aria-labelledby="needs-title">
        <div className="grid gap-8 border-t border-ink pt-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="needs-title" className="font-serif text-[36px] leading-tight sm:text-[40px]">Shop by what you need</h2>
            <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-ink-soft">Each shortcut opens the inventory with that filter already set.</p>
          </div>
          <ul className="lg:col-span-8">
            {needs.map((n) =>
            <li key={n.label}>
                <Link to={n.href} className="group flex items-center gap-4 border-b border-line py-4 sm:gap-6">
                  <div className="aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-sm bg-line/40 sm:w-32">
                    <VehiclePhoto photo={n.match[0].photos[0]} sizes="128px" widths={[240, 400]} className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.04]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-serif text-[28px] leading-none sm:text-[34px]">{n.label}</p>
                    <p className="mt-1.5 text-sm text-ink-soft">{n.note}</p>
                  </div>
                  <span className="hidden shrink-0 text-[15px] tnum sm:block">{n.match.length} cars</span>
                  <ArrowRightIcon className="h-5 w-5 shrink-0 text-forest transition-transform duration-150 ease-out group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </li>
            )}
            {budgetLinks.length > 0 &&
            <li className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:gap-6">
                <p className="w-32 shrink-0 font-serif text-[28px] leading-none sm:text-[34px]">Budget</p>
                <ul className="flex flex-wrap gap-2">
                  {budgetLinks.map((b) =>
                <li key={b.amount}>
                      <Link to={buildInventoryHref({ maxPrice: b.amount, sort: 'price-asc' })} className={btn.small}>
                        Under {formatCurrency(b.amount)} <span className="text-ink-soft tnum">· {b.count}</span>
                      </Link>
                    </li>
                )}
                </ul>
              </li>
            }
          </ul>
        </div>
      </section>

      {/* Photographic feature + process */}
      <section className="on-dark bg-forest-deep text-ivory" aria-labelledby="details-title">
        <figure>
          <div className="aspect-[16/9] w-full overflow-hidden md:aspect-[21/9]">
            <VehiclePhoto photo={editorialPhotos.feature} sizes="100vw" widths={[800, 1400, 2000, 2600]} className="h-full w-full object-cover" />
          </div>
          <figcaption className={`${container} pt-2`}>
            <PhotoCredit photo={editorialPhotos.feature} tone="dark" prefix="Editorial photo" />
          </figcaption>
        </figure>
        <div className={`${container} grid gap-12 py-16 lg:grid-cols-12 lg:py-20`}>
          <div className="lg:col-span-5">
            <h2 id="details-title" className="font-serif text-[38px] leading-[1.08] tracking-[-0.01em] sm:text-[48px]">See the details before you make the trip.</h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="text-[17px] leading-relaxed text-ivory/85">
              Each listing shows the price, mileage, and the specifications we have. If something isn’t listed, ask. Request more photos or the vehicle history report, and confirm the car is still here before you drive over.
            </p>
            <ol className="mt-10 space-y-0">
              {[
              { t: 'Shortlist', d: 'Save cars on this device and compare up to three side by side.' },
              { t: 'Ask', d: 'Send a question about a specific car, or call sales directly.' },
              { t: 'Visit', d: 'Every visit is by appointment, so pick a day and we’ll confirm a time.' }].
              map((s, i) =>
              <li key={s.t} className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-ivory/20 py-5">
                  <span className="font-serif text-2xl leading-none text-ivory/60 tnum">{i + 1}</span>
                  <div>
                    <p className="text-[17px] font-semibold">{s.t}</p>
                    <p className="mt-1 text-[15px] leading-relaxed text-ivory/75">{s.d}</p>
                  </div>
                </li>
              )}
            </ol>
          </div>
        </div>
      </section>

      {/* Sell or trade */}
      <section className={`${container} py-20 lg:py-24`} aria-labelledby="trade-title">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <figure>
            <div className="aspect-[4/3] overflow-hidden rounded bg-line/40">
              <VehiclePhoto photo={editorialPhotos.trade} sizes="(min-width: 1024px) 48vw, 100vw" className="h-full w-full object-cover" />
            </div>
            <figcaption className="mt-2"><PhotoCredit photo={editorialPhotos.trade} prefix="Editorial photo" /></figcaption>
          </figure>
          <div>
            <h2 id="trade-title" className="font-serif text-[38px] leading-[1.08] tracking-[-0.01em] sm:text-[48px]">Ready to move on from your current car?</h2>
            <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-ink-soft">
              Tell us the year, make, model, mileage, and general condition. The dealership reviews what you send and follows up about next steps. Any offer depends on seeing the car in person.
            </p>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-ink-soft">You can sell outright or put the value toward a car here.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/sell-or-trade" className={btn.primary}>Start an appraisal request</Link>
              <a href={dealership.phoneHref} className={btn.secondary}>Call {dealership.phoneDisplay}</a>
            </div>
          </div>
        </div>
      </section>

      <FinancingTeaser />

      {/* Visit */}
      <section className={`${container} pb-20 lg:pb-24`} aria-labelledby="visit-title">
        <div className="grid gap-10 border-t border-ink pt-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="visit-title" className="font-serif text-[38px] leading-tight sm:text-[44px]">Come see it in person.</h2>
            <p className="mt-5 flex items-start gap-2 text-[17px]">
              <MapPinIcon className="mt-1 h-5 w-5 shrink-0 text-forest" aria-hidden="true" />
              {addressLine}
            </p>
            <a href={dealership.phoneHref} className="mt-3 flex items-center gap-2 text-[22px] font-semibold tnum hover:underline">
              <PhoneIcon className="h-5 w-5 text-forest" aria-hidden="true" /> {dealership.phoneDisplay}
            </a>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/about?topic=visit#contact" className={btn.primary}>Request a visit</Link>
              <a href={dealership.directionsUrl} target="_blank" rel="noreferrer" className={btn.secondary}>Get directions</a>
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <h3 className="text-sm font-semibold">Hours</h3>
            <div className="mt-2"><HoursList /></div>
            <p className="mt-6 text-sm text-ink-soft">
              Want to hear from other customers?{' '}
              <a href={dealership.reviewsUrl} target="_blank" rel="noreferrer" className={textLink}>Read reviews online</a>
            </p>
          </div>
        </div>
      </section>
    </>);

}

function FinancingTeaser() {
  const [price, setPrice] = useState(35000);
  const down = Math.round(price * 0.1 / 100) * 100;
  const { monthlyPayment } = estimatePayment({ price, downPayment: down, tradeEquity: 0, apr: ILLUSTRATIVE_APR, termMonths: 60 });

  return (
    <section className="border-y border-line bg-paper" aria-labelledby="finance-title">
      <div className={`${container} grid gap-10 py-16 lg:grid-cols-12 lg:items-center`}>
        <div className="lg:col-span-5">
          <h2 id="finance-title" className="font-serif text-[38px] leading-tight sm:text-[44px]">Work out the numbers.</h2>
          <p className="mt-4 max-w-md text-[17px] leading-relaxed text-ink-soft">
            Try a price, down payment, and term to see a rough monthly figure. When you’re ready, send an inquiry and talk through the financing options available to you.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/financing#calculator" className={btn.primary}>Open the calculator</Link>
            <Link to="/financing#inquiry" className={btn.secondary}>Ask about financing</Link>
          </div>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <label htmlFor="teaser-price" className="flex items-baseline justify-between text-sm font-medium">
            <span>Vehicle price</span>
            <span className="text-[17px] font-semibold tnum">{formatCurrency(price)}</span>
          </label>
          <input
            id="teaser-price"
            type="range"
            min={15000}
            max={80000}
            step={500}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="mt-3 h-2 w-full cursor-pointer accent-forest" />
          
          <div className="mt-6 flex items-end justify-between gap-4 border-t border-line pt-5" aria-live="polite">
            <div>
              <p className="text-sm text-ink-soft">Estimated payment</p>
              <p className="font-serif text-[48px] leading-none tnum">{formatCurrency(monthlyPayment)}<span className="font-sans text-base text-ink-soft">/mo</span></p>
            </div>
            <p className="max-w-[14rem] text-right text-[13px] leading-snug text-ink-soft">
              10% down, 60 months, {ILLUSTRATIVE_APR}% example APR. Excludes taxes and fees. Not an offer.
            </p>
          </div>
        </div>
      </div>
    </section>);

}