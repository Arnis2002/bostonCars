import React from 'react';
import { Link } from 'react-router-dom';
import { PhoneIcon, MailIcon, MapPinIcon } from 'lucide-react';
import { Logo } from './Logo';
import { HoursList } from '../location/HoursList';
import { dealership } from '../../data/dealership';
import { legalNav } from '../../data/navigation';
import { disclaimers } from '../../data/legal';
import { inventoryHref } from '../../utils/inventoryFilters';
import { cn, container } from '../../utils/styles';

const shopLinks = [
{ label: 'All inventory', to: '/inventory' },
{ label: 'Used cars', to: inventoryHref({ bodyStyles: ['Sedan', 'Hatchback'] }) },
{ label: 'Used SUVs', to: inventoryHref({ bodyStyles: ['SUV'] }) },
{ label: 'Used pickup trucks', to: inventoryHref({ bodyStyles: ['Pickup Truck'] }) },
{ label: 'Vehicles under $10K', to: inventoryHref({ tags: ['under-10k'] }) },
{ label: 'Saved vehicles', to: '/saved' }];


const dealerLinks = [
{ label: 'Financing', to: '/financing' },
{ label: 'Sell or Trade', to: '/sell-trade' },
{ label: 'Vehicle finder', to: '/contact?reason=Vehicle%20Finder' },
{ label: 'About us', to: '/about' },
{ label: 'Reviews', to: '/reviews' },
{ label: 'Contact', to: '/contact' }];


const linkClass = 'inline-flex min-h-[36px] items-center text-[15px] text-white/75 transition-colors duration-150 hover:text-white';

export function Footer() {
  return (
    <footer className="on-dark bg-navy text-white">
      <div className={cn(container, 'grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-12')}>
        <div className="lg:col-span-4">
          <Logo variant="light" />
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/75">{dealership.positioning}</p>
          <address className="mt-6 space-y-2 not-italic">
            <a href={dealership.links.maps} target="_blank" rel="noreferrer" className="flex items-start gap-2.5 text-[15px] text-white/85 hover:text-white">
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
              {dealership.fullAddress}
            </a>
            <a href={dealership.phone.href} className="flex items-center gap-2.5 text-[15px] font-semibold text-white">
              <PhoneIcon className="h-4 w-4 text-brand" aria-hidden />
              {dealership.phone.display}
            </a>
            <a href={`mailto:${dealership.email}`} className="flex items-center gap-2.5 break-all text-[15px] text-white/85 hover:text-white">
              <MailIcon className="h-4 w-4 shrink-0 text-brand" aria-hidden />
              {dealership.email}
            </a>
          </address>
        </div>

        <nav aria-label="Shop" className="lg:col-span-2">
          <h2 className="text-sm font-semibold text-white">Shop</h2>
          <ul className="mt-3">
            {shopLinks.map((l) =>
            <li key={l.label}>
                <Link to={l.to} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            )}
          </ul>
        </nav>

        <nav aria-label="Dealership" className="lg:col-span-2">
          <h2 className="text-sm font-semibold text-white">Dealership</h2>
          <ul className="mt-3">
            {dealerLinks.map((l) =>
            <li key={l.label}>
                <Link to={l.to} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            )}
          </ul>
        </nav>

        <div className="lg:col-span-4">
          <h2 className="text-sm font-semibold text-white">Hours</h2>
          <HoursList dark className="mt-2" />
          <p className="mt-5 text-sm leading-relaxed text-white/70">
            Proudly serving Grove City, Columbus, Lincoln Village, Upper Arlington, Bexley, Hilliard and surrounding Central Ohio communities.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className={cn(container, 'space-y-4 py-6 text-[13px] leading-relaxed text-white/65')}>
          <p>{disclaimers.price}</p>
          <p>{disclaimers.financing}</p>
          <div className="flex flex-col gap-3 pt-2 md:flex-row md:items-center md:justify-between">
            <p>
              © {new Date().getFullYear()} {dealership.name}. All rights reserved.
            </p>
            <ul className="flex flex-wrap gap-x-5 gap-y-1">
              {legalNav.map((l) =>
              <li key={l.to}>
                  <Link to={l.to} className="inline-flex min-h-[32px] items-center hover:text-white">
                    {l.label}
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </footer>);

}