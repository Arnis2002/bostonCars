import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PhoneIcon, MailIcon, MapPinIcon, NavigationIcon, HandCoinsIcon, CalendarIcon } from 'lucide-react';
import { PageTransition } from '../components/layout/PageTransition';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { ContactForm } from '../components/contact/ContactForm';
import { HoursList } from '../components/location/HoursList';
import { useInventory } from '../hooks/useInventory';
import { useSeo } from '../hooks/useSeo';
import { dealership } from '../data/dealership';
import { breadcrumbSchema } from '../utils/schema';
import { getOpenStatus } from '../utils/hours';
import { cn, container } from '../utils/styles';

export function ContactPage() {
  const [params] = useSearchParams();
  const { vehicles } = useInventory();
  const status = getOpenStatus();

  useSeo({
    title: 'Contact Southwest Auto Sale | Used Car Dealer in Grove City, OH',
    description: 'Contact Southwest Auto Sale at 2140 Harrisburg Pike, Grove City, OH 43123. Call (614) 594-2940, email us or send a message about a vehicle, test drive, financing or trade-in.',
    path: '/contact',
    schema: [breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }])]
  });

  const quickLinks = [
  { icon: CalendarIcon, label: 'Schedule a test drive', to: '/contact?reason=Test%20Drive' },
  { icon: HandCoinsIcon, label: 'Start a financing request', to: '/financing' }];


  return (
    <PageTransition>
      <div className="border-b border-line bg-paper">
        <div className={cn(container, 'py-6 lg:py-10')}>
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Contact' }]} />
          <h1 className="mt-2 text-[2rem] font-bold leading-tight tracking-tight text-navy sm:text-5xl">Contact us</h1>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">Questions about a vehicle, a test drive, financing or your trade? Reach our Grove City team directly.</p>
        </div>
      </div>

      <div className={cn(container, 'grid gap-10 py-10 lg:grid-cols-12 lg:gap-14 lg:py-16')}>
        <aside className="space-y-8 lg:col-span-5">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <a href={dealership.phone.href} className="flex items-center gap-4 rounded-xl border border-line p-4 transition-[border-color] duration-150 hover:border-navy/30">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand text-white">
                <PhoneIcon className="h-5 w-5" aria-hidden />
              </span>
              <span>
                <span className="block text-sm text-muted">Call us</span>
                <span className="block text-lg font-bold text-navy">{dealership.phone.display}</span>
              </span>
            </a>
            <a href={`mailto:${dealership.email}`} className="flex items-center gap-4 rounded-xl border border-line p-4 transition-[border-color] duration-150 hover:border-navy/30">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-navy text-white">
                <MailIcon className="h-5 w-5" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block text-sm text-muted">Email</span>
                <span className="block break-all font-semibold text-navy">{dealership.email}</span>
              </span>
            </a>
          </div>

          <div>
            <h2 className="flex items-center gap-2 font-bold text-navy">
              <MapPinIcon className="h-5 w-5 text-brand" aria-hidden />
              {dealership.name}
            </h2>
            <address className="mt-1 not-italic text-steel">{dealership.fullAddress}</address>
            <a href={dealership.links.directions} target="_blank" rel="noreferrer" className="mt-2 inline-flex min-h-[44px] items-center gap-2 font-semibold text-navy hover:text-brand-dark">
              <NavigationIcon className="h-4 w-4" aria-hidden />
              Get Directions
            </a>
            <div className="mt-3 overflow-hidden rounded-xl border border-line">
              <iframe title={`Map of ${dealership.fullAddress}`} src={dealership.links.mapEmbed} className="h-60 w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-navy">Hours</h2>
              <span className={cn('text-sm', status.isOpen ? 'text-emerald-700' : 'text-muted')}>{status.label}</span>
            </div>
            <HoursList className="mt-1" />
          </div>

          <ul className="space-y-1 border-t border-line pt-5">
            {quickLinks.map(({ icon: Icon, label, to }) =>
            <li key={label}>
                <Link to={to} className="flex min-h-[44px] items-center gap-3 font-semibold text-navy hover:text-brand-dark">
                  <Icon className="h-5 w-5 text-brand" aria-hidden />
                  {label}
                </Link>
              </li>
            )}
          </ul>
        </aside>

        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-line bg-white p-5 shadow-card sm:p-8">
            <h2 className="mb-6 text-xl font-bold text-navy">Send us a message</h2>
            <ContactForm key={params.get('reason') ?? 'default'} vehicles={vehicles} initialReason={params.get('reason') ?? ''} />
          </div>
        </div>
      </div>
    </PageTransition>);

}