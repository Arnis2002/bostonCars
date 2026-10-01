import React from 'react';
import { PhoneIcon } from 'lucide-react';
import { usePageMeta } from '../hooks/usePageMeta';
import { AppraisalForm } from '../components/trade/AppraisalForm';
import { dealership } from '../data/dealership';
import { container } from '../utils/styles';

const steps = [
{ t: 'Send the basics', d: 'Year, make, model, mileage, and an honest read on condition. A VIN helps but isn’t required.' },
{ t: 'The dealership reviews it', d: 'Someone from sales follows up, and may ask for photos or a few more details.' },
{ t: 'See it in person', d: 'An offer is confirmed only after the car has been looked over at the dealership.' }];


export function SellTrade() {
  usePageMeta('Sell or trade your car', 'Send your car’s details to Boston Foreign Motor for review. Sell outright or trade toward another car.');

  return (
    <div className={`${container} py-12 lg:py-16`}>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <h1 className="font-serif text-[44px] leading-[1.02] tracking-[-0.015em] sm:text-[60px]">Sell or trade your car</h1>
            <p className="mt-5 max-w-md text-[17px] leading-relaxed text-ink-soft">
              Tell us about your car and whether you’d like to sell it or trade it in. It takes a couple of minutes.
            </p>
            <ol className="mt-10">
              {steps.map((s, i) =>
              <li key={s.t} className="grid grid-cols-[2.25rem_1fr] gap-3 border-t border-line py-5">
                  <span className="font-serif text-2xl leading-none text-forest tnum">{i + 1}</span>
                  <div>
                    <p className="text-[16px] font-semibold">{s.t}</p>
                    <p className="mt-1 text-[15px] leading-relaxed text-ink-soft">{s.d}</p>
                  </div>
                </li>
              )}
            </ol>
            <div className="border-t border-line pt-5">
              <p className="text-[15px] leading-relaxed">
                <strong className="font-semibold">There’s no instant offer here.</strong> A fair number depends on the car itself, so the dealership needs to see it first.
              </p>
              <a href={dealership.phoneHref} className="mt-4 inline-flex items-center gap-2 text-[15px] font-medium hover:underline">
                <PhoneIcon className="h-4 w-4 text-forest" aria-hidden="true" /> Prefer to talk? {dealership.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
        <section className="rounded border border-line bg-paper p-5 sm:p-8 lg:col-span-7" aria-label="Appraisal request">
          <AppraisalForm />
        </section>
      </div>
    </div>);

}