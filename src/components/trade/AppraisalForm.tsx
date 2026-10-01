import React, { useState } from 'react';
import { TextAreaField, TextField } from '../forms/Field';
import { ChoiceGroup } from '../forms/ChoiceGroup';
import { DemoSubmitted } from '../forms/DemoSubmitted';
import { focusFirstError, isVin, validateContact, type FormErrors } from '../../utils/validation';
import { formatNumber } from '../../utils/format';

const conditions = [
{ value: 'excellent', label: 'Excellent', description: 'No known issues, clean inside and out.' },
{ value: 'good', label: 'Good', description: 'Normal wear, nothing needs immediate repair.' },
{ value: 'fair', label: 'Fair', description: 'Some cosmetic or mechanical items to address.' },
{ value: 'rough', label: 'Needs work', description: 'Warning lights, damage, or known repairs.' }];


export function AppraisalForm() {
  const [v, setV] = useState({ year: '', make: '', model: '', mileage: '', vin: '', fullName: '', email: '', phone: '', notes: '' });
  const [condition, setCondition] = useState('');
  const [preference, setPreference] = useState('');
  const [method, setMethod] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const set = (key: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setV((s) => ({ ...s, [key]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: FormErrors = {};
    const year = Number(v.year);
    const maxYear = new Date().getFullYear() + 1;
    if (!v.year) next.year = 'Enter the model year.';else
    if (!Number.isInteger(year) || year < 1950 || year > maxYear) next.year = `Enter a year between 1950 and ${maxYear}.`;
    if (!v.make.trim()) next.make = 'Enter the make.';
    if (!v.model.trim()) next.model = 'Enter the model.';
    const miles = Number(v.mileage.replace(/,/g, ''));
    if (!v.mileage.trim()) next.mileage = 'Enter the current mileage.';else
    if (!Number.isFinite(miles) || miles < 0) next.mileage = 'Enter mileage as a number.';
    if (v.vin.trim() && !isVin(v.vin)) next.vin = 'A VIN is 17 letters and numbers (no I, O, or Q).';
    if (!condition) next.condition = 'Choose the closest description.';
    if (!preference) next.preference = 'Let us know if you want to sell or trade.';
    if (!v.fullName.trim()) next.fullName = 'Enter your name.';
    if (!method) next.method = 'Choose how we should contact you.';else
    Object.assign(next, validateContact(method, v.email, v.phone));
    setErrors(next);
    if (Object.keys(next).length) {
      focusFirstError(next, ['year', 'make', 'model', 'mileage', 'vin', 'condition', 'preference', 'fullName', 'method', 'email', 'phone']);
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <DemoSubmitted
        onEdit={() => setSubmitted(false)}
        summary={[
        { label: 'Vehicle', value: `${v.year} ${v.make} ${v.model}` },
        { label: 'Mileage', value: `${formatNumber(Number(v.mileage.replace(/,/g, '')))} mi` },
        { label: 'Condition', value: conditions.find((c) => c.value === condition)?.label ?? '' },
        { label: 'Preference', value: preference === 'sell' ? 'Sell outright' : preference === 'trade' ? 'Trade toward a car' : 'Not sure yet' }]
        } />);


  }

  return (
    <form onSubmit={submit} noValidate className="space-y-8">
      <fieldset className="space-y-4">
        <legend className="font-serif text-2xl">Your car</legend>
        <div className="grid gap-4 sm:grid-cols-[110px_1fr_1fr]">
          <TextField id="year" label="Year" inputMode="numeric" maxLength={4} value={v.year} onChange={set('year')} error={errors.year} />
          <TextField id="make" label="Make" value={v.make} onChange={set('make')} error={errors.make} placeholder="e.g. Lexus" />
          <TextField id="model" label="Model" value={v.model} onChange={set('model')} error={errors.model} placeholder="e.g. RX 350" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField id="mileage" label="Mileage" inputMode="numeric" value={v.mileage} onChange={set('mileage')} error={errors.mileage} />
          <TextField id="vin" label="VIN" optional value={v.vin} onChange={set('vin')} error={errors.vin} maxLength={17} hint="On the driver’s side dashboard or door jamb." autoCapitalize="characters" />
        </div>
        <ChoiceGroup name="condition" legend="General condition" columns={4} value={condition} onChange={setCondition} options={conditions} error={errors.condition} />
        <ChoiceGroup
          name="preference"
          legend="What would you like to do?"
          value={preference}
          onChange={setPreference}
          error={errors.preference}
          options={[
          { value: 'sell', label: 'Sell it', description: 'You’re not buying from us right now.' },
          { value: 'trade', label: 'Trade it in', description: 'Put its value toward another car.' },
          { value: 'unsure', label: 'Not sure yet', description: 'Talk through both options.' }]
          } />
        
        <TextAreaField id="notes" label="Anything else?" optional value={v.notes} onChange={set('notes')} hint="Options, recent work, a loan balance, or known issues." rows={3} />
      </fieldset>

      <fieldset className="space-y-4 border-t border-line pt-8">
        <legend className="float-left mb-4 w-full font-serif text-2xl">How to reach you</legend>
        <TextField id="fullName" label="Name" autoComplete="name" value={v.fullName} onChange={set('fullName')} error={errors.fullName} className="clear-both" />
        <ChoiceGroup
          name="method"
          legend="Preferred contact method"
          value={method}
          onChange={setMethod}
          error={errors.method}
          options={[
          { value: 'email', label: 'Email' },
          { value: 'phone', label: 'Phone call' },
          { value: 'text', label: 'Text message' }]
          } />
        
        {method === 'email' && <TextField id="email" label="Email" type="email" autoComplete="email" value={v.email} onChange={set('email')} error={errors.email} />}
        {(method === 'phone' || method === 'text') && <TextField id="phone" label="Phone" type="tel" autoComplete="tel" value={v.phone} onChange={set('phone')} error={errors.phone} />}
      </fieldset>

      <div className="border-t border-line pt-6">
        <button type="submit" className="inline-flex h-12 items-center justify-center rounded bg-forest px-6 text-[15px] font-medium text-ivory transition-colors duration-150 hover:bg-forest-deep">
          Send for review
        </button>
        <p className="mt-3 text-[13px] text-ink-soft">Demo form. Nothing is sent, and no offer is generated.</p>
      </div>
    </form>);

}