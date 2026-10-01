import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import { PaymentCalculator, ILLUSTRATIVE_APR } from '../components/finance/PaymentCalculator';
import { FinancingInquiryForm } from '../components/finance/FinancingInquiryForm';
import { dealership } from '../data/dealership';
import { container } from '../utils/styles';

const steps = [
{ t: 'Estimate', d: 'Use the calculator to find a monthly range you’re comfortable with.' },
{ t: 'Send an inquiry', d: 'Tell us which car, your timing, and how to reach you. No Social Security number is needed for this step.' },
{ t: 'Talk it through', d: 'The dealership goes over the financing options available to you and what a full application requires.' }];


const assumptions = [
`The ${ILLUSTRATIVE_APR}% APR is an example for illustration. It isn’t a rate offered by Boston Foreign Motor or any lender.`,
'Amount financed = vehicle price − down payment − trade equity.',
'Equal monthly payments with interest calculated monthly over the full term.',
'Sales tax, title, registration, and any dealer or lender fees are not included.',
'Negative trade equity (owing more than the car is worth) increases the amount financed.'];


export function Financing() {
  usePageMeta('Financing', 'Estimate a monthly payment and send a financing inquiry to Boston Foreign Motor. Estimates are not offers.');
  const [params] = useSearchParams();
  const priceParam = Number(params.get('price'));
  const initialPrice = Number.isFinite(priceParam) && priceParam > 0 ? priceParam : 35000;

  return (
    <>
      <section className={`${container} pb-14 pt-12 lg:pt-16`}>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h1 className="font-serif text-[44px] leading-[1.02] tracking-[-0.015em] sm:text-[60px]">Financing</h1>
            <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-ink-soft">
              Work out a payment that fits, then talk to the dealership about the financing options available to you. Nothing on this page is an approval or a rate quote.
            </p>
          </div>
          <ol className="grid gap-0 sm:grid-cols-3 sm:gap-6 lg:col-span-12">
            {steps.map((s, i) =>
            <li key={s.t} className="border-t border-ink py-5">
                <p className="font-serif text-2xl text-forest tnum">{i + 1}</p>
                <p className="mt-2 text-[16px] font-semibold">{s.t}</p>
                <p className="mt-1 text-[15px] leading-relaxed text-ink-soft">{s.d}</p>
              </li>
            )}
          </ol>
        </div>
      </section>

      <section id="calculator" className={`${container} scroll-mt-24 pb-20`} aria-labelledby="calc-title">
        <h2 id="calc-title" className="mb-6 font-serif text-[34px] leading-tight">Estimate a payment</h2>
        <PaymentCalculator key={initialPrice} initialPrice={initialPrice} />
        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h3 className="text-sm font-semibold">How this estimate works</h3>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[14px] leading-relaxed text-ink-soft">
              {assumptions.map((a) => <li key={a}>{a}</li>)}
            </ul>
          </div>
          <p className="text-[14px] leading-relaxed lg:col-span-5">
            <strong className="font-semibold">Estimates exclude applicable taxes and fees and are not financing offers.</strong> Your actual rate and payment depend on the lender, your credit, and the car.
          </p>
        </div>
      </section>

      <section id="inquiry" className="scroll-mt-24 border-t border-line bg-paper" aria-labelledby="inquiry-title">
        <div className={`${container} grid gap-10 py-16 lg:grid-cols-12 lg:gap-16`}>
          <div className="lg:col-span-5">
            <h2 id="inquiry-title" className="font-serif text-[34px] leading-tight sm:text-[40px]">Ask about financing</h2>
            <p className="mt-4 max-w-md text-[17px] leading-relaxed text-ink-soft">
              Share the basics and the dealership can follow up. If you’d rather talk now, call sales.
            </p>
            <a href={dealership.phoneHref} className="mt-5 inline-block text-[22px] font-semibold tnum hover:underline">{dealership.phoneDisplay}</a>
          </div>
          <div className="lg:col-span-7">
            <FinancingInquiryForm />
          </div>
        </div>
      </section>
    </>);

}