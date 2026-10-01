import React from 'react';
import { Link } from 'react-router-dom';
import { CheckboxField } from './CheckboxField';
import { consentCopy } from '../../data/legal';
import type { CheckBinding } from '../../hooks/useLeadForm';

interface ConsentFieldsProps {
  contact: CheckBinding;
  marketing: CheckBinding;
}

export function ConsentFields({ contact, marketing }: ConsentFieldsProps) {
  return (
    <div className="space-y-2 rounded-lg bg-paper p-3.5">
      <CheckboxField {...contact}>{consentCopy.contact}</CheckboxField>
      <CheckboxField {...marketing}>{consentCopy.marketing}</CheckboxField>
      <p className="pl-8 text-xs text-muted">
        {consentCopy.privacyLead}{' '}
        <Link to="/privacy" className="font-medium text-navy underline underline-offset-2">
          Privacy Policy
        </Link>{' '}
        and{' '}
        <Link to="/terms" className="font-medium text-navy underline underline-offset-2">
          Terms
        </Link>
        .
      </p>
    </div>);

}