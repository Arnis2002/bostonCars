import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, NavigationIcon, PhoneIcon } from 'lucide-react';
import { PageTransition } from '../components/layout/PageTransition';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { Reveal } from '../components/ui/Reveal';
import { HoursList } from '../components/location/HoursList';
import { useSeo } from '../hooks/useSeo';
import { dealership } from '../data/dealership';
import { inventoryHref } from '../utils/inventoryFilters';
import { breadcrumbSchema } from '../utils/schema';
import { btn, cn, container } from '../utils/styles';

const HERO_IMAGE = "/89d9e184-6b2c-4980-8542-68f9f548eb59.jpg";

const offerings = [
{ title: 'Pre-owned cars', text: 'Sedans and hatchbacks for commuting, first vehicles and everyday driving.', to: inventoryHref({ bodyStyles: ['Sedan', 'Hatchback'] }) },
{ title: 'Pre-owned pickup trucks', text: 'Crew and extended cab trucks for work, towing and weekend projects.', to: inventoryHref({ bodyStyles: ['Pickup Truck'] }) },
{ title: 'Pre-owned SUVs', text: 'Compact to three-row SUVs with room for family and cargo.', to: inventoryHref({ bodyStyles: ['SUV'] }) },
{ title: 'Vehicle financing', text: 'We work with customers across a range of credit situations to explore financing options.', to: '/financing' },
{ title: 'Help finding a specific vehicle', text: 'Don’t see what you need? Tell us and our team can help search.', to: '/contact?reason=Vehicle%20Finder' }];


export function AboutPage() {
  useSeo({
    title: 'About Southwest Auto Sale | Grove City, OH Used Car Dealer Since 2014',
    description: 'Southwest Auto Sale is an independent pre-owned dealership in Grove City, Ohio, serving Columbus and Central Ohio since 2014 with used cars, trucks, SUVs and financing options.',
    path: '/about',
    schema: [breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }])]
  });

  return (
    <PageTransition>
      <section className="border-b border-line bg-paper">
        <div className={cn(container, 'grid items-center gap-10 py-8 lg:grid-cols-12 lg:py-14')}>
          <div className="lg:col-span-6">
            <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'About' }]} />
            <h1 className="mt-3 text-[2.25rem] font-bold leading-[1.08] tracking-tight text-navy sm:text-5xl lg:text-[3.4rem]">
              Local vehicles. Local service. Since 2014.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
              Southwest Auto Sale is an independent pre-owned dealership on Harrisburg Pike in Grove City, Ohio. Since 2014, we’ve helped drivers from Grove City, Columbus and surrounding communities find dependable cars, trucks and SUVs.
            </p>
          </div>
          <div className="lg:col-span-6">
            <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-line">
              <img src={HERO_IMAGE} alt="Pre-owned sedan, SUVs and pickup truck on a Grove City dealership lot" className="h-full w-full object-cover object-right" />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="offer-title" className="py-16 lg:py-24">
        <div className={cn(container, 'grid gap-10 lg:grid-cols-12 lg:gap-16')}>
          <Reveal className="lg:col-span-4">
            <h2 id="offer-title" className="text-[1.75rem] font-bold leading-tight tracking-tight text-navy sm:text-4xl">
              What we do
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              We keep things practical: quality used vehicles, straightforward conversations and personal help finding something that fits your needs and budget.
            </p>
          </Reveal>
          <Reveal className="lg:col-span-8" delay={0.06}>
            <ul className="divide-y divide-line border-y border-line">
              {offerings.map((o) =>
              <li key={o.title}>
                  <Link to={o.to} className="group grid gap-1 py-5 sm:grid-cols-[260px_1fr_auto] sm:items-center sm:gap-6">
                    <h3 className="text-lg font-bold text-navy group-hover:text-brand-dark">{o.title}</h3>
                    <p className="text-[15px] leading-relaxed text-muted">{o.text}</p>
                    <ArrowRightIcon className="hidden h-5 w-5 text-brand transition-transform duration-200 ease-out group-hover:translate-x-0.5 sm:block" aria-hidden />
                  </Link>
                </li>
              )}
            </ul>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="area-title" className="on-dark bg-navy py-16 text-white lg:py-20">
        <Reveal className={cn(container, 'grid gap-8 lg:grid-cols-12 lg:items-center')}>
          <div className="lg:col-span-5">
            <h2 id="area-title" className="text-[1.75rem] font-bold leading-tight tracking-tight sm:text-4xl">
              Proudly serving Central Ohio
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/80">Customers visit us from across the Columbus area. Here are a few of the communities we serve.</p>
          </div>
          <ul className="flex flex-wrap gap-2 lg:col-span-7">
            {[...dealership.serviceAreas, 'Surrounding communities'].map((area) =>
            <li key={area} className="rounded-full border border-white/20 px-4 py-2 text-[15px] font-medium text-white">
                {area}
              </li>
            )}
          </ul>
        </Reveal>
      </section>

      <section aria-labelledby="visit-title" className="py-16 lg:py-24">
        <div className={cn(container, 'grid gap-10 lg:grid-cols-2 lg:gap-16')}>
          <Reveal>
            <h2 id="visit-title" className="text-[1.75rem] font-bold leading-tight tracking-tight text-navy sm:text-4xl">
              Come see us in Grove City
            </h2>
            <address className="mt-4 text-lg not-italic text-steel">{dealership.fullAddress}</address>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href={dealership.links.directions} target="_blank" rel="noreferrer" className={btn.primary}>
                <NavigationIcon className="h-4 w-4" aria-hidden />
                Get Directions
              </a>
              <a href={dealership.phone.href} className={btn.outline}>
                <PhoneIcon className="h-4 w-4" aria-hidden />
                Call {dealership.phone.display}
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <h3 className="font-bold text-navy">Hours</h3>
            <HoursList className="mt-1" />
          </Reveal>
        </div>
      </section>
    </PageTransition>);

}