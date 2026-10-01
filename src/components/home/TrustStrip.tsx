import React from 'react';
import { trustPoints } from '../../data/homeContent';
import { cn, container } from '../../utils/styles';

export function TrustStrip() {
  return (
    <section aria-label="Why shop with us" className="bg-white">
      <ul className={cn(container, 'grid gap-x-8 gap-y-6 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-line lg:py-12')}>
        {trustPoints.map(({ icon: Icon, title, text }) =>
        <li key={title} className="flex items-start gap-3.5 lg:px-6 lg:first:pl-0">
            <Icon className="mt-0.5 h-6 w-6 shrink-0 text-brand" aria-hidden />
            <div>
              <h3 className="font-semibold text-navy">{title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{text}</p>
            </div>
          </li>
        )}
      </ul>
    </section>);

}