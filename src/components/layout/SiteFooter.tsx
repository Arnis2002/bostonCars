import React from 'react';
import { Link } from 'react-router-dom';
import { dealership, addressLine } from '../../data/dealership';
import { navItems } from './SiteHeader';
import { container } from '../../utils/styles';

export function SiteFooter() {
  return (
    <footer className="on-dark bg-ink text-ivory">
      <div className={`${container} grid gap-10 py-14 md:grid-cols-12`}>
        <div className="md:col-span-5">
          <p className="font-serif text-3xl">Boston Foreign Motor</p>
          <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-ivory/75">
            Pre-owned luxury cars and SUVs on Cambridge Street in Allston. Visits are by appointment.
          </p>
          <a href={dealership.phoneHref} className="mt-6 inline-block text-2xl font-semibold tnum hover:underline">
            {dealership.phoneDisplay}
          </a>
          <p className="mt-1 text-sm text-ivory/70">Sales</p>
        </div>

        <div className="md:col-span-3">
          <p className="text-sm font-semibold">Shop</p>
          <ul className="mt-3 space-y-2 text-[15px] text-ivory/80">
            {navItems.map((item) =>
            <li key={item.to}>
                <Link to={item.to} className="hover:text-ivory hover:underline">{item.label}</Link>
              </li>
            )}
            <li>
              <Link to="/inventory?saved=1" className="hover:text-ivory hover:underline">Saved vehicles</Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="text-sm font-semibold">Visit</p>
          <p className="mt-3 text-[15px] text-ivory/80">{addressLine}</p>
          <a href={dealership.directionsUrl} target="_blank" rel="noreferrer" className="mt-1 inline-block text-[15px] underline underline-offset-4">
            Get directions
          </a>
          <dl className="mt-5 space-y-1 text-sm text-ivory/80">
            {dealership.hours.map((h) =>
            <div key={h.days} className="flex justify-between gap-4 tnum">
                <dt>{h.days}</dt>
                <dd>{h.time}</dd>
              </div>
            )}
          </dl>
          <p className="mt-2 text-sm text-ivory/70">By appointment.</p>
        </div>
      </div>
      <div className="border-t border-ivory/15">
        <div className={`${container} flex flex-col gap-2 py-5 text-xs text-ivory/65 sm:flex-row sm:justify-between`}>
          <p>Redesign preview. Sample inventory and non-sending forms. Not the official dealership website.</p>
          <p>
            <Link to="/about#credits" className="underline underline-offset-2 hover:text-ivory">Photo credits</Link>
            {' · '}
            <a href={dealership.officialSite} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-ivory">Current website</a>
          </p>
        </div>
      </div>
    </footer>);

}