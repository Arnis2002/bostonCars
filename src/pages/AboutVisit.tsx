import React, { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRightIcon, MapPinIcon, PhoneIcon } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';
import { dealership, addressLine } from '../data/dealership';
import { editorialPhotos } from '../data/editorialPhotos';
import { vehicles } from '../data/vehicles';
import { VehiclePhoto } from '../components/VehiclePhoto';
import { PhotoCredit } from '../components/PhotoCredit';
import { HoursList } from '../components/visit/HoursList';
import { ContactForm } from '../components/visit/ContactForm';
import { photoSourcePage } from '../utils/images';
import { btn, container, textLink } from '../utils/styles';
import type { Photo } from '../types/vehicle';

const services = [
{ title: 'Pre-owned inventory', text: 'Pre-owned cars and SUVs, mostly luxury imports, listed with price and mileage.', to: '/inventory', cta: 'Browse' },
{ title: 'Financing', text: 'Help working through the financing options available to you.', to: '/financing', cta: 'Estimate a payment' },
{ title: 'Selling and trade-ins', text: 'The dealership buys cars outright and takes trades.', to: '/sell-or-trade', cta: 'Start a request' },
{ title: 'Car finding', text: 'Not seeing the right car? Describe it, and the team can watch for a match.', to: '/about?topic=find#contact', cta: 'Describe a car' }];


export function AboutVisit() {
  usePageMeta('About and visit', 'Boston Foreign Motor sells pre-owned luxury imports at 411 Cambridge St in Allston, MA. Hours, directions, and contact.');
  const [params] = useSearchParams();
  const topic = params.get('topic') ?? 'visit';

  const credits = useMemo(() => {
    const all: Photo[] = [...Object.values(editorialPhotos), ...vehicles.flatMap((v) => v.photos)];
    return Array.from(new Map(all.map((p) => [p.file, p])).values());
  }, []);

  return (
    <>
      <section className={`${container} pt-12 lg:pt-16`}>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-14">
          <div className="lg:col-span-6">
            <h1 className="font-serif text-[44px] leading-[1.02] tracking-[-0.015em] sm:text-[60px]">On Cambridge Street in Allston.</h1>
            <p className="mt-6 max-w-lg text-[17px] leading-relaxed">
              Boston Foreign Motor sells pre-owned luxury imports, including Mercedes-Benz, BMW, Audi, Lexus, Porsche, Land Rover, and Volvo.
            </p>
            <p className="mt-4 max-w-lg text-[17px] leading-relaxed text-ink-soft">
              The dealership also buys cars, takes trade-ins, helps arrange financing, and can look for a specific car you don’t see listed. Visits are by appointment.
            </p>
          </div>
          <figure className="lg:col-span-6">
            <div className="aspect-[4/3] overflow-hidden rounded bg-line/40">
              <VehiclePhoto photo={editorialPhotos.interior} priority sizes="(min-width: 1024px) 45vw, 100vw" className="h-full w-full object-cover" />
            </div>
            <figcaption className="mt-2"><PhotoCredit photo={editorialPhotos.interior} prefix="Editorial photo" /></figcaption>
          </figure>
        </div>
      </section>

      <section className={`${container} py-20`} aria-labelledby="services-title">
        <h2 id="services-title" className="font-serif text-[34px] leading-tight">What you can do here</h2>
        <ul className="mt-6 border-t border-ink">
          {services.map((s) =>
          <li key={s.title} className="grid gap-2 border-b border-line py-5 sm:grid-cols-[minmax(0,240px)_minmax(0,1fr)_auto] sm:items-center sm:gap-8">
              <p className="text-[17px] font-semibold">{s.title}</p>
              <p className="text-[15px] leading-relaxed text-ink-soft">{s.text}</p>
              <Link to={s.to} className="inline-flex items-center gap-1.5 text-[15px] font-medium text-forest hover:underline">
                {s.cta} <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
              </Link>
            </li>
          )}
        </ul>
      </section>

      <section id="certified" className="on-dark scroll-mt-24 bg-forest text-ivory" aria-labelledby="certified-title">
        <div className={`${container} grid gap-8 py-16 lg:grid-cols-12`}>
          <div className="lg:col-span-4">
            <h2 id="certified-title" className="font-serif text-[34px] leading-tight sm:text-[40px]">BFM Certified</h2>
            <p className="mt-2 text-sm text-ivory/75">The dealership’s own program. Not manufacturer certification.</p>
          </div>
          <div className="space-y-4 text-[16px] leading-relaxed text-ivory/90 lg:col-span-7 lg:col-start-6">
            <p>
              A BFM Certified car gets a mechanical inspection before delivery. Anything found not working to the manufacturer’s specifications is repaired or replaced.
            </p>
            <p>
              The program doesn’t build a limited warranty into the price. Certified cars keep whatever factory warranty remains, and you can buy an extended warranty separately if you want one.
            </p>
            <p className="text-ivory/75">
              Not every car qualifies. Listings only show the BFM Certified label when the dealership confirms it. Ask sales for the details of the inspection and warranty options.
            </p>
          </div>
        </div>
      </section>

      <section id="visit" className={`${container} scroll-mt-24 py-20`} aria-labelledby="visit-title">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <h2 id="visit-title" className="font-serif text-[34px] leading-tight sm:text-[40px]">Visit</h2>
            <p className="mt-5 flex items-start gap-2 text-[17px]">
              <MapPinIcon className="mt-1 h-5 w-5 shrink-0 text-forest" aria-hidden="true" /> {addressLine}
            </p>
            <a href={dealership.phoneHref} className="mt-3 flex items-center gap-2 text-[22px] font-semibold tnum hover:underline">
              <PhoneIcon className="h-5 w-5 text-forest" aria-hidden="true" /> {dealership.phoneDisplay}
            </a>
            <p className="text-sm text-ink-soft">Sales</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={dealership.directionsUrl} target="_blank" rel="noreferrer" className={btn.primary}>Get directions</a>
              <a href={dealership.phoneHref} className={btn.secondary}>Call sales</a>
            </div>
            <div className="mt-10">
              <h3 className="text-sm font-semibold">Hours</h3>
              <div className="mt-2"><HoursList /></div>
            </div>
            <p className="mt-6 text-sm text-ink-soft">
              <a href={dealership.reviewsUrl} target="_blank" rel="noreferrer" className={textLink}>Read customer reviews online</a>
            </p>
          </div>
          <div className="lg:col-span-7">
            <div className="aspect-[4/3] overflow-hidden rounded border border-line bg-line/40 lg:aspect-auto lg:h-full lg:min-h-[480px]">
              <iframe
                title={`Map showing ${addressLine}`}
                src={dealership.mapEmbedUrl}
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" />
              
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-24 border-t border-line bg-paper" aria-labelledby="contact-title">
        <div className={`${container} grid gap-10 py-16 lg:grid-cols-12 lg:gap-16`}>
          <div className="lg:col-span-5">
            <h2 id="contact-title" className="font-serif text-[34px] leading-tight sm:text-[40px]">Send a message</h2>
            <p className="mt-4 max-w-md text-[17px] leading-relaxed text-ink-soft">
              Plan a visit, ask a question, or describe a car you’d like the team to look for.
            </p>
          </div>
          <div className="lg:col-span-7">
            <ContactForm initialTopic={topic} />
          </div>
        </div>
      </section>

      <section id="credits" className={`${container} scroll-mt-24 py-14`} aria-labelledby="credits-title">
        <h2 id="credits-title" className="text-[15px] font-semibold">Photo credits</h2>
        <p className="mt-1 max-w-2xl text-sm text-ink-soft">
          Photos come from Wikimedia Commons and are used under each file’s license. They show the model, not an actual car for sale. Follow a link for full license terms.
        </p>
        <ul className="mt-4 grid gap-x-8 gap-y-1.5 text-[13px] sm:grid-cols-2 lg:grid-cols-3">
          {credits.map((p) =>
          <li key={p.file} className="min-w-0">
              <a href={photoSourcePage(p.file)} target="_blank" rel="noreferrer" className="block truncate text-ink-soft hover:text-ink hover:underline">
                {p.author}{p.license ? ` (${p.license})` : ''}: {p.file.replace(/\.jpg$/i, '')}
              </a>
            </li>
          )}
        </ul>
      </section>
    </>);

}