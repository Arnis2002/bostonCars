import React from 'react';
import { Link } from 'react-router-dom';
import { PageTransition } from '../components/layout/PageTransition';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { ReviewsSection } from '../components/home/ReviewsSection';
import { useSeo } from '../hooks/useSeo';
import { dealership } from '../data/dealership';
import { breadcrumbSchema } from '../utils/schema';
import { btn, cn, container } from '../utils/styles';

export function ReviewsPage() {
  useSeo({
    title: 'Customer Reviews | Southwest Auto Sale, Grove City, OH',
    description: 'Read verified customer reviews of Southwest Auto Sale on Google and Facebook, or share your own experience with our Grove City dealership.',
    path: '/reviews',
    schema: [breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Reviews', path: '/reviews' }])]
  });

  return (
    <PageTransition>
      <div className="border-b border-line bg-white">
        <div className={cn(container, 'py-6 lg:py-10')}>
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Reviews' }]} />
          <h1 className="mt-2 text-[2rem] font-bold leading-tight tracking-tight text-navy sm:text-5xl">Customer reviews</h1>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted">Every review shown or linked here comes directly from the platform where the customer posted it.</p>
        </div>
      </div>

      <ReviewsSection showPageLink={false} />

      <section aria-labelledby="share-title" className="py-16 lg:py-20">
        <div className={cn(container, 'grid gap-8 lg:grid-cols-2 lg:items-center')}>
          <div>
            <h2 id="share-title" className="text-[1.75rem] font-bold leading-tight tracking-tight text-navy sm:text-4xl">
              Bought from us? Share your experience.
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-muted">Your feedback helps neighbors across Central Ohio shop with confidence — and helps our team keep improving.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <a href={dealership.links.googleReviews} target="_blank" rel="noreferrer" className={btn.primary}>
              Review us on Google
            </a>
            <a href={dealership.links.facebook} target="_blank" rel="noreferrer" className={btn.outline}>
              Review us on Facebook
            </a>
          </div>
        </div>
        <div className={cn(container, 'mt-12 border-t border-line pt-8')}>
          <p className="text-[15px] text-steel">
            Had an experience you’d like to discuss with us directly?{' '}
            <Link to="/contact" className="font-semibold text-navy underline underline-offset-2">
              Contact our team
            </Link>{' '}
            or call{' '}
            <a href={dealership.phone.href} className="font-semibold text-navy underline underline-offset-2">
              {dealership.phone.display}
            </a>
            .
          </p>
        </div>
      </section>
    </PageTransition>);

}