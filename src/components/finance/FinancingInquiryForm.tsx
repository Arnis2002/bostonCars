import React, { useState } from 'react';
import { ShieldAlertIcon } from 'lucide-react';
import { TextAreaField, TextField, SelectField } from '../forms/Field';
import { ChoiceGroup } from '../forms/ChoiceGroup';
import { DemoSubmitted } from '../forms/DemoSubmitted';
import { vehicles } from '../../data/vehicles';
import { vehicleName } from '../../utils/format';
import { focusFirstError, validateContact, type FormErrors } from '../../utils/validation';

export function FinancingInquiryForm() {
  const [fullName, setFullName] = useState('');
  const [method, setMethod] = useState('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [vehicleId, setVehicleId] = useState('');
  const [timeframe, setTimeframe] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: FormErrors = {};
    if (!fullName.trim()) next.fullName = 'Enter your name.';
    Object.assign(next, validateContact(method, email, phone));
    if (!timeframe) next.timeframe = 'Choose a timeframe.';
    setErrors(next);
    if (Object.keys(next).length) {
      focusFirstError(next, ['fullName', 'method', 'email', 'phone', 'timeframe']);
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    const v = vehicles.find((x) => x.id === vehicleId);
    return (
      <DemoSubmitted
        onEdit={() => setSubmitted(false)}
        summary={[
        { label: 'Request', value: 'Financing inquiry' },
        { label: 'Vehicle', value: v ? vehicleName(v) : 'Not chosen yet' },
        { label: 'Timeframe', value: timeframe }]
        } />);


  }

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <div className="flex gap-3 rounded border border-line bg-paper p-4 text-[14px] leading-relaxed">
        <ShieldAlertIcon className="mt-0.5 h-5 w-5 shrink-0 text-forest" aria-hidden="true" />
        <p>This is a conversation starter, not a credit application. Don’t include your Social Security number, bank details, or income documents here.</p>
      </div>
      <TextField id="fullName" label="Name" autoComplete="name" value={fullName} onChange={(e) => setFullName(e.target.value)} error={errors.fullName} />
      <ChoiceGroup name="method" legend="Best way to reach you" columns={2} value={method} onChange={setMethod} options={[{ value: 'email', label: 'Email' }, { value: 'phone', label: 'Phone' }]} />
      {method === 'email' ?
      <TextField id="email" label="Email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} /> :

      <TextField id="phone" label="Phone" type="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} error={errors.phone} />
      }
      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField id="vehicle" label="Car you’re considering" optional value={vehicleId} onChange={(e) => setVehicleId(e.target.value)}>
          <option value="">Not sure yet</option>
          {vehicles.map((v) => <option key={v.id} value={v.id}>{vehicleName(v)}</option>)}
        </SelectField>
        <SelectField id="timeframe" label="When are you hoping to buy?" value={timeframe} onChange={(e) => setTimeframe(e.target.value)} error={errors.timeframe}>
          <option value="">Choose one</option>
          <option>This week</option>
          <option>Within a month</option>
          <option>In 1–3 months</option>
          <option>Just researching</option>
        </SelectField>
      </div>
      <TextAreaField id="message" label="Anything we should know?" optional value={message} onChange={(e) => setMessage(e.target.value)} hint="For example, the payment range you’re aiming for or a trade-in you plan to use." />
      <button type="submit" className="inline-flex h-12 items-center justify-center rounded bg-forest px-6 text-[15px] font-medium text-ivory transition-colors duration-150 hover:bg-forest-deep">
        Send financing inquiry
      </button>
      <p className="text-xs text-ink-soft">Demo form. Nothing is sent.</p>
    </form>);

}