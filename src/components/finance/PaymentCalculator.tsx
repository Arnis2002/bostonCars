import React, { useMemo, useState } from 'react';
import { estimatePayment } from '../../utils/payment';
import { formatCurrency } from '../../utils/format';
import { inputClass } from '../forms/Field';

const TERMS = [36, 48, 60, 72, 84];
export const ILLUSTRATIVE_APR = 7.9;

interface MoneyInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
  prefix?: string;
  suffix?: string;
  step?: number;
  allowNegative?: boolean;
}

function NumberInput({ id, label, value, onChange, hint, prefix, suffix, step = 100, allowNegative = false }: MoneyInputProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">{label}</label>
      <div className="relative">
        {prefix && <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft">{prefix}</span>}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          step={step}
          min={allowNegative ? undefined : 0}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-describedby={hint ? `${id}-hint` : undefined}
          className={`${inputClass} h-12 border-line-strong tnum ${prefix ? 'pl-7' : ''} ${suffix ? 'pr-10' : ''}`} />
        
        {suffix && <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-soft">{suffix}</span>}
      </div>
      {hint && <p id={`${id}-hint`} className="mt-1.5 text-[13px] leading-snug text-ink-soft">{hint}</p>}
    </div>);

}

const num = (s: string) => {
  const n = parseFloat(s);
  return Number.isFinite(n) ? n : 0;
};

export function PaymentCalculator({ initialPrice }: {initialPrice: number;}) {
  const [price, setPrice] = useState(String(initialPrice));
  const [down, setDown] = useState(String(Math.round(initialPrice * 0.1 / 100) * 100));
  const [trade, setTrade] = useState('0');
  const [apr, setApr] = useState(String(ILLUSTRATIVE_APR));
  const [term, setTerm] = useState(60);

  const result = useMemo(
    () => estimatePayment({ price: num(price), downPayment: num(down), tradeEquity: num(trade), apr: num(apr), termMonths: term }),
    [price, down, trade, apr, term]
  );

  const aprWarning = num(apr) < 0 || num(apr) > 40;

  return (
    <div className="grid overflow-hidden rounded border border-line bg-paper lg:grid-cols-[1.15fr_1fr]">
      <form className="grid gap-5 p-5 sm:grid-cols-2 sm:p-7" onSubmit={(e) => e.preventDefault()} aria-label="Payment estimate inputs">
        <NumberInput id="calc-price" label="Vehicle price" prefix="$" value={price} onChange={setPrice} />
        <NumberInput id="calc-down" label="Down payment" prefix="$" value={down} onChange={setDown} />
        <NumberInput
          id="calc-trade"
          label="Trade equity"
          prefix="$"
          value={trade}
          onChange={setTrade}
          allowNegative
          hint="Trade value minus what you still owe. Use a negative number if you owe more than it’s worth." />
        
        <NumberInput id="calc-apr" label="APR" suffix="%" step={0.1} value={apr} onChange={setApr} hint={`${ILLUSTRATIVE_APR}% is an example for illustration, not an offered rate.`} />
        <fieldset className="sm:col-span-2">
          <legend className="mb-1.5 text-sm font-medium">Term</legend>
          <div className="grid grid-cols-5 gap-1.5">
            {TERMS.map((t) =>
            <label key={t} className={`flex h-11 cursor-pointer items-center justify-center rounded border text-sm font-medium tnum transition-colors duration-150 focus-within:ring-2 focus-within:ring-forest focus-within:ring-offset-2 ${term === t ? 'border-ink bg-ink text-ivory' : 'border-line-strong bg-paper hover:border-ink'}`}>
                <input type="radio" name="term" value={t} checked={term === t} onChange={() => setTerm(t)} className="sr-only" />
                {t} mo
              </label>
            )}
          </div>
        </fieldset>
        {aprWarning && <p className="text-[13px] font-medium text-clay sm:col-span-2">Enter an APR between 0% and 40%.</p>}
      </form>

      <div className="on-dark flex flex-col bg-forest p-5 text-ivory sm:p-7" aria-live="polite">
        <p className="text-sm text-ivory/75">Estimated monthly payment</p>
        <p className="mt-1 font-serif text-[56px] leading-none tracking-[-0.02em] tnum">
          {formatCurrency(result.monthlyPayment)}
          <span className="ml-1 font-sans text-lg text-ivory/70">/mo</span>
        </p>
        <p className="mt-2 text-sm text-ivory/75 tnum">{term} months at {num(apr).toFixed(2)}% APR</p>
        <dl className="mt-6 space-y-2.5 border-t border-ivory/20 pt-5 text-[15px] tnum">
          <div className="flex justify-between gap-4"><dt className="text-ivory/75">Amount financed</dt><dd className="font-medium">{formatCurrency(result.amountFinanced)}</dd></div>
          <div className="flex justify-between gap-4"><dt className="text-ivory/75">Estimated interest</dt><dd className="font-medium">{formatCurrency(result.totalInterest)}</dd></div>
          <div className="flex justify-between gap-4"><dt className="text-ivory/75">Total of payments</dt><dd className="font-medium">{formatCurrency(result.totalOfPayments)}</dd></div>
        </dl>
        <p className="mt-auto pt-6 text-[13px] leading-relaxed text-ivory/80">
          Estimate only. Not a financing offer or approval. Excludes sales tax, title, registration, and any other fees.
        </p>
      </div>
    </div>);

}