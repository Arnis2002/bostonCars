import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, RepeatIcon } from 'lucide-react';
import { LeadForm } from '../forms/LeadForm';
import { TextField } from '../forms/TextField';
import { SelectField } from '../forms/SelectField';
import { Reveal } from '../ui/Reveal';
import { consentDefaults, consentRules, useLeadForm } from '../../hooks/useLeadForm';
import { conditionOptions, yearOptions } from '../../data/formOptions';
import { disclaimers } from '../../data/legal';
import { cn, container } from '../../utils/styles';

export function TradeInCTA() {
  const form = useLeadForm({
    type: 'trade-in',
    initialValues: { vin: '', year: '', make: '', model: '', mileage: '', condition: '', name: '', phone: '', email: '', ...consentDefaults },
    rules: {
      vin: { label: 'VIN', vin: true },
      year: { label: 'Year', required: true, message: 'Choose the vehicle year.' },
      make: { label: 'Make', required: true },
      model: { label: 'Model', required: true },
      mileage: { label: 'Mileage', required: true, numeric: { min: 0, max: 500000 } },
      condition: { label: 'Condition', required: true, message: 'Choose the overall condition.' },
      name: { label: 'Name', required: true },
      phone: { label: 'Phone', required: true, phone: true },
      email: { label: 'Email', email: true },
      ...consentRules
    }
  });

  return (
    <section aria-labelledby="trade-title" className="bg-white py-16 lg:py-24">
      <div className={cn(container, 'grid gap-10 lg:grid-cols-12 lg:gap-16')}>
        <Reveal className="lg:order-2 lg:col-span-4">
          <RepeatIcon className="h-8 w-8 text-brand" aria-hidden />
          <h2 id="trade-title" className="mt-4 text-[1.75rem] font-bold leading-tight tracking-tight text-navy sm:text-4xl">
            Thinking about trading your current vehicle?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Share a few details and our team will follow up about a preliminary appraisal you can put toward your next vehicle.
          </p>
          <Link to="/sell-trade" className="mt-6 inline-flex min-h-[44px] items-center gap-1.5 font-semibold text-navy hover:text-brand-dark">
            Use the full appraisal form with photos
            <ArrowRightIcon className="h-4 w-4" aria-hidden />
          </Link>
        </Reveal>

        <Reveal className="lg:order-1 lg:col-span-8" delay={0.06}>
          <div className="rounded-2xl border border-line bg-paper p-5 sm:p-8">
            <LeadForm
              form={form}
              ariaLabel="Trade-in appraisal request"
              submitLabel="Request an Appraisal"
              successTitle="Appraisal request received"
              successMessage="Thank you. Our team will review your vehicle details and contact you about next steps and an in-person inspection."
              disclaimer={disclaimers.appraisal}>
              
              <TextField label="VIN" format="upper" maxLength={17} hint="Found on your registration or driver-side dashboard." {...form.bind('vin')} />
              <div className="grid gap-4 sm:grid-cols-3">
                <SelectField label="Year" options={yearOptions(1995)} {...form.bind('year')} />
                <TextField label="Make" {...form.bind('make')} />
                <TextField label="Model" {...form.bind('model')} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField label="Mileage" inputMode="numeric" placeholder="e.g. 98,000" {...form.bind('mileage')} />
                <SelectField label="Condition" options={conditionOptions} {...form.bind('condition')} />
              </div>
              <div className="grid gap-4 border-t border-line pt-5 sm:grid-cols-3">
                <TextField label="Full name" autoComplete="name" {...form.bind('name')} />
                <TextField label="Phone" type="tel" format="phone" inputMode="tel" autoComplete="tel" {...form.bind('phone')} />
                <TextField label="Email" type="email" autoComplete="email" {...form.bind('email')} />
              </div>
            </LeadForm>
          </div>
        </Reveal>
      </div>
    </section>);

}