import React from 'react';
import { Link } from 'react-router-dom';
import { PageTransition } from '../components/layout/PageTransition';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { useSeo } from '../hooks/useSeo';
import { legalPages, type LegalDoc } from '../data/legalPages';
import { legalNav } from '../data/navigation';
import { cn, container } from '../utils/styles';

export function LegalPage({ doc }: {doc: LegalDoc;}) {
  const page = legalPages[doc];
  const path = `/${doc}`;

  useSeo({ title: `${page.title} | Southwest Auto Sale`, description: page.description, path });

  return (
    <PageTransition>
      <div className={cn(container, 'grid gap-10 py-8 lg:grid-cols-12 lg:py-14')}>
        <div className="lg:col-span-8">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: page.title }]} />
          <h1 className="mt-2 text-[2rem] font-bold leading-tight tracking-tight text-navy sm:text-4xl">{page.title}</h1>
          <p className="mt-3 text-lg text-muted">{page.description}</p>
          <p className="mt-2 text-sm text-muted">Last updated October 2026</p>
          <div className="mt-10 space-y-10">
            {page.sections.map((s) =>
            <section key={s.heading}>
                <h2 className="text-xl font-bold text-navy">{s.heading}</h2>
                {s.body.map((p) =>
              <p key={p.slice(0, 32)} className="mt-3 max-w-prose text-[16px] leading-relaxed text-steel">
                    {p}
                  </p>
              )}
              </section>
            )}
          </div>
        </div>
        <nav aria-label="Legal" className="lg:col-span-3 lg:col-start-10 lg:pt-16">
          <h2 className="text-sm font-semibold text-muted">Legal</h2>
          <ul className="mt-2">
            {legalNav.map((n) =>
            <li key={n.to}>
                <Link to={n.to} className={cn('flex min-h-[44px] items-center text-[15px]', n.to === `/${doc}` ? 'font-semibold text-navy' : 'text-steel hover:text-navy')}>
                  {n.label}
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </PageTransition>);

}