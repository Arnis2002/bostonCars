import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { LeadForm } from '../forms/LeadForm';
import { TextField } from '../forms/TextField';
import { SelectField } from '../forms/SelectField';
import { TextAreaField } from '../forms/TextAreaField';
import { validateVisitDate } from '../vehicle/TestDriveModal';
import { consentDefaults, consentRules, useLeadForm } from '../../hooks/useLeadForm';
import { contactReasons } from '../../data/formOptions';
import { vehicleFullTitle } from '../../utils/format';
import type { Vehicle } from '../../types/vehicle';

interface ContactFormProps {
  vehicles: Vehicle[];
  initialReason: string;
}

const MESSAGE_HINTS: Record<string, string> = {
  'Vehicle Availability': 'Any questions about the vehicle?',
  'Test Drive': 'Anything we should know before your visit?',
  Financing: 'Questions about financing options?',
  'Trade-In': 'Tell us the year, make, model and mileage of your vehicle.',
  'Vehicle Finder': 'Tell us the type, budget, mileage and features you’re looking for.',
  'General Question': 'How can we help?'
};

export function ContactForm({ vehicles, initialReason }: ContactFormProps) {
  const [reason, setReason] = useState(contactReasons.includes(initialReason) ? initialReason : 'General Question');
  const needsVehicle = reason === 'Vehicle Availability' || reason === 'Test Drive';
  const needsDate = reason === 'Test Drive';

  const form = useLeadForm({
    type: 'general-contact',
    initialValues: { name: '', phone: '', email: '', vehicleId: '', preferredDate: '', message: '', ...consentDefaults },
    rules: {
      name: { label: 'Name', required: true },
      phone: { label: 'Phone', required: true, phone: true },
      email: { label: 'Email', required: true, email: true },
      ...(needsVehicle && { vehicleId: { label: 'Vehicle', required: true, message: 'Choose the vehicle you’re interested in.' } }),
      ...(needsDate && { preferredDate: { label: 'Preferred date', required: true, custom: validateVisitDate } }),
      message: { label: 'Message', required: reason === 'Vehicle Finder' || reason === 'General Question' || reason === 'Trade-In', message: 'Please add a short message.' },
      ...consentRules
    },
    context: { reason }
  });

  return (
    <LeadForm
      form={form}
      ariaLabel="Contact Southwest Auto Sale"
      submitLabel="Send Message"
      successTitle="Message sent"
      successMessage="Thank you for contacting Southwest Auto Sale. A member of our team will get back to you during business hours.">
      
      <SelectField id="contact-reason" label="What can we help with?" value={reason} onChange={(v) => setReason(v || 'General Question')} options={contactReasons} required />

      {reason === 'Financing' &&
      <Link to="/financing" className="flex items-center justify-between gap-3 rounded-xl border border-line bg-paper px-4 py-3 text-[15px] font-semibold text-navy hover:border-navy/30">
          Ready to start? Use our step-by-step financing request
          <ArrowRightIcon className="h-4 w-4 shrink-0" aria-hidden />
        </Link>
      }
      {reason === 'Trade-In' &&
      <Link to="/sell-trade" className="flex items-center justify-between gap-3 rounded-xl border border-line bg-paper px-4 py-3 text-[15px] font-semibold text-navy hover:border-navy/30">
          Want a faster estimate? Use the full appraisal form with photos
          <ArrowRightIcon className="h-4 w-4 shrink-0" aria-hidden />
        </Link>
      }

      <div className="grid gap-4 sm:grid-cols-3">
        <TextField label="Full name" autoComplete="name" {...form.bind('name')} />
        <TextField label="Phone" type="tel" format="phone" inputMode="tel" autoComplete="tel" {...form.bind('phone')} />
        <TextField label="Email" type="email" autoComplete="email" {...form.bind('email')} />
      </div>

      {(needsVehicle || needsDate) &&
      <div className="grid gap-4 sm:grid-cols-2">
          {needsVehicle &&
        <SelectField
          label="Vehicle"
          options={vehicles.map((v) => ({ value: v.id, label: `${vehicleFullTitle(v)} · ${v.stockNumber}` }))}
          {...form.bind('vehicleId')}
          required />

        }
          {needsDate && <TextField label="Preferred visit date" type="date" hint="Mon–Fri 9–5 · Sat 9–2:30 · Closed Sunday" {...form.bind('preferredDate')} required />}
        </div>
      }

      <TextAreaField label="Message" rows={4} placeholder={MESSAGE_HINTS[reason]} {...form.bind('message')} />
    </LeadForm>);

}