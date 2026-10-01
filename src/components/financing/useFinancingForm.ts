import { useState } from 'react';
import { consentDefaults, consentRules, useLeadForm } from '../../hooks/useLeadForm';

export const FINANCE_STEPS = ['Vehicle', 'Contact', 'General info', 'Review'];

const STEP_FIELDS = [
['vehicleOfInterest', 'vehicleType', 'priceRange', 'downPayment', 'tradeIn'],
['firstName', 'lastName', 'email', 'phone', 'preferredContact'],
['employmentStatus', 'incomeRange', 'residenceStatus', 'timeAtAddress'],
['consentContact']] as
const;

export function useFinancingForm(initialVehicle: string) {
  const form = useLeadForm({
    type: 'financing',
    initialValues: {
      vehicleOfInterest: initialVehicle,
      vehicleType: '',
      priceRange: '',
      downPayment: '',
      tradeIn: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      preferredContact: '',
      employmentStatus: '',
      incomeRange: '',
      residenceStatus: '',
      timeAtAddress: '',
      ...consentDefaults
    },
    rules: {
      vehicleType: { label: 'Vehicle type', required: true, message: 'Choose a vehicle type.' },
      priceRange: { label: 'Price range', required: true, message: 'Choose a price range.' },
      downPayment: { label: 'Down payment', required: true, message: 'Choose a down-payment range.' },
      tradeIn: { label: 'Trade-in', required: true, message: 'Let us know if you have a trade-in.' },
      firstName: { label: 'First name', required: true },
      lastName: { label: 'Last name', required: true },
      email: { label: 'Email', required: true, email: true },
      phone: { label: 'Phone', required: true, phone: true },
      preferredContact: { label: 'Preferred contact method', required: true, message: 'Choose how you’d like us to contact you.' },
      employmentStatus: { label: 'Employment status', required: true, message: 'Choose your employment status.' },
      incomeRange: { label: 'Income range', required: true, message: 'Choose an income range.' },
      residenceStatus: { label: 'Residence status', required: true, message: 'Choose your residence status.' },
      timeAtAddress: { label: 'Time at address', required: true, message: 'Choose how long you’ve lived at your address.' },
      ...consentRules
    }
  });

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);

  const scrollToForm = () => document.getElementById('finance-form-top')?.scrollIntoView({ block: 'start' });

  const next = () => {
    if (!form.validate([...STEP_FIELDS[step]] as (keyof typeof form.values & string)[])) return;
    setDirection(1);
    setStep((s) => Math.min(s + 1, FINANCE_STEPS.length - 1));
    scrollToForm();
  };

  const back = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
    scrollToForm();
  };

  const goTo = (target: number) => {
    if (target >= step) return;
    setDirection(-1);
    setStep(target);
    scrollToForm();
  };

  const restart = () => {
    form.reset();
    setDirection(-1);
    setStep(0);
  };

  return { form, step, direction, next, back, goTo, restart };
}