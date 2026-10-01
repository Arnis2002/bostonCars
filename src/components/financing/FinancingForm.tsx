import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon, LockIcon } from 'lucide-react';
import { FinancingStepper } from './FinancingStepper';
import { FinanceReview } from './FinanceReview';
import { FINANCE_STEPS, useFinancingForm } from './useFinancingForm';
import { ChoiceChips } from '../forms/ChoiceChips';
import { SelectField } from '../forms/SelectField';
import { TextField } from '../forms/TextField';
import { ConsentFields } from '../forms/ConsentFields';
import { Honeypot } from '../forms/Honeypot';
import { SubmitButton } from '../forms/SubmitButton';
import { FormError } from '../forms/FormError';
import { FormSuccess } from '../forms/FormSuccess';
import { DemoFormNotice } from '../forms/DemoFormNotice';
import {
  contactMethodOptions,
  downPaymentRanges,
  employmentOptions,
  financePriceRanges,
  incomeRanges,
  residenceOptions,
  timeAtAddressOptions,
  tradeInOptions,
  vehicleTypeOptions } from
'../../data/formOptions';
import { disclaimers } from '../../data/legal';
import { EASE_OUT } from '../../utils/motion';
import { btn, cn } from '../../utils/styles';
import { vehicleFullTitle } from '../../utils/format';
import type { Vehicle } from '../../types/vehicle';

interface FinancingFormProps {
  vehicles: Vehicle[];
  initialVehicle: string;
}

export function FinancingForm({ vehicles, initialVehicle }: FinancingFormProps) {
  const { form, step, direction, next, back, goTo, restart } = useFinancingForm(initialVehicle);
  const v = form.values;
  const isLast = step === FINANCE_STEPS.length - 1;

  const vehicleOptions = [
  { value: 'not-sure', label: 'Not sure yet' },
  ...vehicles.map((x) => ({ value: x.slug, label: `${vehicleFullTitle(x)} · Stock ${x.stockNumber}` }))];

  const vehicleLabel = vehicleOptions.find((o) => o.value === v.vehicleOfInterest)?.label ?? '';

  if (form.status === 'success') {
    return (
      <FormSuccess
        title="Request received"
        message="Thank you. Your financing request has been received. The Southwest Auto Sale team will contact you about the next steps."
        onReset={restart}
        resetLabel="Start a new request" />);


  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLast) form.submit();else
    next();
  };

  return (
    <form noValidate onSubmit={handleSubmit} aria-label="Financing request" aria-busy={form.status === 'submitting'}>
      <div id="finance-form-top" className="scroll-mt-28" />
      <FinancingStepper steps={FINANCE_STEPS} current={step} onSelect={goTo} />

      <div className="relative mt-8 overflow-hidden">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.fieldset
            key={step}
            initial={{ opacity: 0, x: direction * 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -24 }}
            transition={{ duration: 0.22, ease: EASE_OUT }}
            className="space-y-6">
            
            <legend className="mb-6 text-xl font-bold text-navy sm:text-2xl">
              {['Tell us about the vehicle you want', 'How can we reach you?', 'A few general questions', 'Review and submit'][step]}
            </legend>

            {step === 0 &&
            <>
                <SelectField label="Vehicle of interest" placeholder="Choose a vehicle (optional)" options={vehicleOptions} {...form.bind('vehicleOfInterest')} />
                <ChoiceChips label="Vehicle type" options={vehicleTypeOptions} {...form.bind('vehicleType')} />
                <div className="grid gap-5 sm:grid-cols-2">
                  <SelectField label="Price range" options={financePriceRanges} {...form.bind('priceRange')} />
                  <SelectField label="Down-payment range" options={downPaymentRanges} {...form.bind('downPayment')} />
                </div>
                <ChoiceChips label="Do you have a trade-in?" options={tradeInOptions} {...form.bind('tradeIn')} />
              </>
            }

            {step === 1 &&
            <>
                <div className="grid gap-5 sm:grid-cols-2">
                  <TextField label="First name" autoComplete="given-name" {...form.bind('firstName')} />
                  <TextField label="Last name" autoComplete="family-name" {...form.bind('lastName')} />
                  <TextField label="Email" type="email" autoComplete="email" {...form.bind('email')} />
                  <TextField label="Phone" type="tel" format="phone" inputMode="tel" autoComplete="tel" {...form.bind('phone')} />
                </div>
                <ChoiceChips label="Preferred contact method" options={contactMethodOptions} {...form.bind('preferredContact')} />
              </>
            }

            {step === 2 &&
            <>
                <p className="-mt-3 text-[15px] text-muted">General ranges only — this helps our team prepare. We don’t ask for your Social Security number, bank details or documents here.</p>
                <ChoiceChips label="Employment status" options={employmentOptions} {...form.bind('employmentStatus')} />
                <div className="grid gap-5 sm:grid-cols-2">
                  <SelectField label="Income range" options={incomeRanges} {...form.bind('incomeRange')} />
                  <SelectField label="Time at current address" options={timeAtAddressOptions} {...form.bind('timeAtAddress')} />
                </div>
                <ChoiceChips label="Residence status" options={residenceOptions} {...form.bind('residenceStatus')} />
              </>
            }

            {step === 3 &&
            <>
                {form.status === 'error' && form.submitError && <FormError message={form.submitError} />}
                <FinanceReview
                onEdit={goTo}
                sections={[
                {
                  title: 'Vehicle',
                  step: 0,
                  rows: [
                  ['Vehicle of interest', vehicleLabel || 'Not selected'],
                  ['Vehicle type', v.vehicleType],
                  ['Price range', v.priceRange],
                  ['Down payment', v.downPayment],
                  ['Trade-in', v.tradeIn]]

                },
                {
                  title: 'Contact',
                  step: 1,
                  rows: [
                  ['Name', `${v.firstName} ${v.lastName}`.trim()],
                  ['Email', v.email],
                  ['Phone', v.phone],
                  ['Preferred contact', v.preferredContact]]

                },
                {
                  title: 'General information',
                  step: 2,
                  rows: [
                  ['Employment', v.employmentStatus],
                  ['Income range', v.incomeRange],
                  ['Residence', v.residenceStatus],
                  ['Time at address', v.timeAtAddress]]

                }]
                } />
              
                <div className="rounded-xl bg-paper p-4 text-[13px] leading-relaxed text-steel">
                  <p className="flex items-center gap-2 font-semibold text-navy">
                    <LockIcon className="h-4 w-4" aria-hidden />
                    Privacy notice
                  </p>
                  <p className="mt-1.5">
                    Southwest Auto Sale uses this information only to respond to your financing request and review possible options with you. If you choose to move forward, a full credit application is completed through an approved, secure finance provider. We do not sell your personal information.
                  </p>
                </div>
                <p className="border-l-2 border-gold pl-3 text-[13px] leading-relaxed text-steel">{disclaimers.financing}</p>
                <ConsentFields contact={form.bindCheck('consentContact')} marketing={form.bindCheck('consentMarketing')} />
                <Honeypot id={form.formId} value={form.honeypot} onChange={form.setHoneypot} />
              </>
            }
          </motion.fieldset>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        {step > 0 ?
        <button type="button" onClick={back} className={cn(btn.ghost, 'justify-center sm:justify-start')}>
            <ArrowLeftIcon className="h-4 w-4" aria-hidden />
            Back
          </button> :

        <span className="hidden sm:block" />
        }
        {isLast ?
        <SubmitButton submitting={form.status === 'submitting'} label="Submit Financing Request" submittingLabel="Submitting…" className="h-12 px-6" /> :

        <button type="submit" className={cn(btn.primary, 'h-12 px-6')}>
            Continue
            <ArrowRightIcon className="h-4 w-4" aria-hidden />
          </button>
        }
      </div>
      <div className="mt-4">
        <DemoFormNotice finance />
      </div>
    </form>);

}