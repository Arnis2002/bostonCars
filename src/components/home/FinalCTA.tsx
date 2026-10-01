import React from 'react';
import { Link } from 'react-router-dom';
import { PhoneIcon } from 'lucide-react';
import { Reveal } from '../ui/Reveal';
import { dealership } from '../../data/dealership';
import { btn, cn, container } from '../../utils/styles';

export function FinalCTA() {
  return (
    <section aria-labelledby="final-cta-title" className="on-dark bg-ink py-16 text-white lg:py-20">
      <Reveal className={cn(container, 'flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between')}>
        <div className="max-w-2xl">
          <h2 id="final-cta-title" className="text-[2rem] font-bold leading-tight tracking-tight sm:text-[2.75rem]">
            Let’s find the right vehicle for you.
          </h2>
          <p className="mt-3 text-lg text-white/75">Browse online, start a financing request or give us a call — we’re here to help.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
          <Link to="/inventory" className={cn(btn.primary, 'h-12 px-6 text-base')}>
            Shop Inventory
          </Link>
          <Link to="/financing" className={cn(btn.white, 'h-12 px-6 text-base')}>
            Get Pre-Qualified
          </Link>
          <a href={dealership.phone.href} className={cn(btn.outlineDark, 'h-12 px-6 text-base')}>
            <PhoneIcon className="h-4 w-4" aria-hidden />
            Call {dealership.phone.display}
          </a>
        </div>
      </Reveal>
    </section>);

}