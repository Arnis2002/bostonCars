import React, { useState } from 'react';
import { LeadForm } from '../forms/LeadForm';
import { TextField } from '../forms/TextField';
import { SelectField } from '../forms/SelectField';
import { TextAreaField } from '../forms/TextAreaField';
import { ChoiceChips } from '../forms/ChoiceChips';
import { PhotoUploader } from './PhotoUploader';
import { consentDefaults, consentRules, useLeadForm } from '../../hooks/useLeadForm';
import { accidentOptions, conditionOptions, contactMethodOptions, loanStatusOptions, titleStatusOptions, yearOptions } from '../../data/formOptions';
import { disclaimers } from '../../data/legal';

interface TradeInFormProps {
  targetVehicle?: string;
}

export function TradeInForm({ targetVehicle }: TradeInFormProps) {
  const [photos, setPhotos] = useState<File[]>([]);
  const form = useLeadForm({
    type: 'trade-in',
    initialValues: {
      vinOrPlate: '',
      year: '',
      make: '',
      model: '',
      trim: '',
      mileage: '',
      condition: '',
      accidentHistory: '',
      titleStatus: '',
      loanStatus: '',
      name: '',
      phone: '',
      email: '',
      preferredContact: 'Phone call',
      notes: '',
      ...consentDefaults
    },
    rules: {
      vinOrPlate: { label: 'VIN or license plate', vinOrPlate: true },
      year: { label: 'Year', required: true, message: 'Choose the vehicle year.' },
      make: { label: 'Make', required: true },
      model: { label: 'Model', required: true },
      mileage: { label: 'Mileage', required: true, numeric: { min: 0, max: 500000 } },
      condition: { label: 'Condition', required: true, message: 'Choose the overall condition.' },
      accidentHistory: { label: 'Accident history', required: true, message: 'Choose an option for accident history.' },
      titleStatus: { label: 'Title status', required: true, message: 'Choose the title status.' },
      loanStatus: { label: 'Loan balance', required: true, message: 'Choose a loan balance status.' },
      name: { label: 'Name', required: true },
      phone: { label: 'Phone', required: true, phone: true },
      email: { label: 'Email', required: true, email: true },
      ...consentRules
    },
    context: { photoCount: photos.length, tradingToward: targetVehicle ?? '' }
  });

  return (
    <LeadForm
      form={form}
      ariaLabel="Vehicle appraisal request"
      submitLabel="Request an Appraisal"
      submittingLabel="Sending…"
      successTitle="Appraisal request received"
      successMessage="Thank you. Our team will review your vehicle details and contact you about next steps. Any value we discuss is preliminary until we inspect the vehicle in person."
      disclaimer={disclaimers.appraisalFull}>
      
      <fieldset className="space-y-5">
        <legend className="text-lg font-bold text-navy">Your vehicle</legend>
        <TextField label="VIN or license plate" format="upper" maxLength={17} hint="A VIN gives us the most accurate details." {...form.bind('vinOrPlate')} />
        <div className="grid gap-4 sm:grid-cols-4">
          <SelectField label="Year" options={yearOptions(1995)} {...form.bind('year')} />
          <TextField label="Make" {...form.bind('make')} />
          <TextField label="Model" {...form.bind('model')} />
          <TextField label="Trim" placeholder="e.g. LX, XLT" {...form.bind('trim')} />
        </div>
        <TextField label="Mileage" inputMode="numeric" placeholder="e.g. 98,000" className="sm:max-w-xs" {...form.bind('mileage')} />
        <ChoiceChips label="Overall condition" options={conditionOptions} {...form.bind('condition')} />
        <div className="grid gap-4 sm:grid-cols-3">
          <SelectField label="Accident history" options={accidentOptions} {...form.bind('accidentHistory')} />
          <SelectField label="Title status" options={titleStatusOptions} {...form.bind('titleStatus')} />
          <SelectField label="Loan balance" options={loanStatusOptions} {...form.bind('loanStatus')} />
        </div>
        <PhotoUploader files={photos} onChange={setPhotos} />
      </fieldset>

      <fieldset className="space-y-5 border-t border-line pt-6">
        <legend className="text-lg font-bold text-navy">Your contact information</legend>
        <div className="grid gap-4 sm:grid-cols-3">
          <TextField label="Full name" autoComplete="name" {...form.bind('name')} />
          <TextField label="Phone" type="tel" format="phone" inputMode="tel" autoComplete="tel" {...form.bind('phone')} />
          <TextField label="Email" type="email" autoComplete="email" {...form.bind('email')} />
        </div>
        <ChoiceChips label="Preferred contact method" options={contactMethodOptions} {...form.bind('preferredContact')} />
        <TextAreaField label="Notes" placeholder="Recent repairs, new tires, known issues, aftermarket parts…" {...form.bind('notes')} />
      </fieldset>
    </LeadForm>);

}