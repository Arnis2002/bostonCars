import React from 'react';
import { Modal } from '../ui/Modal';
import { LeadForm } from '../forms/LeadForm';
import { TextField } from '../forms/TextField';
import { TextAreaField } from '../forms/TextAreaField';
import { ChoiceChips } from '../forms/ChoiceChips';
import { VehicleMini } from './VehicleMini';
import { consentDefaults, consentRules, useLeadForm } from '../../hooks/useLeadForm';
import { contactMethodOptions } from '../../data/formOptions';
import { vehicleFullTitle } from '../../utils/format';
import type { Vehicle } from '../../types/vehicle';

interface AvailabilityModalProps {
  open: boolean;
  vehicle: Vehicle;
  initialMessage?: string;
  onClose: () => void;
}

export function AvailabilityModal({ open, vehicle, initialMessage, onClose }: AvailabilityModalProps) {
  const title = vehicleFullTitle(vehicle);
  const form = useLeadForm({
    type: 'vehicle-inquiry',
    initialValues: {
      name: '',
      phone: '',
      email: '',
      preferredContact: 'Phone call',
      message: initialMessage ?? `Hi, is the ${title} (Stock ${vehicle.stockNumber}) still available?`,
      ...consentDefaults
    },
    rules: {
      name: { label: 'Name', required: true },
      phone: { label: 'Phone', required: true, phone: true },
      email: { label: 'Email', email: true },
      ...consentRules
    },
    context: { vehicleId: vehicle.id, stockNumber: vehicle.stockNumber, vin: vehicle.vin }
  });

  return (
    <Modal open={open} onClose={onClose} title="Check availability" description="We’ll confirm availability and reply during business hours.">
      <VehicleMini vehicle={vehicle} />
      <LeadForm
        form={form}
        ariaLabel="Check vehicle availability"
        submitLabel="Check Availability"
        successTitle="Availability request received"
        successMessage={`Thank you. Our team will confirm availability for the ${title} and follow up using your preferred contact method.`}
        onDone={onClose}
        doneLabel="Close"
        fullWidthSubmit>
        
        <TextField label="Full name" autoComplete="name" {...form.bind('name')} />
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField label="Phone" type="tel" format="phone" autoComplete="tel" inputMode="tel" {...form.bind('phone')} />
          <TextField label="Email" type="email" autoComplete="email" {...form.bind('email')} />
        </div>
        <ChoiceChips label="Preferred contact method" options={contactMethodOptions} {...form.bind('preferredContact')} />
        <TextAreaField label="Message" {...form.bind('message')} />
      </LeadForm>
    </Modal>);

}