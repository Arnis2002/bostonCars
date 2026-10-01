import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ConsentFields } from './ConsentFields';
import { DemoFormNotice } from './DemoFormNotice';
import { FormError } from './FormError';
import { FormSuccess } from './FormSuccess';
import { Honeypot } from './Honeypot';
import { SubmitButton } from './SubmitButton';
import type { LeadFormController } from '../../hooks/useLeadForm';

interface LeadFormProps {
  form: LeadFormController;
  submitLabel: string;
  submittingLabel?: string;
  successTitle: string;
  successMessage: string;
  disclaimer?: string;
  children: React.ReactNode;
  onDone?: () => void;
  doneLabel?: string;
  fullWidthSubmit?: boolean;
  ariaLabel?: string;
}

export function LeadForm({ form, submitLabel, submittingLabel, successTitle, successMessage, disclaimer, children, onDone, doneLabel, fullWidthSubmit, ariaLabel }: LeadFormProps) {
  const submitting = form.status === 'submitting';

  return (
    <AnimatePresence mode="wait" initial={false}>
      {form.status === 'success' ?
      <FormSuccess key="success" title={successTitle} message={successMessage} onReset={form.reset} onDone={onDone} doneLabel={doneLabel} /> :

      <motion.form
        key="form"
        noValidate
        aria-label={ariaLabel}
        aria-busy={submitting}
        onSubmit={form.submit}
        exit={{ opacity: 0, transition: { duration: 0.15 } }}
        className="relative space-y-5">
        
          {form.status === 'error' && form.submitError && <FormError message={form.submitError} />}
          {children}
          {disclaimer && <p className="border-l-2 border-gold pl-3 text-[13px] leading-relaxed text-steel">{disclaimer}</p>}
          <ConsentFields contact={form.bindCheck('consentContact')} marketing={form.bindCheck('consentMarketing')} />
          <Honeypot id={form.formId} value={form.honeypot} onChange={form.setHoneypot} />
          <div className="flex flex-col gap-3">
            <SubmitButton submitting={submitting} label={submitLabel} submittingLabel={submittingLabel} className={fullWidthSubmit ? 'sm:w-full' : undefined} />
            <DemoFormNotice />
          </div>
        </motion.form>
      }
    </AnimatePresence>);

}