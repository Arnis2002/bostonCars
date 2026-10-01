import React, { useMemo } from 'react';
import { Modal } from '../ui/Modal';
import { LeadForm } from '../forms/LeadForm';
import { TextField } from '../forms/TextField';
import { SelectField } from '../forms/SelectField';
import { TextAreaField } from '../forms/TextAreaField';
import { VehicleMini } from './VehicleMini';
import { consentDefaults, consentRules, useLeadForm } from '../../hooks/useLeadForm';
import { testDriveTimes } from '../../data/formOptions';
import { vehicleFullTitle } from '../../utils/format';
import type { Vehicle } from '../../types/vehicle';

interface TestDriveModalProps {
  open: boolean;
  vehicle: Vehicle;
  onClose: () => void;
}

function todayISO(): string {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

export function validateVisitDate(value: string): string | null {
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) return 'Choose a valid date.';
  if (value < todayISO()) return 'Choose today or a future date.';
  if (date.getDay() === 0) return 'We’re closed on Sundays. Please choose Monday through Saturday.';
  return null;
}

export function TestDriveModal({ open, vehicle, onClose }: TestDriveModalProps) {
  const title = vehicleFullTitle(vehicle);
  const form = useLeadForm({
    type: 'test-drive',
    initialValues: { name: '', phone: '', email: '', preferredDate: '', preferredTime: '', message: '', ...consentDefaults },
    rules: {
      name: { label: 'Name', required: true },
      phone: { label: 'Phone', required: true, phone: true },
      email: { label: 'Email', email: true },
      preferredDate: { label: 'Preferred date', required: true, custom: validateVisitDate },
      preferredTime: { label: 'Preferred time', required: true, message: 'Choose a preferred time.' },
      ...consentRules
    },
    context: { vehicleId: vehicle.id, stockNumber: vehicle.stockNumber }
  });

  const date = form.values.preferredDate;
  const times = useMemo(() => {
    if (!date) return testDriveTimes.weekday;
    return new Date(`${date}T12:00:00`).getDay() === 6 ? testDriveTimes.saturday : testDriveTimes.weekday;
  }, [date]);

  return (
    <Modal open={open} onClose={onClose} title="Schedule a test drive" description="Pick a time that works — we’ll confirm before your visit.">
      <VehicleMini vehicle={vehicle} />
      <LeadForm
        form={form}
        ariaLabel="Schedule a test drive"
        submitLabel="Request Test Drive"
        successTitle="Test drive request received"
        successMessage={`Thank you. We’ll contact you to confirm your test drive of the ${title} at 2140 Harrisburg Pike, Grove City.`}
        onDone={onClose}
        doneLabel="Close"
        fullWidthSubmit>
        
        <TextField label="Full name" autoComplete="name" {...form.bind('name')} />
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField label="Phone" type="tel" format="phone" autoComplete="tel" inputMode="tel" {...form.bind('phone')} />
          <TextField label="Email" type="email" autoComplete="email" {...form.bind('email')} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField label="Preferred date" type="date" min={todayISO()} hint="Mon–Fri 9–5 · Sat 9–2:30" {...form.bind('preferredDate')} />
          <SelectField label="Preferred time" options={times} {...form.bind('preferredTime')} />
        </div>
        <TextAreaField label="Anything we should know?" rows={2} {...form.bind('message')} />
      </LeadForm>
    </Modal>);

}