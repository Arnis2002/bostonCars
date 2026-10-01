import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalculatorIcon, PhoneIcon } from 'lucide-react';
import type { Vehicle } from '../../types/vehicle';
import { TextAreaField, TextField, SelectField } from '../forms/Field';
import { ChoiceGroup } from '../forms/ChoiceGroup';
import { DemoSubmitted } from '../forms/DemoSubmitted';
import { SaveButton } from '../vehicles/SaveButton';
import { dealership } from '../../data/dealership';
import { formatMiles, formatPrice, vehicleName } from '../../utils/format';
import { focusFirstError, validateContact, type FormErrors } from '../../utils/validation';

export type InquiryTab = 'availability' | 'test-drive';

interface InquiryPanelProps {
  vehicle: Vehicle;
  tab: InquiryTab;
  onTabChange: (tab: InquiryTab) => void;
}

const tabs: {id: InquiryTab;label: string;}[] = [
{ id: 'availability', label: 'Check availability' },
{ id: 'test-drive', label: 'Test drive' }];


function todayIso() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

export function InquiryPanel({ vehicle, tab, onTabChange }: InquiryPanelProps) {
  const name = vehicleName(vehicle);
  const [fullName, setFullName] = useState('');
  const [method, setMethod] = useState('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState(`Is the ${name} (stock ${vehicle.stockNumber}) still available?`);
  const [date, setDate] = useState('');
  const [timeOfDay, setTimeOfDay] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onTabKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = (i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    onTabChange(tabs[next].id);
    tabRefs.current[next]?.focus();
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: FormErrors = {};
    if (!fullName.trim()) next.fullName = 'Enter your name.';
    Object.assign(next, validateContact(method, email, phone));
    if (tab === 'test-drive') {
      if (!date) next.date = 'Pick a day that works for you.';else
      if (date < todayIso()) next.date = 'Choose today or a later date.';
      if (!timeOfDay) next.timeOfDay = 'Choose a time of day.';
    }
    setErrors(next);
    if (Object.keys(next).length) {
      focusFirstError(next, ['fullName', 'method', 'email', 'phone', 'date', 'timeOfDay']);
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="rounded border border-line bg-paper">
      <div className="p-5">
        <p className="text-sm text-ink-soft">{vehicle.isSample ? 'Sample asking price' : 'Asking price'}</p>
        <p className="mt-0.5 text-[32px] font-semibold leading-tight tracking-[-0.015em] tnum">{formatPrice(vehicle.price)}</p>
        <p className="text-[15px] tnum">{formatMiles(vehicle.mileage)}</p>
        <p className="mt-3 text-[13px] leading-relaxed text-ink-soft">
          Price excludes sales tax, title, and registration. Ask the dealership about any other fees before you buy.
        </p>
        <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
          <a href={dealership.phoneHref} className="inline-flex h-11 items-center justify-center gap-2 rounded bg-forest px-4 text-[15px] font-medium text-ivory transition-colors duration-150 hover:bg-forest-deep">
            <PhoneIcon className="h-4 w-4" aria-hidden="true" /> Call {dealership.phoneDisplay}
          </a>
          <SaveButton vehicle={vehicle} variant="inline" />
        </div>
        {vehicle.price != null &&
        <Link to={`/financing?price=${vehicle.price}#calculator`} className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-forest underline decoration-forest/30 underline-offset-4 hover:decoration-forest">
            <CalculatorIcon className="h-4 w-4" aria-hidden="true" /> Estimate a monthly payment
          </Link>
        }
      </div>

      <div className="border-t border-line">
        <div role="tablist" aria-label="Contact about this car" className="grid grid-cols-2">
          {tabs.map((t, i) =>
          <button
            key={t.id}
            ref={(el) => tabRefs.current[i] = el}
            id={`tab-${t.id}`}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            aria-controls="inquiry-tabpanel"
            tabIndex={tab === t.id ? 0 : -1}
            onKeyDown={(e) => onTabKey(e, i)}
            onClick={() => {
              onTabChange(t.id);
              setSubmitted(false);
            }}
            className={`h-12 border-b-2 text-sm font-medium transition-colors duration-150 ${tab === t.id ? 'border-ink text-ink' : 'border-transparent text-ink-soft hover:text-ink'}`}>
            
              {t.label}
            </button>
          )}
        </div>

        <div id="inquiry-tabpanel" role="tabpanel" aria-labelledby={`tab-${tab}`} className="p-5">
          {submitted ?
          <DemoSubmitted
            onEdit={() => setSubmitted(false)}
            summary={[
            { label: 'Request', value: tab === 'test-drive' ? 'Test drive' : 'Availability' },
            { label: 'Vehicle', value: name },
            ...(tab === 'test-drive' ? [{ label: 'Preferred day', value: `${date}, ${timeOfDay.toLowerCase()}` }] : [])]
            } /> :


          <form onSubmit={submit} noValidate className="space-y-4">
              <p className="text-[14px] leading-relaxed text-ink-soft">
                {tab === 'test-drive' ?
              'Visits are by appointment. Suggest a day and the sales team can confirm a time.' :
              'Ask whether it’s still here, or ask for more photos or the history report.'}
              </p>
              <TextField id="fullName" label="Name" autoComplete="name" value={fullName} onChange={(e) => setFullName(e.target.value)} error={errors.fullName} />
              <ChoiceGroup
              name="method"
              legend="Best way to reach you"
              columns={2}
              value={method}
              onChange={setMethod}
              options={[
              { value: 'email', label: 'Email' },
              { value: 'phone', label: 'Phone' }]
              } />
            
              {method === 'email' ?
            <TextField id="email" label="Email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} /> :

            <TextField id="phone" label="Phone" type="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} error={errors.phone} />
            }
              {tab === 'test-drive' &&
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  <TextField id="date" label="Preferred day" type="date" min={todayIso()} value={date} onChange={(e) => setDate(e.target.value)} error={errors.date} />
                  <SelectField id="timeOfDay" label="Time of day" value={timeOfDay} onChange={(e) => setTimeOfDay(e.target.value)} error={errors.timeOfDay}>
                    <option value="">Choose one</option>
                    <option>Morning</option>
                    <option>Midday</option>
                    <option>Afternoon</option>
                    <option>Evening</option>
                  </SelectField>
                </div>
            }
              <TextAreaField id="message" label="Message" optional value={message} onChange={(e) => setMessage(e.target.value)} rows={3} />
              <button type="submit" className="inline-flex h-12 w-full items-center justify-center rounded bg-ink text-[15px] font-medium text-ivory transition-colors duration-150 hover:bg-forest">
                {tab === 'test-drive' ? 'Request a test drive' : 'Ask about this car'}
              </button>
              <p className="text-xs text-ink-soft">Demo form. Nothing is sent.</p>
            </form>
          }
        </div>
      </div>
    </div>);

}