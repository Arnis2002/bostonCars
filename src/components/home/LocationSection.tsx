import React from 'react';
import { Link } from 'react-router-dom';
import { MapPinIcon, PhoneIcon, MailIcon, NavigationIcon } from 'lucide-react';
import { HoursList } from '../location/HoursList';
import { Reveal } from '../ui/Reveal';
import { dealership } from '../../data/dealership';
import { getOpenStatus } from '../../utils/hours';
import { btn, cn, container } from '../../utils/styles';

export function LocationSection() {
  const status = getOpenStatus();
  return (
    <section aria-labelledby="location-title" className="bg-white py-16 lg:py-24">
      <div className={cn(container, 'grid gap-10 lg:grid-cols-12 lg:gap-12')}>
        <Reveal className="lg:col-span-5">
          <h2 id="location-title" className="text-[1.75rem] font-bold leading-tight tracking-tight text-navy sm:text-4xl">
            Visit us in Grove City
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Find us on Harrisburg Pike in Grove City — a short drive from Columbus, Hilliard, Upper Arlington, Lincoln Village and Bexley.
          </p>

          <address className="mt-8 space-y-4 not-italic">
            <div className="flex items-start gap-3">
              <MapPinIcon className="mt-1 h-5 w-5 shrink-0 text-brand" aria-hidden />
              <div>
                <p className="font-semibold text-navy">{dealership.name}</p>
                <p className="text-steel">
                  {dealership.address.street}
                  <br />
                  {dealership.address.city}, {dealership.address.state} {dealership.address.zip}
                </p>
              </div>
            </div>
            <a href={dealership.phone.href} className="flex items-center gap-3 font-semibold text-navy hover:text-brand-dark">
              <PhoneIcon className="h-5 w-5 shrink-0 text-brand" aria-hidden />
              {dealership.phone.display}
            </a>
            <a href={`mailto:${dealership.email}`} className="flex items-center gap-3 break-all text-steel hover:text-navy">
              <MailIcon className="h-5 w-5 shrink-0 text-brand" aria-hidden />
              {dealership.email}
            </a>
          </address>

          <div className="mt-8">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-navy">Hours</h3>
              <span className={cn('inline-flex items-center gap-1.5 text-sm', status.isOpen ? 'text-emerald-700' : 'text-muted')}>
                <span className={cn('h-2 w-2 rounded-full', status.isOpen ? 'bg-emerald-500' : 'bg-muted/50')} aria-hidden />
                {status.label}
              </span>
            </div>
            <HoursList className="mt-2" />
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <a href={dealership.links.directions} target="_blank" rel="noreferrer" className={btn.primary}>
              <NavigationIcon className="h-4 w-4" aria-hidden />
              Get Directions
            </a>
            <a href={dealership.phone.href} className={btn.outline}>
              <PhoneIcon className="h-4 w-4" aria-hidden />
              Call Dealership
            </a>
            <Link to="/inventory" className={btn.outline}>
              View Inventory
            </Link>
            <Link to="/contact" className={btn.outline}>
              Contact Us
            </Link>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={0.06}>
          <div className="h-full min-h-[320px] overflow-hidden rounded-2xl border border-line bg-paper sm:min-h-[420px]">
            <iframe
              title={`Map showing ${dealership.name} at ${dealership.fullAddress}`}
              src={dealership.links.mapEmbed}
              className="h-full min-h-[320px] w-full sm:min-h-[420px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade" />
            
          </div>
        </Reveal>
      </div>
    </section>);

}