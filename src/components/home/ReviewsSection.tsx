import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRightIcon, StarIcon, MessageSquareIcon } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { dealership } from '../../data/dealership';
import { btn, cn, container } from '../../utils/styles';

export const reviewPlatforms = [
{
  name: 'Google',
  icon: StarIcon,
  text: 'Read reviews from local customers on our Google Business Profile.',
  href: dealership.links.googleReviews
},
{
  name: 'Facebook',
  icon: MessageSquareIcon,
  text: 'See recommendations and updates from the Southwest Auto Sale community.',
  href: dealership.links.facebook
}];


export function ReviewsSection({ showPageLink = true }: {showPageLink?: boolean;}) {
  return (
    <section aria-labelledby="reviews-title" className="bg-paper py-16 lg:py-24">
      <div className={cn(container, 'grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16')}>
        <Reveal className="lg:col-span-5">
          <h2 id="reviews-title" className="text-[1.75rem] font-bold leading-tight tracking-tight text-navy sm:text-4xl">
            What Central Ohio drivers are saying.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            We’d rather you hear it straight from our customers. Read every review in full on the platform where it was posted — and if you’ve bought from us, we’d appreciate hearing about your experience.
          </p>
          {showPageLink &&
          <Link to="/reviews" className={cn(btn.navy, 'mt-7 h-12 px-6')}>
              Read More Reviews
            </Link>
          }
        </Reveal>
        <Reveal className="lg:col-span-7" delay={0.06}>
          <ul className="grid gap-4 sm:grid-cols-2">
            {reviewPlatforms.map(({ name, icon: Icon, text, href }) =>
            <li key={name} className="flex h-full flex-col rounded-2xl border border-line bg-white p-6">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-paper text-navy">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-lg font-bold text-navy">{name} reviews</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{text}</p>
                <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="mt-auto inline-flex min-h-[44px] items-center gap-1.5 pt-4 font-semibold text-navy hover:text-brand-dark">
                
                  Read on {name}
                  <ArrowUpRightIcon className="h-4 w-4" aria-hidden />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            )}
          </ul>
        </Reveal>
      </div>
    </section>);

}