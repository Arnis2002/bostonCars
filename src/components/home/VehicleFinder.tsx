import React from 'react';
import { SearchCheckIcon } from 'lucide-react';
import { LeadForm } from '../forms/LeadForm';
import { TextField } from '../forms/TextField';
import { SelectField } from '../forms/SelectField';
import { TextAreaField } from '../forms/TextAreaField';
import { Reveal } from '../ui/Reveal';
import { consentDefaults, consentRules, useLeadForm } from '../../hooks/useLeadForm';
import { budgetOptions, mileagePreferenceOptions, vehicleTypeOptions, yearOptions } from '../../data/formOptions';
import { disclaimers } from '../../data/legal';
import { cn, container } from '../../utils/styles';

const years = yearOptions(2005);

export function VehicleFinder() {
  const form = useLeadForm({
    type: 'vehicle-finder',
    initialValues: {
      vehicleType: '',
      make: '',
      model: '',
      yearMin: '',
      yearMax: '',
      budget: '',
      mileageMax: '',
      features: '',
      name: '',
      phone: '',
      email: '',
      ...consentDefaults
    },
    rules: {
      vehicleType: { label: 'Vehicle type', required: true, message: 'Choose a vehicle type.' },
      budget: { label: 'Maximum budget', required: true, message: 'Choose a budget range.' },
      name: { label: 'Name', required: true },
      phone: { label: 'Phone', required: true, phone: true },
      email: { label: 'Email', required: true, email: true },
      yearMax: {
        label: 'Year range',
        custom: (v) => form.values.yearMin && Number(v) < Number(form.values.yearMin) ? 'The “to” year should be the same as or later than the “from” year.' : null
      },
      ...consentRules
    }
  });

  return (
    <section id="vehicle-finder" aria-labelledby="finder-title" className="scroll-mt-24 bg-paper py-16 lg:py-24">
      <div className={cn(container, 'grid gap-10 lg:grid-cols-12 lg:gap-16')}>
        <Reveal className="lg:col-span-4">
          <SearchCheckIcon className="h-8 w-8 text-brand" aria-hidden />
          <h2 id="finder-title" className="mt-4 text-[1.75rem] font-bold leading-tight tracking-tight text-navy sm:text-4xl">
            Can’t find the vehicle you want?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Tell us what you are looking for and our team can help search for a vehicle that fits your needs.
          </p>
          <ul className="mt-6 space-y-3 text-[15px] text-steel">
            <li className="border-l-2 border-line pl-3">Share the type, budget and features that matter to you.</li>
            <li className="border-l-2 border-line pl-3">We’ll keep an eye out and contact you with possible matches.</li>
            <li className="border-l-2 border-line pl-3">No obligation — you decide if a vehicle is right.</li>
          </ul>
        </Reveal>

        <Reveal className="lg:col-span-8" delay={0.06}>
          <div className="rounded-2xl border border-line bg-white p-5 shadow-card sm:p-8">
            <LeadForm
              form={form}
              ariaLabel="Vehicle finder request"
              submitLabel="Help Me Find a Vehicle"
              successTitle="We’re on the lookout"
              successMessage="Thank you. Our team will review your request and contact you if we locate vehicles that match what you’re looking for."
              disclaimer={disclaimers.vehicleFinder}>
              
              <div className="grid gap-4 sm:grid-cols-3">
                <SelectField label="Vehicle type" options={vehicleTypeOptions} {...form.bind('vehicleType')} />
                <TextField label="Make" placeholder="e.g. Toyota" {...form.bind('make')} />
                <TextField label="Model" placeholder="e.g. RAV4" {...form.bind('model')} />
              </div>
              <div className="grid gap-4 sm:grid-cols-4">
                <SelectField label="Year from" placeholder="Any" options={years} {...form.bind('yearMin')} />
                <SelectField label="Year to" placeholder="Any" options={years} {...form.bind('yearMax')} />
                <SelectField label="Max. budget" options={budgetOptions} {...form.bind('budget')} />
                <SelectField label="Max. mileage" options={mileagePreferenceOptions} {...form.bind('mileageMax')} />
              </div>
              <TextAreaField label="Required features" rows={2} placeholder="e.g. third-row seating, AWD, backup camera" {...form.bind('features')} />
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