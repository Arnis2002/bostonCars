import React from 'react';
import { Link } from 'react-router-dom';
import { PhoneIcon, ShieldCheckIcon } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { financeProfiles } from '../../data/homeContent';
import { disclaimers } from '../../data/legal';
import { dealership } from '../../data/dealership';
import { btn, cn, container } from '../../utils/styles';

export function FinancingCTA() {
  return (
    <section aria-labelledby="finance-title" className="on-dark bg-navy py-16 text-white lg:py-24">
      <div className={cn(container, 'grid gap-12 lg:grid-cols-12 lg:gap-16')}>
        <Reveal className="lg:col-span-5">
          <h2 id="finance-title" className="text-[2rem] font-bold leading-tight tracking-tight sm:text-[2.75rem]">
            Financing options for real life.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/80">
            Credit situations can be different. Complete a secure financing request and let our team help you explore the options available to you.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/financing" className={cn(btn.primary, 'h-12 px-6 text-base')}>
              Start Financing Request
            </Link>
            <a href={dealership.phone.href} className={cn(btn.outlineDark, 'h-12 px-6 text-base')}>
              <PhoneIcon className="h-4 w-4" aria-hidden />
              Call Our Team
            </a>
          </div>
          <p className="mt-6 flex items-start gap-2 text-sm text-white/70">
            <ShieldCheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
            Our request form never asks for your Social Security number or bank details.
          </p>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={0.08}>
          <div className="rounded-2xl bg-navy-800 p-2">
            <ul className="divide-y divide-white/10">
              {financeProfiles.map((p) =>
              <li key={p.title} className="grid gap-1 px-5 py-5 sm:grid-cols-[200px_1fr] sm:gap-6 sm:px-6">
                  <h3 className="font-semibold text-white">{p.title}</h3>
                  <p className="text-[15px] leading-relaxed text-white/75">{p.text}</p>
                </li>
              )}
            </ul>
          </div>
          <p className="mt-5 text-[13px] leading-relaxed text-white/65">{disclaimers.financing}</p>
        </Reveal>
      </div>
    </section>);

}